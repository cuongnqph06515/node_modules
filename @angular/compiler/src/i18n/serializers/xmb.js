/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/i18n/serializers/xmb", ["require", "exports", "tslib", "@angular/compiler/src/i18n/digest", "@angular/compiler/src/i18n/serializers/serializer", "@angular/compiler/src/i18n/serializers/xml_helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var digest_1 = require("@angular/compiler/src/i18n/digest");
    var serializer_1 = require("@angular/compiler/src/i18n/serializers/serializer");
    var xml = require("@angular/compiler/src/i18n/serializers/xml_helper");
    var _MESSAGES_TAG = 'messagebundle';
    var _MESSAGE_TAG = 'msg';
    var _PLACEHOLDER_TAG = 'ph';
    var _EXAMPLE_TAG = 'ex';
    var _SOURCE_TAG = 'source';
    var _DOCTYPE = "<!ELEMENT messagebundle (msg)*>\n<!ATTLIST messagebundle class CDATA #IMPLIED>\n\n<!ELEMENT msg (#PCDATA|ph|source)*>\n<!ATTLIST msg id CDATA #IMPLIED>\n<!ATTLIST msg seq CDATA #IMPLIED>\n<!ATTLIST msg name CDATA #IMPLIED>\n<!ATTLIST msg desc CDATA #IMPLIED>\n<!ATTLIST msg meaning CDATA #IMPLIED>\n<!ATTLIST msg obsolete (obsolete) #IMPLIED>\n<!ATTLIST msg xml:space (default|preserve) \"default\">\n<!ATTLIST msg is_hidden CDATA #IMPLIED>\n\n<!ELEMENT source (#PCDATA)>\n\n<!ELEMENT ph (#PCDATA|ex)*>\n<!ATTLIST ph name CDATA #REQUIRED>\n\n<!ELEMENT ex (#PCDATA)>";
    var Xmb = /** @class */ (function (_super) {
        tslib_1.__extends(Xmb, _super);
        function Xmb() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Xmb.prototype.write = function (messages, locale) {
            var exampleVisitor = new ExampleVisitor();
            var visitor = new _Visitor();
            var rootNode = new xml.Tag(_MESSAGES_TAG);
            messages.forEach(function (message) {
                var attrs = { id: message.id };
                if (message.description) {
                    attrs['desc'] = message.description;
                }
                if (message.meaning) {
                    attrs['meaning'] = message.meaning;
                }
                var sourceTags = [];
                message.sources.forEach(function (source) {
                    sourceTags.push(new xml.Tag(_SOURCE_TAG, {}, [new xml.Text(source.filePath + ":" + source.startLine + (source.endLine !== source.startLine ? ',' + source.endLine : ''))]));
                });
                rootNode.children.push(new xml.CR(2), new xml.Tag(_MESSAGE_TAG, attrs, tslib_1.__spread(sourceTags, visitor.serialize(message.nodes))));
            });
            rootNode.children.push(new xml.CR());
            return xml.serialize([
                new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }),
                new xml.CR(),
                new xml.Doctype(_MESSAGES_TAG, _DOCTYPE),
                new xml.CR(),
                exampleVisitor.addDefaultExamples(rootNode),
                new xml.CR(),
            ]);
        };
        Xmb.prototype.load = function (content, url) {
            throw new Error('Unsupported');
        };
        Xmb.prototype.digest = function (message) {
            return digest(message);
        };
        Xmb.prototype.createNameMapper = function (message) {
            return new serializer_1.SimplePlaceholderMapper(message, toPublicName);
        };
        return Xmb;
    }(serializer_1.Serializer));
    exports.Xmb = Xmb;
    var _Visitor = /** @class */ (function () {
        function _Visitor() {
        }
        _Visitor.prototype.visitText = function (text, context) {
            return [new xml.Text(text.value)];
        };
        _Visitor.prototype.visitContainer = function (container, context) {
            var _this = this;
            var nodes = [];
            container.children.forEach(function (node) { return nodes.push.apply(nodes, tslib_1.__spread(node.visit(_this))); });
            return nodes;
        };
        _Visitor.prototype.visitIcu = function (icu, context) {
            var _this = this;
            var nodes = [new xml.Text("{" + icu.expressionPlaceholder + ", " + icu.type + ", ")];
            Object.keys(icu.cases).forEach(function (c) {
                nodes.push.apply(nodes, tslib_1.__spread([new xml.Text(c + " {")], icu.cases[c].visit(_this), [new xml.Text("} ")]));
            });
            nodes.push(new xml.Text("}"));
            return nodes;
        };
        _Visitor.prototype.visitTagPlaceholder = function (ph, context) {
            var startTagAsText = new xml.Text("<" + ph.tag + ">");
            var startEx = new xml.Tag(_EXAMPLE_TAG, {}, [startTagAsText]);
            // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
            var startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.startName }, [startEx, startTagAsText]);
            if (ph.isVoid) {
                // void tags have no children nor closing tags
                return [startTagPh];
            }
            var closeTagAsText = new xml.Text("</" + ph.tag + ">");
            var closeEx = new xml.Tag(_EXAMPLE_TAG, {}, [closeTagAsText]);
            // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
            var closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.closeName }, [closeEx, closeTagAsText]);
            return tslib_1.__spread([startTagPh], this.serialize(ph.children), [closeTagPh]);
        };
        _Visitor.prototype.visitPlaceholder = function (ph, context) {
            var interpolationAsText = new xml.Text("{{" + ph.value + "}}");
            // Example tag needs to be not-empty for TC.
            var exTag = new xml.Tag(_EXAMPLE_TAG, {}, [interpolationAsText]);
            return [
                // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
                new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name }, [exTag, interpolationAsText])
            ];
        };
        _Visitor.prototype.visitIcuPlaceholder = function (ph, context) {
            var icuExpression = ph.value.expression;
            var icuType = ph.value.type;
            var icuCases = Object.keys(ph.value.cases).map(function (value) { return value + ' {...}'; }).join(' ');
            var icuAsText = new xml.Text("{" + icuExpression + ", " + icuType + ", " + icuCases + "}");
            var exTag = new xml.Tag(_EXAMPLE_TAG, {}, [icuAsText]);
            return [
                // TC requires PH to have a non empty EX, and uses the text node to show the "original" value.
                new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name }, [exTag, icuAsText])
            ];
        };
        _Visitor.prototype.serialize = function (nodes) {
            var _this = this;
            return [].concat.apply([], tslib_1.__spread(nodes.map(function (node) { return node.visit(_this); })));
        };
        return _Visitor;
    }());
    function digest(message) {
        return digest_1.decimalDigest(message);
    }
    exports.digest = digest;
    // TC requires at least one non-empty example on placeholders
    var ExampleVisitor = /** @class */ (function () {
        function ExampleVisitor() {
        }
        ExampleVisitor.prototype.addDefaultExamples = function (node) {
            node.visit(this);
            return node;
        };
        ExampleVisitor.prototype.visitTag = function (tag) {
            var _this = this;
            if (tag.name === _PLACEHOLDER_TAG) {
                if (!tag.children || tag.children.length == 0) {
                    var exText = new xml.Text(tag.attrs['name'] || '...');
                    tag.children = [new xml.Tag(_EXAMPLE_TAG, {}, [exText])];
                }
            }
            else if (tag.children) {
                tag.children.forEach(function (node) { return node.visit(_this); });
            }
        };
        ExampleVisitor.prototype.visitText = function (text) { };
        ExampleVisitor.prototype.visitDeclaration = function (decl) { };
        ExampleVisitor.prototype.visitDoctype = function (doctype) { };
        return ExampleVisitor;
    }());
    // XMB/XTB placeholders can only contain A-Z, 0-9 and _
    function toPublicName(internalName) {
        return internalName.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    }
    exports.toPublicName = toPublicName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2kxOG4vc2VyaWFsaXplcnMveG1iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILDREQUF3QztJQUd4QyxnRkFBb0Y7SUFDcEYsdUVBQW9DO0lBRXBDLElBQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUN0QyxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDOUIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzFCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUU3QixJQUFNLFFBQVEsR0FBRyx1akJBa0JPLENBQUM7SUFFekI7UUFBeUIsK0JBQVU7UUFBbkM7O1FBdURBLENBQUM7UUF0REMsbUJBQUssR0FBTCxVQUFNLFFBQXdCLEVBQUUsTUFBbUI7WUFDakQsSUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUM1QyxJQUFNLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUxQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDdEIsSUFBTSxLQUFLLEdBQTBCLEVBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUMsQ0FBQztnQkFFdEQsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO29CQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckM7Z0JBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNuQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztp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aHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ZGVjaW1hbERpZ2VzdH0gZnJvbSAnLi4vZGlnZXN0JztcbmltcG9ydCAqIGFzIGkxOG4gZnJvbSAnLi4vaTE4bl9hc3QnO1xuXG5pbXBvcnQge1BsYWNlaG9sZGVyTWFwcGVyLCBTZXJpYWxpemVyLCBTaW1wbGVQbGFjZWhvbGRlck1hcHBlcn0gZnJvbSAnLi9zZXJpYWxpemVyJztcbmltcG9ydCAqIGFzIHhtbCBmcm9tICcuL3htbF9oZWxwZXInO1xuXG5jb25zdCBfTUVTU0FHRVNfVEFHID0gJ21lc3NhZ2VidW5kbGUnO1xuY29uc3QgX01FU1NBR0VfVEFHID0gJ21zZyc7XG5jb25zdCBfUExBQ0VIT0xERVJfVEFHID0gJ3BoJztcbmNvbnN0IF9FWEFNUExFX1RBRyA9ICdleCc7XG5jb25zdCBfU09VUkNFX1RBRyA9ICdzb3VyY2UnO1xuXG5jb25zdCBfRE9DVFlQRSA9IGA8IUVMRU1FTlQgbWVzc2FnZWJ1bmRsZSAobXNnKSo+XG48IUFUVExJU1QgbWVzc2FnZWJ1bmRsZSBjbGFzcyBDREFUQSAjSU1QTElFRD5cblxuPCFFTEVNRU5UIG1zZyAoI1BDREFUQXxwaHxzb3VyY2UpKj5cbjwhQVRUTElTVCBtc2cgaWQgQ0RBVEEgI0lNUExJRUQ+XG48IUFUVExJU1QgbXNnIHNlcSBDREFUQSAjSU1QTElFRD5cbjwhQVRUTElTVCBtc2cgbmFtZSBDREFUQSAjSU1QTElFRD5cbjwhQVRUTElTVCBtc2cgZGVzYyBDREFUQSAjSU1QTElFRD5cbjwhQVRUTElTVCBtc2cgbWVhbmluZyBDREFUQSAjSU1QTElFRD5cbjwhQVRUTElTVCBtc2cgb2Jzb2xldGUgKG9ic29sZXRlKSAjSU1QTElFRD5cbjwhQVRUTElTVCBtc2cgeG1sOnNwYWNlIChkZWZhdWx0fHByZXNlcnZlKSBcImRlZmF1bHRcIj5cbjwhQVRUTElTVCBtc2cgaXNfaGlkZGVuIENEQVRBICNJTVBMSUVEPlxuXG48IUVMRU1FTlQgc291cmNlICgjUENEQVRBKT5cblxuPCFFTEVNRU5UIHBoICgjUENEQVRBfGV4KSo+XG48IUFUVExJU1QgcGggbmFtZSBDREFUQSAjUkVRVUlSRUQ+XG5cbjwhRUxFTUVOVCBleCAoI1BDREFUQSk+YDtcblxuZXhwb3J0IGNsYXNzIFhtYiBleHRlbmRzIFNlcmlhbGl6ZXIge1xuICB3cml0ZShtZXNzYWdlczogaTE4bi5NZXNzYWdlW10sIGxvY2FsZTogc3RyaW5nfG51bGwpOiBzdHJpbmcge1xuICAgIGNvbnN0IGV4YW1wbGVWaXNpdG9yID0gbmV3IEV4YW1wbGVWaXNpdG9yKCk7XG4gICAgY29uc3QgdmlzaXRvciA9IG5ldyBfVmlzaXRvcigpO1xuICAgIGxldCByb290Tm9kZSA9IG5ldyB4bWwuVGFnKF9NRVNTQUdFU19UQUcpO1xuXG4gICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7aWQ6IG1lc3NhZ2UuaWR9O1xuXG4gICAgICBpZiAobWVzc2FnZS5kZXNjcmlwdGlvbikge1xuICAgICAgICBhdHRyc1snZGVzYyddID0gbWVzc2FnZS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lc3NhZ2UubWVhbmluZykge1xuICAgICAgICBhdHRyc1snbWVhbmluZyddID0gbWVzc2FnZS5tZWFuaW5nO1xuICAgICAgfVxuXG4gICAgICBsZXQgc291cmNlVGFnczogeG1sLlRhZ1tdID0gW107XG4gICAgICBtZXNzYWdlLnNvdXJjZXMuZm9yRWFjaCgoc291cmNlOiBpMThuLk1lc3NhZ2VTcGFuKSA9PiB7XG4gICAgICAgIHNvdXJjZVRhZ3MucHVzaChuZXcgeG1sLlRhZyhcbiAgICAgICAgICAgIF9TT1VSQ0VfVEFHLCB7fSxcbiAgICAgICAgICAgIFtuZXcgeG1sLlRleHQoYCR7c291cmNlLmZpbGVQYXRofToke3NvdXJjZS5zdGFydExpbmV9JHtcbiAgICAgICAgICAgICAgICBzb3VyY2UuZW5kTGluZSAhPT0gc291cmNlLnN0YXJ0TGluZSA/ICcsJyArIHNvdXJjZS5lbmRMaW5lIDogJyd9YCldKSk7XG4gICAgICB9KTtcblxuICAgICAgcm9vdE5vZGUuY2hpbGRyZW4ucHVzaChcbiAgICAgICAgICBuZXcgeG1sLkNSKDIpLFxuICAgICAgICAgIG5ldyB4bWwuVGFnKF9NRVNTQUdFX1RBRywgYXR0cnMsIFsuLi5zb3VyY2VUYWdzLCAuLi52aXNpdG9yLnNlcmlhbGl6ZShtZXNzYWdlLm5vZGVzKV0pKTtcbiAgICB9KTtcblxuICAgIHJvb3ROb2RlLmNoaWxkcmVuLnB1c2gobmV3IHhtbC5DUigpKTtcblxuICAgIHJldHVybiB4bWwuc2VyaWFsaXplKFtcbiAgICAgIG5ldyB4bWwuRGVjbGFyYXRpb24oe3ZlcnNpb246ICcxLjAnLCBlbmNvZGluZzogJ1VURi04J30pLFxuICAgICAgbmV3IHhtbC5DUigpLFxuICAgICAgbmV3IHhtbC5Eb2N0eXBlKF9NRVNTQUdFU19UQUcsIF9ET0NUWVBFKSxcbiAgICAgIG5ldyB4bWwuQ1IoKSxcbiAgICAgIGV4YW1wbGVWaXNpdG9yLmFkZERlZmF1bHRFeGFtcGxlcyhyb290Tm9kZSksXG4gICAgICBuZXcgeG1sLkNSKCksXG4gICAgXSk7XG4gIH1cblxuICBsb2FkKGNvbnRlbnQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOlxuICAgICAge2xvY2FsZTogc3RyaW5nLCBpMThuTm9kZXNCeU1zZ0lkOiB7W21zZ0lkOiBzdHJpbmddOiBpMThuLk5vZGVbXX19IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkJyk7XG4gIH1cblxuICBkaWdlc3QobWVzc2FnZTogaTE4bi5NZXNzYWdlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGlnZXN0KG1lc3NhZ2UpO1xuICB9XG5cblxuICBjcmVhdGVOYW1lTWFwcGVyKG1lc3NhZ2U6IGkxOG4uTWVzc2FnZSk6IFBsYWNlaG9sZGVyTWFwcGVyIHtcbiAgICByZXR1cm4gbmV3IFNpbXBsZVBsYWNlaG9sZGVyTWFwcGVyKG1lc3NhZ2UsIHRvUHVibGljTmFtZSk7XG4gIH1cbn1cblxuY2xhc3MgX1Zpc2l0b3IgaW1wbGVtZW50cyBpMThuLlZpc2l0b3Ige1xuICB2aXNpdFRleHQodGV4dDogaTE4bi5UZXh0LCBjb250ZXh0PzogYW55KTogeG1sLk5vZGVbXSB7XG4gICAgcmV0dXJuIFtuZXcgeG1sLlRleHQodGV4dC52YWx1ZSldO1xuICB9XG5cbiAgdmlzaXRDb250YWluZXIoY29udGFpbmVyOiBpMThuLkNvbnRhaW5lciwgY29udGV4dDogYW55KTogeG1sLk5vZGVbXSB7XG4gICAgY29uc3Qgbm9kZXM6IHhtbC5Ob2RlW10gPSBbXTtcbiAgICBjb250YWluZXIuY2hpbGRyZW4uZm9yRWFjaCgobm9kZTogaTE4bi5Ob2RlKSA9PiBub2Rlcy5wdXNoKC4uLm5vZGUudmlzaXQodGhpcykpKTtcbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICB2aXNpdEljdShpY3U6IGkxOG4uSWN1LCBjb250ZXh0PzogYW55KTogeG1sLk5vZGVbXSB7XG4gICAgY29uc3Qgbm9kZXMgPSBbbmV3IHhtbC5UZXh0KGB7JHtpY3UuZXhwcmVzc2lvblBsYWNlaG9sZGVyfSwgJHtpY3UudHlwZX0sIGApXTtcblxuICAgIE9iamVjdC5rZXlzKGljdS5jYXNlcykuZm9yRWFjaCgoYzogc3RyaW5nKSA9PiB7XG4gICAgICBub2Rlcy5wdXNoKG5ldyB4bWwuVGV4dChgJHtjfSB7YCksIC4uLmljdS5jYXNlc1tjXS52aXNpdCh0aGlzKSwgbmV3IHhtbC5UZXh0KGB9IGApKTtcbiAgICB9KTtcblxuICAgIG5vZGVzLnB1c2gobmV3IHhtbC5UZXh0KGB9YCkpO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgdmlzaXRUYWdQbGFjZWhvbGRlcihwaDogaTE4bi5UYWdQbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHhtbC5Ob2RlW10ge1xuICAgIGNvbnN0IHN0YXJ0VGFnQXNUZXh0ID0gbmV3IHhtbC5UZXh0KGA8JHtwaC50YWd9PmApO1xuICAgIGNvbnN0IHN0YXJ0RXggPSBuZXcgeG1sLlRhZyhfRVhBTVBMRV9UQUcsIHt9LCBbc3RhcnRUYWdBc1RleHRdKTtcbiAgICAvLyBUQyByZXF1aXJlcyBQSCB0byBoYXZlIGEgbm9uIGVtcHR5IEVYLCBhbmQgdXNlcyB0aGUgdGV4dCBub2RlIHRvIHNob3cgdGhlIFwib3JpZ2luYWxcIiB2YWx1ZS5cbiAgICBjb25zdCBzdGFydFRhZ1BoID1cbiAgICAgICAgbmV3IHhtbC5UYWcoX1BMQUNFSE9MREVSX1RBRywge25hbWU6IHBoLnN0YXJ0TmFtZX0sIFtzdGFydEV4LCBzdGFydFRhZ0FzVGV4dF0pO1xuICAgIGlmIChwaC5pc1ZvaWQpIHtcbiAgICAgIC8vIHZvaWQgdGFncyBoYXZlIG5vIGNoaWxkcmVuIG5vciBjbG9zaW5nIHRhZ3NcbiAgICAgIHJldHVybiBbc3RhcnRUYWdQaF07XG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VUYWdBc1RleHQgPSBuZXcgeG1sLlRleHQoYDwvJHtwaC50YWd9PmApO1xuICAgIGNvbnN0IGNsb3NlRXggPSBuZXcgeG1sLlRhZyhfRVhBTVBMRV9UQUcsIHt9LCBbY2xvc2VUYWdBc1RleHRdKTtcbiAgICAvLyBUQyByZXF1aXJlcyBQSCB0byBoYXZlIGEgbm9uIGVtcHR5IEVYLCBhbmQgdXNlcyB0aGUgdGV4dCBub2RlIHRvIHNob3cgdGhlIFwib3JpZ2luYWxcIiB2YWx1ZS5cbiAgICBjb25zdCBjbG9zZVRhZ1BoID1cbiAgICAgICAgbmV3IHhtbC5UYWcoX1BMQUNFSE9MREVSX1RBRywge25hbWU6IHBoLmNsb3NlTmFtZX0sIFtjbG9zZUV4LCBjbG9zZVRhZ0FzVGV4dF0pO1xuXG4gICAgcmV0dXJuIFtzdGFydFRhZ1BoLCAuLi50aGlzLnNlcmlhbGl6ZShwaC5jaGlsZHJlbiksIGNsb3NlVGFnUGhdO1xuICB9XG5cbiAgdmlzaXRQbGFjZWhvbGRlcihwaDogaTE4bi5QbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHhtbC5Ob2RlW10ge1xuICAgIGNvbnN0IGludGVycG9sYXRpb25Bc1RleHQgPSBuZXcgeG1sLlRleHQoYHt7JHtwaC52YWx1ZX19fWApO1xuICAgIC8vIEV4YW1wbGUgdGFnIG5lZWRzIHRvIGJlIG5vdC1lbXB0eSBmb3IgVEMuXG4gICAgY29uc3QgZXhUYWcgPSBuZXcgeG1sLlRhZyhfRVhBTVBMRV9UQUcsIHt9LCBbaW50ZXJwb2xhdGlvbkFzVGV4dF0pO1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUQyByZXF1aXJlcyBQSCB0byBoYXZlIGEgbm9uIGVtcHR5IEVYLCBhbmQgdXNlcyB0aGUgdGV4dCBub2RlIHRvIHNob3cgdGhlIFwib3JpZ2luYWxcIiB2YWx1ZS5cbiAgICAgIG5ldyB4bWwuVGFnKF9QTEFDRUhPTERFUl9UQUcsIHtuYW1lOiBwaC5uYW1lfSwgW2V4VGFnLCBpbnRlcnBvbGF0aW9uQXNUZXh0XSlcbiAgICBdO1xuICB9XG5cbiAgdmlzaXRJY3VQbGFjZWhvbGRlcihwaDogaTE4bi5JY3VQbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHhtbC5Ob2RlW10ge1xuICAgIGNvbnN0IGljdUV4cHJlc3Npb24gPSBwaC52YWx1ZS5leHByZXNzaW9uO1xuICAgIGNvbnN0IGljdVR5cGUgPSBwaC52YWx1ZS50eXBlO1xuICAgIGNvbnN0IGljdUNhc2VzID0gT2JqZWN0LmtleXMocGgudmFsdWUuY2FzZXMpLm1hcCgodmFsdWU6IHN0cmluZykgPT4gdmFsdWUgKyAnIHsuLi59Jykuam9pbignICcpO1xuICAgIGNvbnN0IGljdUFzVGV4dCA9IG5ldyB4bWwuVGV4dChgeyR7aWN1RXhwcmVzc2lvbn0sICR7aWN1VHlwZX0sICR7aWN1Q2FzZXN9fWApO1xuICAgIGNvbnN0IGV4VGFnID0gbmV3IHhtbC5UYWcoX0VYQU1QTEVfVEFHLCB7fSwgW2ljdUFzVGV4dF0pO1xuICAgIHJldHVybiBbXG4gICAgICAvLyBUQyByZXF1aXJlcyBQSCB0byBoYXZlIGEgbm9uIGVtcHR5IEVYLCBhbmQgdXNlcyB0aGUgdGV4dCBub2RlIHRvIHNob3cgdGhlIFwib3JpZ2luYWxcIiB2YWx1ZS5cbiAgICAgIG5ldyB4bWwuVGFnKF9QTEFDRUhPTERFUl9UQUcsIHtuYW1lOiBwaC5uYW1lfSwgW2V4VGFnLCBpY3VBc1RleHRdKVxuICAgIF07XG4gIH1cblxuICBzZXJpYWxpemUobm9kZXM6IGkxOG4uTm9kZVtdKTogeG1sLk5vZGVbXSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5ub2Rlcy5tYXAobm9kZSA9PiBub2RlLnZpc2l0KHRoaXMpKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZ2VzdChtZXNzYWdlOiBpMThuLk1lc3NhZ2UpOiBzdHJpbmcge1xuICByZXR1cm4gZGVjaW1hbERpZ2VzdChtZXNzYWdlKTtcbn1cblxuLy8gVEMgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG5vbi1lbXB0eSBleGFtcGxlIG9uIHBsYWNlaG9sZGVyc1xuY2xhc3MgRXhhbXBsZVZpc2l0b3IgaW1wbGVtZW50cyB4bWwuSVZpc2l0b3Ige1xuICBhZGREZWZhdWx0RXhhbXBsZXMobm9kZTogeG1sLk5vZGUpOiB4bWwuTm9kZSB7XG4gICAgbm9kZS52aXNpdCh0aGlzKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHZpc2l0VGFnKHRhZzogeG1sLlRhZyk6IHZvaWQge1xuICAgIGlmICh0YWcubmFtZSA9PT0gX1BMQUNFSE9MREVSX1RBRykge1xuICAgICAgaWYgKCF0YWcuY2hpbGRyZW4gfHwgdGFnLmNoaWxkcmVuLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGNvbnN0IGV4VGV4dCA9IG5ldyB4bWwuVGV4dCh0YWcuYXR0cnNbJ25hbWUnXSB8fCAnLi4uJyk7XG4gICAgICAgIHRhZy5jaGlsZHJlbiA9IFtuZXcgeG1sLlRhZyhfRVhBTVBMRV9UQUcsIHt9LCBbZXhUZXh0XSldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFnLmNoaWxkcmVuKSB7XG4gICAgICB0YWcuY2hpbGRyZW4uZm9yRWFjaChub2RlID0+IG5vZGUudmlzaXQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0VGV4dCh0ZXh0OiB4bWwuVGV4dCk6IHZvaWQge31cbiAgdmlzaXREZWNsYXJhdGlvbihkZWNsOiB4bWwuRGVjbGFyYXRpb24pOiB2b2lkIHt9XG4gIHZpc2l0RG9jdHlwZShkb2N0eXBlOiB4bWwuRG9jdHlwZSk6IHZvaWQge31cbn1cblxuLy8gWE1CL1hUQiBwbGFjZWhvbGRlcnMgY2FuIG9ubHkgY29udGFpbiBBLVosIDAtOSBhbmQgX1xuZXhwb3J0IGZ1bmN0aW9uIHRvUHVibGljTmFtZShpbnRlcm5hbE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnRlcm5hbE5hbWUudG9VcHBlckNhc2UoKS5yZXBsYWNlKC9bXkEtWjAtOV9dL2csICdfJyk7XG59XG4iXX0=