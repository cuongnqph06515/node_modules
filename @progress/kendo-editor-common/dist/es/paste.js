import { convertMsLists } from './listConvert';
/**
 * @hidden
 */
export var sanitize = function (html) {
    html = html.replace(/^[\s\S]+?<!--StartFragment-->\s*([\s\S]*?)\s*<!--EndFragment-->[\s\S]+$/, '$1');
    html = html.replace(/<\/?[ovw]:[^>]*?>/gi, ''); // MS elements, e.g. <o:p>, <w:sdtPr>, <v:
    html = html.replace(/<\\?\??xml[^>]*>/gi, ''); // XML namespaces
    html = html.replace(/<(?:link|meta) [^>]+?>/ig, '');
    html = html.replace(/<style[^>]*?>\s*<\/style>/ig, '');
    html = html.replace(/<\/?st1:.*?>/gi, '');
    html = html.replace(/<a name="[a-zA-Z0-9_]+">/gmi, '');
    html = html.replace(/v:shapes?="[^"]+"/ig, '');
    html = html.replace(/<!\[if !supportLists\]>/ig, '');
    html = html.replace(/<!\[endif\]>/ig, '');
    return html;
};
/**
 * @hidden
 */
export var removeComments = function (html) {
    return html.replace(/<!--[\s\S]+?-->/g, '');
};
/**
 * @hidden
 */
export var removeTag = function (html, tagPattern) {
    return html.replace(new RegExp('<\\/?(' + tagPattern + ')(?:\\s[^>]*?)?>', 'gi'), '');
};
/**
 * @hidden
 */
export var removeAttribute = function (attr) {
    if (attr.ownerElement) {
        attr.ownerElement.removeAttribute(attr.name);
    }
};
/**
 * @hidden
 */
export var sanitizeClassAttr = function (attr) {
    if (/^Mso/.test(attr.value)) {
        removeAttribute(attr);
    }
};
var stylesSplit = /\s*;\s*/;
var styleValueSplit = /\s*:\s*/;
/**
 * @hidden
 */
export var sanitizeStyleAttr = function (attr) {
    var styles = attr.value.split(stylesSplit).filter(function (st) { return Boolean(st); });
    var element = attr.ownerElement;
    var supportedStyles = element.style;
    var result = '', name, value;
    styles.forEach(function (style) {
        var _a;
        _a = style.split(styleValueSplit), name = _a[0], value = _a[1];
        if (supportedStyles[name] !== undefined) {
            result += name + ": " + value + "; ";
        }
    });
    result = result.trim();
    if (result) {
        attr.value = result;
    }
    else {
        removeAttribute(attr);
    }
};
var removeNode = function (node) {
    var parentNode = node.parentNode;
    if (parentNode) {
        while (node.firstChild) {
            parentNode.insertBefore(node.firstChild, node);
        }
        parentNode.removeChild(node);
    }
};
var sanitizeNode = function (node, attributes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        for (var i = node.attributes.length - 1; i >= 0; i--) {
            var attr = node.attributes[i];
            if (attributes[attr.name]) {
                attributes[attr.name](attr);
            }
            else if (attributes['*']) {
                attributes['*'](attr);
            }
        }
        if (node.nodeName === 'SPAN' && node.attributes.length === 0) {
            removeNode(node);
        }
    }
};
/**
 * @hidden
 */
export var pasteCleanup = function (html, settings) {
    var result = html;
    if (settings.convertMsLists) {
        result = convertMsLists(result);
    }
    if (settings.stripTags) {
        result = removeTag(result, settings.stripTags);
    }
    if (settings.attributes) {
        var div = document.createElement('div');
        div.innerHTML = result;
        Array.from(div.querySelectorAll('*')).forEach(function (node) { return sanitizeNode(node, settings.attributes); });
        result = div.innerHTML;
    }
    return result;
};
