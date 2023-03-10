/* eslint-disable no-multi-spaces, key-spacing, indent, camelcase, space-before-blocks, eqeqeq, brace-style */
/* eslint-disable space-infix-ops, space-before-function-paren, array-bracket-spacing, object-curly-spacing */
/* eslint-disable no-nested-ternary, max-params, default-case, no-else-return, no-empty */
/* eslint-disable no-param-reassign, no-var, block-scoped-var */

import { BinaryStream, ucs2encode, base64ToUint8Array, HAS_TYPED_ARRAYS } from "./utils";
import { support } from '../common';
import { TTFFont } from "./ttf";
import { deflate, supportsDeflate } from './deflate';
import { encodeUTF16BE, BOM } from "../util/encode-utf";

const browser = support.browser;
const NL = "\n";

var RESOURCE_COUNTER = 0;

const PAPER_SIZE = {
    a0        : [ 2383.94 , 3370.39 ],
    a1        : [ 1683.78 , 2383.94 ],
    a2        : [ 1190.55 , 1683.78 ],
    a3        : [ 841.89  , 1190.55 ],
    a4        : [ 595.28  , 841.89  ],
    a5        : [ 419.53  , 595.28  ],
    a6        : [ 297.64  , 419.53  ],
    a7        : [ 209.76  , 297.64  ],
    a8        : [ 147.40  , 209.76  ],
    a9        : [ 104.88  , 147.40  ],
    a10       : [ 73.70   , 104.88  ],
    b0        : [ 2834.65 , 4008.19 ],
    b1        : [ 2004.09 , 2834.65 ],
    b2        : [ 1417.32 , 2004.09 ],
    b3        : [ 1000.63 , 1417.32 ],
    b4        : [ 708.66  , 1000.63 ],
    b5        : [ 498.90  , 708.66  ],
    b6        : [ 354.33  , 498.90  ],
    b7        : [ 249.45  , 354.33  ],
    b8        : [ 175.75  , 249.45  ],
    b9        : [ 124.72  , 175.75  ],
    b10       : [ 87.87   , 124.72  ],
    c0        : [ 2599.37 , 3676.54 ],
    c1        : [ 1836.85 , 2599.37 ],
    c2        : [ 1298.27 , 1836.85 ],
    c3        : [ 918.43  , 1298.27 ],
    c4        : [ 649.13  , 918.43  ],
    c5        : [ 459.21  , 649.13  ],
    c6        : [ 323.15  , 459.21  ],
    c7        : [ 229.61  , 323.15  ],
    c8        : [ 161.57  , 229.61  ],
    c9        : [ 113.39  , 161.57  ],
    c10       : [ 79.37   , 113.39  ],
    executive : [ 521.86  , 756.00  ],
    folio     : [ 612.00  , 936.00  ],
    legal     : [ 612.00  , 1008.00 ],
    letter    : [ 612.00  , 792.00  ],
    tabloid   : [ 792.00  , 1224.00 ]
};

function makeOutput() {
    var indentLevel = 0, output = BinaryStream();
    function out() {
        for (var i = 0; i < arguments.length; ++i) {
            var x = arguments[i];
            if (x === undefined) {
                throw new Error("Cannot output undefined to PDF");
            }
            else if (x instanceof PDFValue) {
                x.beforeRender(out);
                x.render(out);
            }
            else if (isArray(x)) {
                renderArray(x, out);
            }
            else if (isDate(x)) {
                renderDate(x, out);
            }
            else if (typeof x == "number") {
                if (isNaN(x)) {
                    throw new Error("Cannot output NaN to PDF");
                }
                // make sure it doesn't end up in exponent notation
                var num = x.toFixed(7);
                if (num.indexOf(".") >= 0) {
                    num = num.replace(/\.?0+$/, "");
                }
                if (num == "-0") {
                    num = "0";
                }
                output.writeString(num);
            }
            else if (/string|boolean/.test(typeof x)) {
                output.writeString(String(x));
            }
            else if (typeof x.get == "function") {
                output.write(x.get());
            }
            else if (typeof x == "object") {
                if (!x) {
                    output.writeString("null");
                } else {
                    out(new PDFDictionary(x));
                }
            }
        }
    }
    out.writeData = function(data) {
        output.write(data);
    };
    out.withIndent = function(f) {
        ++indentLevel;
        f(out);
        --indentLevel;
    };
    out.indent = function() {
        out(NL, pad("", indentLevel * 2, "  "));
        out.apply(null, arguments);
    };
    out.offset = function() {
        return output.offset();
    };
    out.toString = function() {
        throw new Error("FIX CALLER");
    };
    out.get = function() {
        return output.get();
    };
    out.stream = function() {
        return output;
    };
    return out;
}

function wrapObject(value, id) {
    var beforeRender = value.beforeRender;
    var renderValue = value.render;

    value.beforeRender = function(){};

    value.render = function(out) {
        out(id, " 0 R");
    };

    value.renderFull = function(out) {
        value._offset = out.offset();
        out(id, " 0 obj ");
        beforeRender.call(value, out);
        renderValue.call(value, out);
        out(" endobj");
    };
}

function getPaperOptions(getOption) {
    if (typeof getOption != "function") {
        var options = getOption;
        getOption = function(key, def) {
            return key in options ? options[key] : def;
        };
    }
    var paperSize = getOption("paperSize", PAPER_SIZE.a4);
    if (!paperSize) {
        return {};
    }
    if (typeof paperSize == "string") {
        paperSize = PAPER_SIZE[paperSize.toLowerCase()];
        if (paperSize == null) {
            throw new Error("Unknown paper size");
        }
    }

    paperSize[0] = unitsToPoints(paperSize[0]);
    paperSize[1] = unitsToPoints(paperSize[1]);

    if (getOption("landscape", false)) {
        paperSize = [
            Math.max(paperSize[0], paperSize[1]),
            Math.min(paperSize[0], paperSize[1])
        ];
    }

    var margin = getOption("margin");
    if (margin) {
        if (typeof margin == "string" || typeof margin == "number") {
            margin = unitsToPoints(margin, 0);
            margin = { left: margin, top: margin, right: margin, bottom: margin };
        } else {
            margin = {
                left   : unitsToPoints(margin.left, 0),
                top    : unitsToPoints(margin.top, 0),
                right  : unitsToPoints(margin.right, 0),
                bottom : unitsToPoints(margin.bottom, 0)
            };
        }
        if (getOption("addMargin")) {
            paperSize[0] += margin.left + margin.right;
            paperSize[1] += margin.top + margin.bottom;
        }
    }
    return { paperSize: paperSize, margin: margin };
}

var FONT_CACHE = {
    "Times-Roman"           : true,
    "Times-Bold"            : true,
    "Times-Italic"          : true,
    "Times-BoldItalic"      : true,
    "Helvetica"             : true,
    "Helvetica-Bold"        : true,
    "Helvetica-Oblique"     : true,
    "Helvetica-BoldOblique" : true,
    "Courier"               : true,
    "Courier-Bold"          : true,
    "Courier-Oblique"       : true,
    "Courier-BoldOblique"   : true,
    "Symbol"                : true,
    "ZapfDingbats"          : true
};

function loadBinary(url, cont) {
    // IE throws Accesss denied error for Data URIs
    let m;
    if (browser.msie && (m = /^data:.*?;base64,/i.exec(url))) {
        cont(base64ToUint8Array(url.substr(m[0].length)));
        return;
    }

    function error() {
        if (window.console) {
            if (window.console.error) {
                window.console.error("Cannot load URL: %s", url);
            } else {
                window.console.log("Cannot load URL: %s", url);
            }
        }
        cont(null);
    }
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    if (HAS_TYPED_ARRAYS) {
        req.responseType = "arraybuffer";
    }
    req.onload = function() {
        if (req.status == 200 || req.status == 304) {
            if (HAS_TYPED_ARRAYS) {
                cont(new Uint8Array(req.response));
            } else {
                cont(new window.VBArray(req.responseBody).toArray()); // IE9 only
            }
        } else {
            error();
        }
    };
    req.onerror = error;
    req.send(null);
}

function loadFont(url, cont) {
    var font = FONT_CACHE[url];
    if (font) {
        cont(font);
    } else {
        loadBinary(url, function(data){
            if (data == null) {
                throw new Error("Cannot load font from " + url);
            } else {
                var font = new TTFFont(data);
                FONT_CACHE[url] = font;
                cont(font);
            }
        });
    }
}

var IMAGE_CACHE = {};

function clearImageCache() {
    IMAGE_CACHE = {};
}

function loadImage(url, size, cont, options) {
    var img = IMAGE_CACHE[url], bloburl, blob;
    if (img) {
        cont(img);
    } else {
        img = new Image();
        if (!(/^data:/i.test(url))) {
            img.crossOrigin = "Anonymous";
        }
        if (HAS_TYPED_ARRAYS && !(/^data:/i.test(url))) {
            // IE10 fails to load images from another domain even when the server sends the
            // proper CORS headers.  a XHR, however, will be able to load the data.
            // http://stackoverflow.com/a/19734516/154985
            //
            // On the other hand, it's worth doing it this way for all browsers which support
            // responseType = "blob" (HAS_TYPED_ARRAYS will be true), because we can inspect the
            // mime type and if it's a JPEG (very common case) we can save a lot of time in
            // _load below.
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                blob = xhr.response;
                bloburl = URL.createObjectURL(blob);
                _load(bloburl);
            };
            xhr.onerror = _onerror;
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.send();
        } else {
            _load(url);
        }
    }

    function _load(url) {
        img.src = url;
        if (img.complete && !browser.msie) {
            // IE, bless it's little heart, says img.complete == true even though the image is
            // not loaded (width=0), therefore we must go the onload route (ticket 929635).
            _onload.call(img);
        } else {
            img.onload = _onload;
            img.onerror = _onerror;
        }
    }

    function _trycanvas() {
        if (!size) {
            size = { width: img.width, height: img.height };
        }

        var canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size.width, size.height);

        var imgdata;
        try {
            imgdata = ctx.getImageData(0, 0, size.width, size.height);
        } catch (ex) {
            // it tainted the canvas -- can't draw it.
            _onerror();
            return;
        } finally {
            if (bloburl) {
                URL.revokeObjectURL(bloburl);
            }
        }

        // in case it contains transparency, we must separate rgb data from the alpha
        // channel and create a PDFRawImage image with opacity.  otherwise we can use a
        // PDFJpegImage.
        //
        // to do this in one step, we create the rgb and alpha streams anyway, even if
        // we might end up not using them if hasAlpha remains false.

        var hasAlpha = false, rgb = BinaryStream(), alpha = BinaryStream();
        var rawbytes = imgdata.data;
        var i = 0;
        while (i < rawbytes.length) {
            rgb.writeByte(rawbytes[i++]);
            rgb.writeByte(rawbytes[i++]);
            rgb.writeByte(rawbytes[i++]);
            var a = rawbytes[i++];
            if (a < 255) {
                hasAlpha = true;
            }
            alpha.writeByte(a);
        }

        if (hasAlpha || options.keepPNG) {
            img = new PDFRawImage(size.width, size.height, rgb, alpha);
        } else {
            // no transparency, encode as JPEG.
            var data = canvas.toDataURL("image/jpeg", options.jpegQuality);
            data = data.substr(data.indexOf(";base64,") + 8);

            var stream = BinaryStream();
            stream.writeBase64(data);
            img = new PDFJpegImage(stream);
        }

        cont(IMAGE_CACHE[url] = img);
    }

    function _onerror() {
        cont(IMAGE_CACHE[url] = "ERROR");
    }

    function _onload() {
        if (size) {
            const svg = (blob && blob.type === 'image/svg+xml') || (
              /^data:image\/svg\+xml;/i.test(this.src.substring(0, 19))
            );

            const upscale = size.width >= img.width || size.height >= img.height;

            // Use the original image if requested size is bigger than the source,
            // unless it's an SVG that can be upscaled.
            if (!svg && upscale) {
                size = null;
            }
        }
        if (!size && blob && /^image\/jpe?g$/i.test(blob.type)) {
            // If we know we got a JPEG, we can skip the process of rendering it to a
            // canvas, getting the pixel data, searching for transparency we know we won't
            // find, getting back a data URI and then decoding the BASE64 to finally get the
            // binary we already have.  Also, we avoid downgrading the image quality, with
            // the possible drawback of making a bigger PDF; still, seems legit.
            //
            // Besides saving a lot of work, this also reuses the buffer memory
            // (BinaryStream does not create a copy), potentially saving some GC cycles.
            let reader = new FileReader();
            reader.onload = function() {
                try {
                    let img = new PDFJpegImage(BinaryStream(new Uint8Array(this.result)));
                    URL.revokeObjectURL(bloburl);
                    cont(IMAGE_CACHE[url] = img);
                } catch (ex) {
                    // if there's an error parsing the JPEG stream, it could be due to a
                    // misconfigured server (improper content-type:
                    // https://github.com/telerik/kendo-ui-core/issues/4184).  If that's the case,
                    // the canvas will still be able to draw it.
                    _trycanvas();
                }
            };
            reader.readAsArrayBuffer(blob);
        } else {
            _trycanvas();
        }
    }
}

function manyLoader(loadOne) {
    return function(urls, callback) {
        var n = urls.length, i = n;
        if (n === 0) {
            return callback();
        }
        function next() {
            if (--n === 0) {
                callback();
            }
        }
        while (i-- > 0) {
            loadOne(urls[i], next);
        }
    };
}

var loadFonts = manyLoader(loadFont);
var loadImages = function(images, callback, options) {
    options = Object.assign({
        jpegQuality : 0.92,
        keepPNG     : false
    }, options);
    var urls = Object.keys(images), n = urls.length;
    if (n === 0) {
        return callback();
    }
    function next() {
        if (--n === 0) {
            callback();
        }
    }
    urls.forEach(function(url){
        loadImage(url, images[url], next, options);
    });
};

class PDFDocument {
    constructor (options) {
        var self = this;
        var out = makeOutput();
        var objcount = 0;
        var objects = [];

        function getOption(name, defval) {
            return (options && options[name] != null) ? options[name] : defval;
        }

        self.getOption = getOption;

        self.attach = function(value) {
            if (objects.indexOf(value) < 0) {
                wrapObject(value, ++objcount);
                objects.push(value);
            }
            return value;
        };

        self.pages = [];

        self.FONTS = {};
        self.IMAGES = {};
        self.GRAD_COL_FUNCTIONS = {}; // cache for color gradient functions
        self.GRAD_OPC_FUNCTIONS = {}; // cache for opacity gradient functions
        self.GRAD_COL = {};     // cache for whole color gradient objects
        self.GRAD_OPC = {};     // cache for whole opacity gradient objects

        var catalog = self.attach(new PDFCatalog());
        var pageTree = self.attach(new PDFPageTree());

        if (getOption("autoPrint")) {
            let nameTree = {};
            nameTree.JavaScript = new PDFDictionary({ Names: [
                new PDFString("JS"), self.attach(new PDFDictionary({
                    S: _("JavaScript"),
                    JS: new PDFString("print(true);")
                }))
            ] });
            catalog.props.Names = new PDFDictionary(nameTree);
        }

        catalog.setPages(pageTree);

        var info = self.attach(new PDFDictionary({
            Producer     : new PDFString(getOption("producer", "Kendo UI PDF Generator"), true), // XXX: kendo.version?
            Title        : new PDFString(getOption("title", ""), true),
            Author       : new PDFString(getOption("author", ""), true),
            Subject      : new PDFString(getOption("subject", ""), true),
            Keywords     : new PDFString(getOption("keywords", ""), true),
            Creator      : new PDFString(getOption("creator", "Kendo UI PDF Generator"), true),
            CreationDate : getOption("date", new Date())
        }));

        self.addPage = function(options) {
            var paperOptions  = getPaperOptions(function(name, defval){
                return (options && options[name] != null) ? options[name] : defval;
            });
            var paperSize     = paperOptions.paperSize;
            var margin        = paperOptions.margin;
            var contentWidth  = paperSize[0];
            var contentHeight = paperSize[1];
            if (margin) {
                contentWidth -= margin.left + margin.right;
                contentHeight -= margin.top + margin.bottom;
            }
            var content = new PDFStream(makeOutput(), null, true);
            var props = {
                Contents : self.attach(content),
                Parent   : pageTree,
                MediaBox : [ 0, 0, paperSize[0], paperSize[1] ]
            };
            var page = new PDFPage(self, props);
            page._content = content;
            pageTree.addPage(self.attach(page));

            // canvas-like coord. system.  (0,0) is upper-left.
            // text must be vertically mirorred before drawing.
            page.transform(1, 0, 0, -1, 0, paperSize[1]);

            if (margin) {
                page.translate(margin.left, margin.top);
                // XXX: clip to right/bottom margin.  Make this optional?
                page.rect(0, 0, contentWidth, contentHeight);
                page.clip();
            }

            self.pages.push(page);
            return page;
        };

        self.render = function() {
            var i;
            /// file header
            out("%PDF-1.4", NL, "%\xc2\xc1\xda\xcf\xce", NL, NL);

            /// file body
            for (i = 0; i < objects.length; ++i) {
                objects[i].renderFull(out);
                out(NL, NL);
            }

            /// cross-reference table
            var xrefOffset = out.offset();
            out("xref", NL, 0, " ", objects.length + 1, NL);
            out("0000000000 65535 f ", NL);
            for (i = 0; i < objects.length; ++i) {
                out(zeropad(objects[i]._offset, 10), " 00000 n ", NL);
            }
            out(NL);

            /// trailer
            out("trailer", NL);
            out(new PDFDictionary({
                Size: objects.length + 1,
                Root: catalog,
                Info: info
            }), NL, NL);

            /// end
            out("startxref", NL, xrefOffset, NL);
            out("%%EOF", NL);

            return out.stream().offset(0);
        };

        self.loadFonts = loadFonts;
        self.loadImages = loadImages;
    }

    getFont(url) {
        var font = this.FONTS[url];
        if (!font) {
            font = FONT_CACHE[url];
            if (!font) {
                throw new Error("Font " + url + " has not been loaded");
            }
            if (font === true) {
                font = this.attach(new PDFStandardFont(url));
            } else {
                font = this.attach(new PDFFont(this, font));
            }
            this.FONTS[url] = font;
        }
        return font;
    }

    getImage(url) {
        var img = this.IMAGES[url];
        if (!img) {
            img = IMAGE_CACHE[url];
            if (!img) {
                throw new Error("Image " + url + " has not been loaded");
            }
            if (img === "ERROR") {
                return null;
            }
            img = this.IMAGES[url] = this.attach(img.asStream(this));
        }
        return img;
    }

    getOpacityGS(opacity, forStroke) {
        var id = parseFloat(opacity).toFixed(3);
        opacity = parseFloat(id);
        id += forStroke ? "S" : "F";
        var cache = this._opacityGSCache || (this._opacityGSCache = {});
        var gs = cache[id];
        if (!gs) {
            var props = {
                Type: _("ExtGState")
            };
            if (forStroke) {
                props.CA = opacity;
            } else {
                props.ca = opacity;
            }
            gs = this.attach(new PDFDictionary(props));
            gs._resourceName = _("GS" + (++RESOURCE_COUNTER));
            cache[id] = gs;
        }
        return gs;
    }

    dict(props) {
        return new PDFDictionary(props);
    }

    name(str) {
        return _(str);
    }

    stream(props, content) {
        return new PDFStream(content, props);
    }
}

/* -----[ utils ]----- */

function pad(str, len, ch) {
    while (str.length < len) {
        str = ch + str;
    }
    return str;
}

function zeropad(n, len) {
    return pad(String(n), len, "0");
}

function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

var isArray = Array.isArray || function(obj) {
    return obj instanceof Array;
};

function isDate(obj) {
    return obj instanceof Date;
}

function renderArray(a, out) {
    out("[");
    if (a.length > 0) {
        out.withIndent(function(){
            for (var i = 0; i < a.length; ++i) {
                if (i > 0 && i % 8 === 0) {
                    out.indent(a[i]);
                } else {
                    out(" ", a[i]);
                }
            }
        });
        //out.indent();
    }
    out(" ]");
}

function renderDate(date, out) {
    out("(D:",
        zeropad(date.getUTCFullYear(), 4),
        zeropad(date.getUTCMonth() + 1, 2),
        zeropad(date.getUTCDate(), 2),
        zeropad(date.getUTCHours(), 2),
        zeropad(date.getUTCMinutes(), 2),
        zeropad(date.getUTCSeconds(), 2),
        "Z)");
}

function mm2pt(mm) {
    return mm * (72/25.4);
}

function cm2pt(cm) {
    return mm2pt(cm * 10);
}

function in2pt(inch)  {
    return inch * 72;
}


function unitsToPoints(x, def) {
    if (typeof x == "number") {
        return x;
    }
    if (typeof x == "string") {
        var m;
        m = /^\s*([0-9.]+)\s*(mm|cm|in|pt)\s*$/.exec(x);
        if (m) {
            var num = parseFloat(m[1]);
            if (!isNaN(num)) {
                if (m[2] == "pt") {
                    return num;
                }
                return {
                    "mm": mm2pt,
                    "cm": cm2pt,
                    "in": in2pt
                }[m[2]](num);
            }
        }
    }
    if (def != null) {
        return def;
    }
    throw new Error("Can't parse unit: " + x);
}

/* -----[ PDF basic objects ]----- */

class PDFValue {
    beforeRender() {}
}

class PDFString extends PDFValue {
    constructor(value, utf16be) {
        super();
        this.value = value;
        this.utf16be = Boolean(utf16be);
    }

    render(out) {
        let txt = this.value;
        if (this.utf16be) {
            txt = BOM + encodeUTF16BE(txt);
            txt = txt.replace(/([\(\)\\])/g, "\\$1");
            out("(", txt, ")");
        } else {
            // out.writeString truncates charcodes to 8 bits and
            // 0x128 & 0xFF is 40, the code for open paren.
            // therefore we need to do the chopping here to make
            // sure we backslash all cases.
            let data = [ 40 ]; // open PDF string '('
            for (var i = 0; i < txt.length; ++i) {
                let code = txt.charCodeAt(i) & 0xFF;
                if (code == 40 || code == 41 || code == 92) {
                    // backslash before (, ) and \
                    data.push(92);
                }
                data.push(code);
            }
            data.push(41);  // ')' close PDF string
            out.writeData(data);
        }
    }

    toString() {
        return this.value;
    }
}

class PDFHexString extends PDFString {
    constructor(value) {
        super(value);
        this.value = value;
    }

    render(out) {
        out("<");
        for (var i = 0; i < this.value.length; ++i) {
            out(zeropad(this.value.charCodeAt(i).toString(16), 4));
        }
        out(">");
    }
}

/// names
class PDFName extends PDFValue {
    static get(name) {
        return _(name);
    }

    constructor(name) {
        super();
        this.name = name;
    }

    render(out) {
        out("/" + this.escape());
    }

    escape() {
        return this.name.replace(/[^\x21-\x7E]/g, function(c){
            return "#" + zeropad(c.charCodeAt(0).toString(16), 2);
        });
    }

    toString() {
        return this.name;
    }
}

var PDFName_cache = {};

function _(name) {
    if (hasOwnProperty(PDFName_cache, name)) {
        return PDFName_cache[name];
    }
    return (PDFName_cache[name] = new PDFName(name));
}

/// dictionary

class PDFDictionary extends PDFValue {
    constructor(props) {
        super();
        this.props = props;
    }

    render(out) {
        var props = this.props, empty = true;
        out("<<");
        out.withIndent(function(){
            for (var i in props) {
                if (hasOwnProperty(props, i) && !/^_/.test(i)) {
                    empty = false;
                    out.indent(_(i), " ", props[i]);
                }
            }
        });
        if (!empty) {
            out.indent();
        }
        out(">>");
    }
}

/// streams

class PDFStream extends PDFValue {
    constructor(data, props, compress) {
        super();
        if (typeof data == "string") {
            var tmp = BinaryStream();
            tmp.write(data);
            data = tmp;
        }
        this.data = data;
        this.props = props || {};
        this.compress = compress;
    }

    render(out) {
        var data = this.data.get(), props = this.props;
        if (this.compress && supportsDeflate()) {
            if (!props.Filter) {
                props.Filter = [];
            } else if (!(props.Filter instanceof Array)) {
                props.Filter = [ props.Filter ];
            }
            props.Filter.unshift(_("FlateDecode"));
            data = deflate(data);
        }
        props.Length = data.length;
        out(new PDFDictionary(props), " stream", NL);
        out.writeData(data);
        out(NL, "endstream");
    }
}

/// catalog

class PDFCatalog extends PDFDictionary {
    constructor() {
        super({
            Type: _("Catalog")
        });
    }

    setPages(pagesObj) {
        this.props.Pages = pagesObj;
    }
}

/// page tree

class PDFPageTree extends PDFDictionary {
    constructor() {
        super({
            Type  : _("Pages"),
            Kids  : [],
            Count : 0
        });
    }

    addPage(pageObj) {
        this.props.Kids.push(pageObj);
        this.props.Count++;
    }
}

/// images

// JPEG

var SOF_CODES = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf];

class PDFJpegImage {
    constructor(data) {
        // we must determine the correct color space.  we'll parse a bit
        // of the JPEG stream for this, it's still better than going
        // through the canvas.
        // https://github.com/telerik/kendo-ui-core/issues/2845
        data.offset(0);
        var width, height, colorSpace, bitsPerComponent;
        var soi = data.readShort();
        if (soi != 0xFFD8) {
            // XXX: do we have some better options here?
            throw new Error("Invalid JPEG image");
        }
        while (!data.eof()) {
            var ff = data.readByte();
            if (ff != 0xFF) {
                throw new Error("Invalid JPEG image");
            }
            var marker = data.readByte();
            var length = data.readShort();
            if (SOF_CODES.indexOf(marker) >= 0) {
                // "start of frame" marker
                bitsPerComponent = data.readByte();
                height = data.readShort();
                width = data.readShort();
                colorSpace = data.readByte();
                break;
            }
            data.skip(length - 2);
        }

        if (colorSpace == null) {
            throw new Error("Invalid JPEG image");
        }

        var props = {
            Type             : _("XObject"),
            Subtype          : _("Image"),
            Width            : width,
            Height           : height,
            BitsPerComponent : bitsPerComponent,
            Filter           : _("DCTDecode")
        };

        switch (colorSpace) {
        case 1:
            props.ColorSpace = _("DeviceGray");
            break;
        case 3:
            props.ColorSpace = _("DeviceRGB");
            break;
        case 4:
            props.ColorSpace = _("DeviceCMYK");
            props.Decode = [ 1, 0, 1, 0, 1, 0, 1, 0 ]; // invert colors
            break;
        }

        this.asStream = function() {
            data.offset(0);
            var stream = new PDFStream(data, props);
            stream._resourceName = _("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }
}

// PDFRawImage will be used for images with transparency (PNG)

class PDFRawImage {
    constructor(width, height, rgb, alpha) {
        this.asStream = function(pdf) {
            var mask = new PDFStream(alpha, {
                Type             : _("XObject"),
                Subtype          : _("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : _("DeviceGray")
            }, true);
            var stream = new PDFStream(rgb, {
                Type             : _("XObject"),
                Subtype          : _("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : _("DeviceRGB"),
                SMask            : pdf.attach(mask)
            }, true);
            stream._resourceName = _("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }
}

/// standard fonts

class PDFStandardFont extends PDFDictionary {
    constructor(name){
        super({
            Type     : _("Font"),
            Subtype  : _("Type1"),
            BaseFont : _(name)
        });

        this._resourceName = _("F" + (++RESOURCE_COUNTER));
    }

    encodeText(str) {
        return new PDFString(String(str));
    }
}

/// TTF fonts

class PDFFont extends PDFDictionary {
    constructor(pdf, font, props){
        super({});

        props = this.props;
        props.Type = _("Font");
        props.Subtype = _("Type0");
        props.Encoding = _("Identity-H");

        this._pdf = pdf;
        this._font = font;
        this._sub = font.makeSubset();
        this._resourceName = _("F" + (++RESOURCE_COUNTER));

        var head = font.head;

        this.name = font.psName;
        var scale = this.scale = font.scale;
        this.bbox = [
            head.xMin * scale,
            head.yMin * scale,
            head.xMax * scale,
            head.yMax * scale
        ];

        this.italicAngle = font.post.italicAngle;
        this.ascent = font.ascent * scale;
        this.descent = font.descent * scale;
        this.lineGap = font.lineGap * scale;
        this.capHeight = font.os2.capHeight || this.ascent;
        this.xHeight = font.os2.xHeight || 0;
        this.stemV = 0;

        this.familyClass = (font.os2.familyClass || 0) >> 8;
        this.isSerif = this.familyClass >= 1 && this.familyClass <= 7;
        this.isScript = this.familyClass == 10;

        this.flags = ((font.post.isFixedPitch ? 1 : 0) |
                    (this.isSerif ? 1 << 1 : 0) |
                    (this.isScript ? 1 << 3 : 0) |
                    (this.italicAngle !== 0 ? 1 << 6 : 0) |
                    (1 << 5));
        }

        encodeText(text) {
            return new PDFHexString(this._sub.encodeText(String(text)));
        }

        getTextWidth(fontSize, text) {
            var width = 0, codeMap = this._font.cmap.codeMap;
            for (var i = 0; i < text.length; ++i) {
                var glyphId = codeMap[text.charCodeAt(i)];
                width += this._font.widthOfGlyph(glyphId || 0);
            }
            return width * fontSize / 1000;
        }

        beforeRender() {
            var self = this;
            var sub = self._sub;

            // write the TTF data
            var data = sub.render();
            var fontStream = new PDFStream(BinaryStream(data), {
                Length1: data.length
            }, true);

            var descriptor = self._pdf.attach(new PDFDictionary({
                Type         : _("FontDescriptor"),
                FontName     : _(self._sub.psName),
                FontBBox     : self.bbox,
                Flags        : self.flags,
                StemV        : self.stemV,
                ItalicAngle  : self.italicAngle,
                Ascent       : self.ascent,
                Descent      : self.descent,
                CapHeight    : self.capHeight,
                XHeight      : self.xHeight,
                FontFile2    : self._pdf.attach(fontStream)
            }));

            var cmap = sub.ncid2ogid;
            var firstChar = sub.firstChar;
            var lastChar = sub.lastChar;
            var charWidths = [];
            (function loop(i, chunk){
                if (i <= lastChar) {
                    var gid = cmap[i];
                    if (gid == null) {
                        loop(i + 1);
                    } else {
                        if (!chunk) {
                            charWidths.push(i, chunk = []);
                        }
                        chunk.push(self._font.widthOfGlyph(gid));
                        loop(i + 1, chunk);
                    }
                }
            })(firstChar);

            // As if two dictionaries weren't enough, we need another
            // one, the "descendant font".  Only that one can be of
            // Subtype CIDFontType2.  PDF is the X11 of document
            // formats: portable but full of legacy that nobody cares
            // about anymore.

            var descendant = new PDFDictionary({
                Type: _("Font"),
                Subtype: _("CIDFontType2"),
                BaseFont: _(self._sub.psName),
                CIDSystemInfo: new PDFDictionary({
                    Registry   : new PDFString("Adobe"),
                    Ordering   : new PDFString("Identity"),
                    Supplement : 0
                }),
                FontDescriptor: descriptor,
                FirstChar: firstChar,
                LastChar: lastChar,
                DW: Math.round(self._font.widthOfGlyph(0)),
                W: charWidths,
                CIDToGIDMap: self._pdf.attach(self._makeCidToGidMap())
            });

            var dict = self.props;
            dict.BaseFont = _(self._sub.psName);
            dict.DescendantFonts = [ self._pdf.attach(descendant) ];

            // Compute the ToUnicode map so that apps can extract
            // meaningful text from the PDF.
            var unimap = new PDFToUnicodeCmap(firstChar, lastChar, sub.subset);
            var unimapStream = new PDFStream(makeOutput(), null, true);
            unimapStream.data(unimap);
            dict.ToUnicode = self._pdf.attach(unimapStream);
        }

        _makeCidToGidMap() {
            return new PDFStream(BinaryStream(this._sub.cidToGidMap()), null, true);
        }
}

class PDFToUnicodeCmap extends PDFValue {
    constructor(firstChar, lastChar, map){
        super();
        this.firstChar = firstChar;
        this.lastChar = lastChar;
        this.map = map;
    }

    render(out) {
        out.indent("/CIDInit /ProcSet findresource begin");
        out.indent("12 dict begin");
        out.indent("begincmap");
        out.indent("/CIDSystemInfo <<");
        out.indent("  /Registry (Adobe)");
        out.indent("  /Ordering (UCS)");
        out.indent("  /Supplement 0");
        out.indent(">> def");
        out.indent("/CMapName /Adobe-Identity-UCS def");
        out.indent("/CMapType 2 def");
        out.indent("1 begincodespacerange");
        out.indent("  <0000><ffff>");
        out.indent("endcodespacerange");

        var self = this;
        out.indent(self.lastChar - self.firstChar + 1, " beginbfchar");
        out.withIndent(function(){
            for (var code = self.firstChar; code <= self.lastChar; ++code) {
                var unicode = self.map[code];
                var str = ucs2encode([ unicode ]);
                out.indent("<", zeropad(code.toString(16), 4), ">", "<");
                for (var i = 0; i < str.length; ++i) {
                    out(zeropad(str.charCodeAt(i).toString(16), 4));
                }
                out(">");
            }
        });
        out.indent("endbfchar");

        out.indent("endcmap");
        out.indent("CMapName currentdict /CMap defineresource pop");
        out.indent("end");
        out.indent("end");
    }
}

/// gradients

function makeHash(a) {
    return a.map(function(x){
        return isArray(x) ? makeHash(x)
            : typeof x == "number" ? (Math.round(x * 1000) / 1000).toFixed(3)
            : x;
    }).join(" ");
}

function cacheColorGradientFunction(pdf, r1, g1, b1, r2, g2, b2) {
    var hash = makeHash([ r1, g1, b1, r2, g2, b2 ]);
    var func = pdf.GRAD_COL_FUNCTIONS[hash];
    if (!func) {
        func = pdf.GRAD_COL_FUNCTIONS[hash] = pdf.attach(new PDFDictionary({
            FunctionType: 2,
            Domain: [ 0, 1 ],
            Range: [ 0, 1, 0, 1, 0, 1 ],
            N: 1,
            C0: [ r1 , g1 , b1 ],
            C1: [ r2 , g2 , b2 ]
        }));
    }
    return func;
}

function cacheOpacityGradientFunction(pdf, a1, a2) {
    var hash = makeHash([ a1, a2 ]);
    var func = pdf.GRAD_OPC_FUNCTIONS[hash];
    if (!func) {
        func = pdf.GRAD_OPC_FUNCTIONS[hash] = pdf.attach(new PDFDictionary({
            FunctionType: 2,
            Domain: [ 0, 1 ],
            Range: [ 0, 1 ],
            N: 1,
            C0: [ a1 ],
            C1: [ a2 ]
        }));
    }
    return func;
}

function makeGradientFunctions(pdf, stops) {
    var hasAlpha = false;
    var opacities = [];
    var colors = [];
    var offsets = [];
    var encode = [];
    var i, prev, cur, prevColor, curColor;
    for (i = 1; i < stops.length; ++i) {
        prev = stops[i - 1];
        cur = stops[i];
        prevColor = prev.color;
        curColor = cur.color;
        colors.push(cacheColorGradientFunction(
            pdf,
            prevColor.r, prevColor.g, prevColor.b,
            curColor.r,  curColor.g,  curColor.b
        ));
        if (prevColor.a < 1 || curColor.a < 1) {
            hasAlpha = true;
        }
        offsets.push(cur.offset);
        encode.push(0, 1);
    }
    if (hasAlpha) {
        for (i = 1; i < stops.length; ++i) {
            prev = stops[i - 1];
            cur = stops[i];
            prevColor = prev.color;
            curColor = cur.color;
            opacities.push(cacheOpacityGradientFunction(
                pdf, prevColor.a, curColor.a
            ));
        }
    }
    offsets.pop();
    return {
        hasAlpha  : hasAlpha,
        colors    : assemble(colors),
        opacities : hasAlpha ? assemble(opacities) : null
    };
    function assemble(funcs) {
        if (funcs.length == 1) {
            return funcs[0];
        }
        return {
            FunctionType: 3,
            Functions: funcs,
            Domain: [ 0, 1 ],
            Bounds: offsets,
            Encode: encode
        };
    }
}

function cacheColorGradient(pdf, isRadial, stops, coords, funcs, box) {
    var shading, hash;
    // if box is given then we have user-space coordinates, which
    // means the gradient is designed for a certain position/size
    // on page.  caching won't do any good.
    if (!box) {
        var a = [ isRadial ].concat(coords);
        stops.forEach(function(x){
            a.push(x.offset, x.color.r, x.color.g, x.color.b);
        });
        hash = makeHash(a);
        shading = pdf.GRAD_COL[hash];
    }
    if (!shading) {
        shading = new PDFDictionary({
            Type: _("Shading"),
            ShadingType: isRadial ? 3 : 2,
            ColorSpace: _("DeviceRGB"),
            Coords: coords,
            Domain: [ 0, 1 ],
            Function: funcs,
            Extend: [ true, true ]
        });
        pdf.attach(shading);
        shading._resourceName = "S" + (++RESOURCE_COUNTER);
        if (hash) {
            pdf.GRAD_COL[hash] = shading;
        }
    }
    return shading;
}

function cacheOpacityGradient(pdf, isRadial, stops, coords, funcs, box) {
    var opacity, hash;
    // if box is given then we have user-space coordinates, which
    // means the gradient is designed for a certain position/size
    // on page.  caching won't do any good.
    if (!box) {
        var a = [ isRadial ].concat(coords);
        stops.forEach(function(x){
            a.push(x.offset, x.color.a);
        });
        hash = makeHash(a);
        opacity = pdf.GRAD_OPC[hash];
    }
    if (!opacity) {
        opacity = new PDFDictionary({
            Type: _("ExtGState"),
            AIS: false,
            CA: 1,
            ca: 1,
            SMask: {
                Type: _("Mask"),
                S: _("Luminosity"),
                G: pdf.attach(new PDFStream("/a0 gs /s0 sh", {
                    Type: _("XObject"),
                    Subtype: _("Form"),
                    FormType: 1,
                    BBox: (box ? [
                        box.left, box.top + box.height, box.left + box.width, box.top
                    ] : [ 0, 1, 1, 0 ]),
                    Group: {
                        Type: _("Group"),
                        S: _("Transparency"),
                        CS: _("DeviceGray"),
                        I: true
                    },
                    Resources: {
                        ExtGState: {
                            a0: { CA: 1, ca: 1 }
                        },
                        Shading: {
                            s0: {
                                ColorSpace: _("DeviceGray"),
                                Coords: coords,
                                Domain: [ 0, 1 ],
                                ShadingType: isRadial ? 3 : 2,
                                Function: funcs,
                                Extend: [ true, true ]
                            }
                        }
                    }
                }))
            }
        });
        pdf.attach(opacity);
        opacity._resourceName = "O" + (++RESOURCE_COUNTER);
        if (hash) {
            pdf.GRAD_OPC[hash] = opacity;
        }
    }
    return opacity;
}

function cacheGradient(pdf, gradient, box) {
    var isRadial = gradient.type == "radial";
    var funcs = makeGradientFunctions(pdf, gradient.stops);
    var coords = isRadial ? [
        gradient.start.x , gradient.start.y , gradient.start.r,
        gradient.end.x   , gradient.end.y   , gradient.end.r
    ] : [
        gradient.start.x , gradient.start.y,
        gradient.end.x   , gradient.end.y
    ];
    var shading = cacheColorGradient(
        pdf, isRadial, gradient.stops, coords, funcs.colors, gradient.userSpace && box
    );
    var opacity = funcs.hasAlpha ? cacheOpacityGradient(
        pdf, isRadial, gradient.stops, coords, funcs.opacities, gradient.userSpace && box
    ) : null;
    return {
        hasAlpha: funcs.hasAlpha,
        shading: shading,
        opacity: opacity
    };
}

/// page object

class PDFPage extends PDFDictionary {
    constructor(pdf, props){
        super(props);

        this._pdf = pdf;
        this._rcount = 0;
        this._textMode = false;
        this._fontResources = {};
        this._gsResources = {};
        this._xResources = {};
        this._patResources = {};
        this._shResources = {};
        this._opacity = 1;
        this._matrix = [ 1, 0, 0, 1, 0, 0 ];
        this._annotations = [];

        this._font = null;
        this._fontSize = null;

        this._contextStack = [];

        props = this.props;
        props.Type = _("Page");
        props.ProcSet = [
            _("PDF"),
            _("Text"),
            _("ImageB"),
            _("ImageC"),
            _("ImageI")
        ];
        props.Resources = new PDFDictionary({
            Font      : new PDFDictionary(this._fontResources),
            ExtGState : new PDFDictionary(this._gsResources),
            XObject   : new PDFDictionary(this._xResources),
            Pattern   : new PDFDictionary(this._patResources),
            Shading   : new PDFDictionary(this._shResources)
        });
        props.Annots = this._annotations;
    }

    _out() {
        this._content.data.apply(null, arguments);
    }

    transform(a, b, c, d, e, f) {
        if (!isIdentityMatrix(arguments)) {
            this._matrix = mmul(arguments, this._matrix);
            this._out(a, " ", b, " ", c, " ", d, " ", e, " ", f, " cm");
            // XXX: debug
            // this._out(" % current matrix: ", this._matrix);
            this._out(NL);
        }
    }

    translate(dx, dy) {
        this.transform(1, 0, 0, 1, dx, dy);
    }

    scale(sx, sy) {
        this.transform(sx, 0, 0, sy, 0, 0);
    }

    rotate(angle) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        this.transform(cos, sin, -sin, cos, 0, 0);
    }

    beginText() {
        this._textMode = true;
        this._out("BT", NL);
    }

    endText() {
        this._textMode = false;
        this._out("ET", NL);
    }

    _requireTextMode() {
        if (!this._textMode) {
            throw new Error("Text mode required; call page.beginText() first");
        }
    }

    _requireFont() {
        if (!this._font) {
            throw new Error("No font selected; call page.setFont() first");
        }
    }

    setFont(font, size) {
        this._requireTextMode();
        if (font == null) {
            font = this._font;
        } else if (!(font instanceof PDFFont)) {
            font = this._pdf.getFont(font);
        }
        if (size == null) {
            size = this._fontSize;
        }
        this._fontResources[font._resourceName] = font;
        this._font = font;
        this._fontSize = size;
        this._out(font._resourceName, " ", size, " Tf", NL);
    }

    setTextLeading(size) {
        this._requireTextMode();
        this._out(size, " TL", NL);
    }

    setTextRenderingMode(mode) {
        this._requireTextMode();
        this._out(mode, " Tr", NL);
    }

    showText(text, requestedWidth) {
        this._requireFont();
        if (text.length > 1 && requestedWidth && this._font instanceof PDFFont) {
            var outputWidth = this._font.getTextWidth(this._fontSize, text);
            var scale = requestedWidth / outputWidth * 100;
            this._out(scale, " Tz ");
        }
        this._out(this._font.encodeText(text), " Tj", NL);
    }

    showTextNL(text) {
        this._requireFont();
        this._out(this._font.encodeText(text), " '", NL);
    }

    addLink(uri, box) {
        var ll = this._toPage({ x: box.left, y: box.bottom });
        var ur = this._toPage({ x: box.right, y: box.top });
        this._annotations.push(new PDFDictionary({
            Type    : _("Annot"),
            Subtype : _("Link"),
            Rect    : [ ll.x, ll.y, ur.x, ur.y ],
            Border  : [ 0, 0, 0 ],
            A       : new PDFDictionary({
                Type : _("Action"),
                S    : _("URI"),
                URI  : new PDFString(uri)
            })
        }));
    }

    setStrokeColor(r, g, b) {
        this._out(r, " ", g, " ", b, " RG", NL);
    }

    setOpacity(opacity) {
        this.setFillOpacity(opacity);
        this.setStrokeOpacity(opacity);
        this._opacity *= opacity;
    }

    setStrokeOpacity(opacity) {
        if (opacity < 1) {
            var gs = this._pdf.getOpacityGS(this._opacity * opacity, true);
            this._gsResources[gs._resourceName] = gs;
            this._out(gs._resourceName, " gs", NL);
        }
    }

    setFillColor(r, g, b) {
        this._out(r, " ", g, " ", b, " rg", NL);
    }

    setFillOpacity(opacity) {
        if (opacity < 1) {
            var gs = this._pdf.getOpacityGS(this._opacity * opacity, false);
            this._gsResources[gs._resourceName] = gs;
            this._out(gs._resourceName, " gs", NL);
        }
    }

    gradient(gradient, box) {
        this.save();
        this.rect(box.left, box.top, box.width, box.height);
        this.clip();
        if (!gradient.userSpace) {
            this.transform(box.width, 0, 0, box.height, box.left, box.top);
        }
        var g = cacheGradient(this._pdf, gradient, box);
        var sname = g.shading._resourceName, oname;
        this._shResources[sname] = g.shading;
        if (g.hasAlpha) {
            oname = g.opacity._resourceName;
            this._gsResources[oname] = g.opacity;
            this._out("/" + oname + " gs ");
        }
        this._out("/" + sname + " sh", NL);
        this.restore();
    }

    setDashPattern(dashArray, dashPhase) {
        this._out(dashArray, " ", dashPhase, " d", NL);
    }

    setLineWidth(width) {
        this._out(width, " w", NL);
    }

    setLineCap(lineCap) {
        this._out(lineCap, " J", NL);
    }

    setLineJoin(lineJoin) {
        this._out(lineJoin, " j", NL);
    }

    setMitterLimit(mitterLimit) {
        this._out(mitterLimit, " M", NL);
    }

    save() {
        this._contextStack.push(this._context());
        this._out("q", NL);
    }

    restore() {
        this._out("Q", NL);
        this._context(this._contextStack.pop());
    }


    // paths
    moveTo(x, y) {
        this._out(x, " ", y, " m", NL);
    }

    lineTo(x, y) {
        this._out(x, " ", y, " l", NL);
    }

    bezier(x1, y1, x2, y2, x3, y3) {
        this._out(x1, " ", y1, " ", x2, " ", y2, " ", x3, " ", y3, " c", NL);
    }

    bezier1(x1, y1, x3, y3) {
        this._out(x1, " ", y1, " ", x3, " ", y3, " y", NL);
    }

    bezier2(x2, y2, x3, y3) {
        this._out(x2, " ", y2, " ", x3, " ", y3, " v", NL);
    }

    close() {
        this._out("h", NL);
    }

    rect(x, y, w, h) {
        this._out(x, " ", y, " ", w, " ", h, " re", NL);
    }

    ellipse(x, y, rx, ry) {
        function _X(v) { return x + v; }
        function _Y(v) { return y + v; }

        // how to get to the "magic number" is explained here:
        // http://www.whizkidtech.redprince.net/bezier/circle/kappa/
        var k = 0.5522847498307936;

        this.moveTo(_X(0), _Y(ry));
        this.bezier(
            _X(rx * k) , _Y(ry),
            _X(rx)     , _Y(ry * k),
            _X(rx)     , _Y(0)
        );
        this.bezier(
            _X(rx)     , _Y(-ry * k),
            _X(rx * k) , _Y(-ry),
            _X(0)      , _Y(-ry)
        );
        this.bezier(
            _X(-rx * k) , _Y(-ry),
            _X(-rx)     , _Y(-ry * k),
            _X(-rx)     , _Y(0)
        );
        this.bezier(
            _X(-rx)     , _Y(ry * k),
            _X(-rx * k) , _Y(ry),
            _X(0)       , _Y(ry)
        );
    }

    circle(x, y, r) {
        this.ellipse(x, y, r, r);
    }

    stroke() {
        this._out("S", NL);
    }

    nop() {
        this._out("n", NL);
    }

    clip() {
        this._out("W n", NL);
    }

    clipStroke() {
        this._out("W S", NL);
    }

    closeStroke() {
        this._out("s", NL);
    }

    fill() {
        this._out("f", NL);
    }

    fillStroke() {
        this._out("B", NL);
    }

    drawImage(url) {
        var img = this._pdf.getImage(url);
        if (img) { // the result can be null for a cross-domain image
            this._xResources[img._resourceName] = img;
            this._out(img._resourceName, " Do", NL);
        }
    }

    comment(txt) {
        var self = this;
        txt.split(/\r?\n/g).forEach(function(line){
            self._out("% ", line, NL);
        });
    }

    // internal
    _context(val) {
        if (val != null) {
            this._opacity = val.opacity;
            this._matrix = val.matrix;
        } else {
            return {
                opacity: this._opacity,
                matrix: this._matrix
            };
        }
    }

    _toPage(p) {
        var m = this._matrix;
        var a = m[0], b = m[1], c = m[2], d = m[3], e = m[4], f = m[5];
        return {
            x: a*p.x + c*p.y + e,
            y: b*p.x + d*p.y + f
        };
    }
}

function unquote(str) {
    return str.replace(/^\s*(['"])(.*)\1\s*$/, "$2");
}

function parseFontDef(fontdef) {
    // XXX: this is very crude for now and buggy.  Proper parsing is quite involved.
    var rx = /^\s*((normal|italic)\s+)?((normal|small-caps)\s+)?((normal|bold|\d+)\s+)?(([0-9.]+)(px|pt))(\/(([0-9.]+)(px|pt)|normal))?\s+(.*?)\s*$/i;
    var m = rx.exec(fontdef);
    if (!m) {
        return { fontSize: 12, fontFamily: "sans-serif" };
    }
    var fontSize = m[8] ? parseInt(m[8], 10) : 12;
    return {
        italic     : m[2] && m[2].toLowerCase() == "italic",
        variant    : m[4],
        bold       : m[6] && /bold|700/i.test(m[6]),
        fontSize   : fontSize,
        lineHeight : m[12] ? m[12] == "normal" ? fontSize : parseInt(m[12], 10) : null,
        fontFamily : m[14].split(/\s*,\s*/g).map(unquote)
    };
}

function getFontURL(style) {
    function mkFamily(name) {
        if (style.bold) {
            name += "|bold";
        }
        if (style.italic) {
            name += "|italic";
        }
        return name.toLowerCase();
    }
    var fontFamily = style.fontFamily;
    var name, url;
    if (fontFamily instanceof Array) {
        for (var i = 0; i < fontFamily.length; ++i) {
            name = mkFamily(fontFamily[i]);
            url = FONT_MAPPINGS[name];
            if (url) {
                break;
            }
        }
    } else {
        url = FONT_MAPPINGS[fontFamily.toLowerCase()];
    }
    while (typeof url == "function") {
        url = url();
    }
    if (!url) {
        url = "Times-Roman";
    }
    return url;
}

var FONT_MAPPINGS = {
    "serif"                    : "Times-Roman",
    "serif|bold"               : "Times-Bold",
    "serif|italic"             : "Times-Italic",
    "serif|bold|italic"        : "Times-BoldItalic",
    "sans-serif"               : "Helvetica",
    "sans-serif|bold"          : "Helvetica-Bold",
    "sans-serif|italic"        : "Helvetica-Oblique",
    "sans-serif|bold|italic"   : "Helvetica-BoldOblique",
    "monospace"                : "Courier",
    "monospace|bold"           : "Courier-Bold",
    "monospace|italic"         : "Courier-Oblique",
    "monospace|bold|italic"    : "Courier-BoldOblique",
    "zapfdingbats"             : "ZapfDingbats",
    "zapfdingbats|bold"        : "ZapfDingbats",
    "zapfdingbats|italic"      : "ZapfDingbats",
    "zapfdingbats|bold|italic" : "ZapfDingbats"
};

function fontAlias(alias, name) {
    alias = alias.toLowerCase();
    FONT_MAPPINGS[alias] = function() {
        return FONT_MAPPINGS[name];
    };
    FONT_MAPPINGS[alias + "|bold"] = function() {
        return FONT_MAPPINGS[name + "|bold"];
    };
    FONT_MAPPINGS[alias + "|italic"] = function() {
        return FONT_MAPPINGS[name + "|italic"];
    };
    FONT_MAPPINGS[alias + "|bold|italic"] = function() {
        return FONT_MAPPINGS[name + "|bold|italic"];
    };
}

// Let's define some common names to an appropriate replacement.
// These are overridable via pdf.defineFont, should the user want to
// include the proper versions.

fontAlias("Times New Roman" , "serif");
fontAlias("Courier New"     , "monospace");
fontAlias("Arial"           , "sans-serif");
fontAlias("Helvetica"       , "sans-serif");
fontAlias("Verdana"         , "sans-serif");
fontAlias("Tahoma"          , "sans-serif");
fontAlias("Georgia"         , "sans-serif");
fontAlias("Monaco"          , "monospace");
fontAlias("Andale Mono"     , "monospace");

function defineFont(name, url) {
    if (arguments.length == 1) {
        for (var i in name) {
            if (hasOwnProperty(name, i)) {
                defineFont(i, name[i]);
            }
        }
    } else {
        name = name.toLowerCase();
        FONT_MAPPINGS[name] = url;

        // special handling for DejaVu fonts: if they get defined,
        // let them also replace the default families, for good
        // Unicode support out of the box.
        switch (name) {
          case "dejavu sans"               : FONT_MAPPINGS["sans-serif"]              = url; break;
          case "dejavu sans|bold"          : FONT_MAPPINGS["sans-serif|bold"]         = url; break;
          case "dejavu sans|italic"        : FONT_MAPPINGS["sans-serif|italic"]       = url; break;
          case "dejavu sans|bold|italic"   : FONT_MAPPINGS["sans-serif|bold|italic"]  = url; break;
          case "dejavu serif"              : FONT_MAPPINGS["serif"]                   = url; break;
          case "dejavu serif|bold"         : FONT_MAPPINGS["serif|bold"]              = url; break;
          case "dejavu serif|italic"       : FONT_MAPPINGS["serif|italic"]            = url; break;
          case "dejavu serif|bold|italic"  : FONT_MAPPINGS["serif|bold|italic"]       = url; break;
          case "dejavu mono"               : FONT_MAPPINGS["monospace"]               = url; break;
          case "dejavu mono|bold"          : FONT_MAPPINGS["monospace|bold"]          = url; break;
          case "dejavu mono|italic"        : FONT_MAPPINGS["monospace|italic"]        = url; break;
          case "dejavu mono|bold|italic"   : FONT_MAPPINGS["monospace|bold|italic"]   = url; break;
        }
    }
}

function mmul(a, b) {
    var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
    var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
    return [
        a1*a2 + b1*c2,          a1*b2 + b1*d2,
        c1*a2 + d1*c2,          c1*b2 + d1*d2,
        e1*a2 + f1*c2 + e2,     e1*b2 + f1*d2 + f2
    ];
}

function isIdentityMatrix(m) {
    return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
}

const TEXT_RENDERING_MODE = {
    fill           : 0,
    stroke         : 1,
    fillAndStroke  : 2,
    invisible      : 3,
    fillAndClip    : 4,
    strokeAndClip  : 5,
    fillStrokeClip : 6,
    clip           : 7
};

export {
    PDFDocument as Document,
    BinaryStream,
    defineFont,
    parseFontDef,
    getFontURL,
    loadFonts,
    loadImages,
    getPaperOptions,
    clearImageCache,
    TEXT_RENDERING_MODE
};
