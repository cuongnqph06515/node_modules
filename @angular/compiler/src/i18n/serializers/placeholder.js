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
        define("@angular/compiler/src/i18n/serializers/placeholder", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TAG_TO_PLACEHOLDER_NAMES = {
        'A': 'LINK',
        'B': 'BOLD_TEXT',
        'BR': 'LINE_BREAK',
        'EM': 'EMPHASISED_TEXT',
        'H1': 'HEADING_LEVEL1',
        'H2': 'HEADING_LEVEL2',
        'H3': 'HEADING_LEVEL3',
        'H4': 'HEADING_LEVEL4',
        'H5': 'HEADING_LEVEL5',
        'H6': 'HEADING_LEVEL6',
        'HR': 'HORIZONTAL_RULE',
        'I': 'ITALIC_TEXT',
        'LI': 'LIST_ITEM',
        'LINK': 'MEDIA_LINK',
        'OL': 'ORDERED_LIST',
        'P': 'PARAGRAPH',
        'Q': 'QUOTATION',
        'S': 'STRIKETHROUGH_TEXT',
        'SMALL': 'SMALL_TEXT',
        'SUB': 'SUBSTRIPT',
        'SUP': 'SUPERSCRIPT',
        'TBODY': 'TABLE_BODY',
        'TD': 'TABLE_CELL',
        'TFOOT': 'TABLE_FOOTER',
        'TH': 'TABLE_HEADER_CELL',
        'THEAD': 'TABLE_HEADER',
        'TR': 'TABLE_ROW',
        'TT': 'MONOSPACED_TEXT',
        'U': 'UNDERLINED_TEXT',
        'UL': 'UNORDERED_LIST',
    };
    /**
     * Creates unique names for placeholder with different content.
     *
     * Returns the same placeholder name when the content is identical.
     */
    var PlaceholderRegistry = /** @class */ (function () {
        function PlaceholderRegistry() {
            // Count the occurrence of the base name top generate a unique name
            this._placeHolderNameCounts = {};
            // Maps signature to placeholder names
            this._signatureToName = {};
        }
        PlaceholderRegistry.prototype.getStartTagPlaceholderName = function (tag, attrs, isVoid) {
            var signature = this._hashTag(tag, attrs, isVoid);
            if (this._signatureToName[signature]) {
                return this._signatureToName[signature];
            }
            var upperTag = tag.toUpperCase();
            var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
            var name = this._generateUniqueName(isVoid ? baseName : "START_" + baseName);
            this._signatureToName[signature] = name;
            return name;
        };
        PlaceholderRegistry.prototype.getCloseTagPlaceholderName = function (tag) {
            var signature = this._hashClosingTag(tag);
            if (this._signatureToName[signature]) {
                return this._signatureToName[signature];
            }
            var upperTag = tag.toUpperCase();
            var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
            var name = this._generateUniqueName("CLOSE_" + baseName);
            this._signatureToName[signature] = name;
            return name;
        };
        PlaceholderRegistry.prototype.getPlaceholderName = function (name, content) {
            var upperName = name.toUpperCase();
            var signature = "PH: " + upperName + "=" + content;
            if (this._signatureToName[signature]) {
                return this._signatureToName[signature];
            }
            var uniqueName = this._generateUniqueName(upperName);
            this._signatureToName[signature] = uniqueName;
            return uniqueName;
        };
        PlaceholderRegistry.prototype.getUniquePlaceholder = function (name) {
            return this._generateUniqueName(name.toUpperCase());
        };
        // Generate a hash for a tag - does not take attribute order into account
        PlaceholderRegistry.prototype._hashTag = function (tag, attrs, isVoid) {
            var start = "<" + tag;
            var strAttrs = Object.keys(attrs).sort().map(function (name) { return " " + name + "=" + attrs[name]; }).join('');
            var end = isVoid ? '/>' : "></" + tag + ">";
            return start + strAttrs + end;
        };
        PlaceholderRegistry.prototype._hashClosingTag = function (tag) {
            return this._hashTag("/" + tag, {}, false);
        };
        PlaceholderRegistry.prototype._generateUniqueName = function (base) {
            var seen = this._placeHolderNameCounts.hasOwnProperty(base);
            if (!seen) {
                this._placeHolderNameCounts[base] = 1;
                return base;
            }
            var id = this._placeHolderNameCounts[base];
            this._placeHolderNameCounts[base] = id + 1;
            return base + "_" + id;
        };
        return PlaceholderRegistry;
    }());
    exports.PlaceholderRegistry = PlaceholderRegistry;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvaTE4bi9zZXJpYWxpemVycy9wbGFjZWhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILElBQU0sd0JBQXdCLEdBQTBCO1FBQ3RELEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLFdBQVc7UUFDaEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLEdBQUcsRUFBRSxhQUFhO1FBQ2xCLElBQUksRUFBRSxXQUFXO1FBQ2pCLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLElBQUksRUFBRSxjQUFjO1FBQ3BCLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLEdBQUcsRUFBRSxvQkFBb0I7UUFDekIsT0FBTyxFQUFFLFlBQVk7UUFDckIsS0FBSyxFQUFFLFdBQVc7UUFDbEIsS0FBSyxFQUFFLGFBQWE7UUFDcEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsT0FBTyxFQUFFLGNBQWM7UUFDdkIsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixPQUFPLEVBQUUsY0FBYztRQUN2QixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLEdBQUcsRUFBRSxpQkFBaUI7UUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtLQUN2QixDQUFDO0lBRUY7Ozs7T0FJRztJQUNI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QUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBTSxHQUFHLE1BQUcsQ0FBQztZQUV6QyxPQUFPLEtBQUssR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLENBQUM7UUFFTyw2Q0FBZSxHQUF2QixVQUF3QixHQUFXO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFJLEdBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVPLGlEQUFtQixHQUEzQixVQUE0QixJQUFZO1lBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLE9BQVUsSUFBSSxTQUFJLEVBQUksQ0FBQztRQUN6QixDQUFDO1FBQ0gsMEJBQUM7SUFBRCxDQUFDLEFBN0VELElBNkVDO0lBN0VZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdBJzogJ0xJTksnLFxuICAnQic6ICdCT0xEX1RFWFQnLFxuICAnQlInOiAnTElORV9CUkVBSycsXG4gICdFTSc6ICdFTVBIQVNJU0VEX1RFWFQnLFxuICAnSDEnOiAnSEVBRElOR19MRVZFTDEnLFxuICAnSDInOiAnSEVBRElOR19MRVZFTDInLFxuICAnSDMnOiAnSEVBRElOR19MRVZFTDMnLFxuICAnSDQnOiAnSEVBRElOR19MRVZFTDQnLFxuICAnSDUnOiAnSEVBRElOR19MRVZFTDUnLFxuICAnSDYnOiAnSEVBRElOR19MRVZFTDYnLFxuICAnSFInOiAnSE9SSVpPTlRBTF9SVUxFJyxcbiAgJ0knOiAnSVRBTElDX1RFWFQnLFxuICAnTEknOiAnTElTVF9JVEVNJyxcbiAgJ0xJTksnOiAnTUVESUFfTElOSycsXG4gICdPTCc6ICdPUkRFUkVEX0xJU1QnLFxuICAnUCc6ICdQQVJBR1JBUEgnLFxuICAnUSc6ICdRVU9UQVRJT04nLFxuICAnUyc6ICdTVFJJS0VUSFJPVUdIX1RFWFQnLFxuICAnU01BTEwnOiAnU01BTExfVEVYVCcsXG4gICdTVUInOiAnU1VCU1RSSVBUJyxcbiAgJ1NVUCc6ICdTVVBFUlNDUklQVCcsXG4gICdUQk9EWSc6ICdUQUJMRV9CT0RZJyxcbiAgJ1REJzogJ1RBQkxFX0NFTEwnLFxuICAnVEZPT1QnOiAnVEFCTEVfRk9PVEVSJyxcbiAgJ1RIJzogJ1RBQkxFX0hFQURFUl9DRUxMJyxcbiAgJ1RIRUFEJzogJ1RBQkxFX0hFQURFUicsXG4gICdUUic6ICdUQUJMRV9ST1cnLFxuICAnVFQnOiAnTU9OT1NQQUNFRF9URVhUJyxcbiAgJ1UnOiAnVU5ERVJMSU5FRF9URVhUJyxcbiAgJ1VMJzogJ1VOT1JERVJFRF9MSVNUJyxcbn07XG5cbi8qKlxuICogQ3JlYXRlcyB1bmlxdWUgbmFtZXMgZm9yIHBsYWNlaG9sZGVyIHdpdGggZGlmZmVyZW50IGNvbnRlbnQuXG4gKlxuICogUmV0dXJucyB0aGUgc2FtZSBwbGFjZWhvbGRlciBuYW1lIHdoZW4gdGhlIGNvbnRlbnQgaXMgaWRlbnRpY2FsLlxuICovXG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXJSZWdpc3RyeSB7XG4gIC8vIENvdW50IHRoZSBvY2N1cnJlbmNlIG9mIHRoZSBiYXNlIG5hbWUgdG9wIGdlbmVyYXRlIGEgdW5pcXVlIG5hbWVcbiAgcHJpdmF0ZSBfcGxhY2VIb2xkZXJOYW1lQ291bnRzOiB7W2s6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcbiAgLy8gTWFwcyBzaWduYXR1cmUgdG8gcGxhY2Vob2xkZXIgbmFtZXNcbiAgcHJpdmF0ZSBfc2lnbmF0dXJlVG9OYW1lOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBnZXRTdGFydFRhZ1BsYWNlaG9sZGVyTmFtZSh0YWc6IHN0cmluZywgYXR0cnM6IHtbazogc3RyaW5nXTogc3RyaW5nfSwgaXNWb2lkOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCBzaWduYXR1cmUgPSB0aGlzLl9oYXNoVGFnKHRhZywgYXR0cnMsIGlzVm9pZCk7XG4gICAgaWYgKHRoaXMuX3NpZ25hdHVyZVRvTmFtZVtzaWduYXR1cmVdKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV07XG4gICAgfVxuXG4gICAgY29uc3QgdXBwZXJUYWcgPSB0YWcudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBiYXNlTmFtZSA9IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1t1cHBlclRhZ10gfHwgYFRBR18ke3VwcGVyVGFnfWA7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX2dlbmVyYXRlVW5pcXVlTmFtZShpc1ZvaWQgPyBiYXNlTmFtZSA6IGBTVEFSVF8ke2Jhc2VOYW1lfWApO1xuXG4gICAgdGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0gPSBuYW1lO1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBnZXRDbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZSh0YWc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gdGhpcy5faGFzaENsb3NpbmdUYWcodGFnKTtcbiAgICBpZiAodGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXTtcbiAgICB9XG5cbiAgICBjb25zdCB1cHBlclRhZyA9IHRhZy50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGJhc2VOYW1lID0gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW3VwcGVyVGFnXSB8fCBgVEFHXyR7dXBwZXJUYWd9YDtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fZ2VuZXJhdGVVbmlxdWVOYW1lKGBDTE9TRV8ke2Jhc2VOYW1lfWApO1xuXG4gICAgdGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0gPSBuYW1lO1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBnZXRQbGFjZWhvbGRlck5hbWUobmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVwcGVyTmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBgUEg6ICR7dXBwZXJOYW1lfT0ke2NvbnRlbnR9YDtcbiAgICBpZiAodGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaWduYXR1cmVUb05hbWVbc2lnbmF0dXJlXTtcbiAgICB9XG5cbiAgICBjb25zdCB1bmlxdWVOYW1lID0gdGhpcy5fZ2VuZXJhdGVVbmlxdWVOYW1lKHVwcGVyTmFtZSk7XG4gICAgdGhpcy5fc2lnbmF0dXJlVG9OYW1lW3NpZ25hdHVyZV0gPSB1bmlxdWVOYW1lO1xuXG4gICAgcmV0dXJuIHVuaXF1ZU5hbWU7XG4gIH1cblxuICBnZXRVbmlxdWVQbGFjZWhvbGRlcihuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9nZW5lcmF0ZVVuaXF1ZU5hbWUobmFtZS50b1VwcGVyQ2FzZSgpKTtcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIGEgaGFzaCBmb3IgYSB0YWcgLSBkb2VzIG5vdCB0YWtlIGF0dHJpYnV0ZSBvcmRlciBpbnRvIGFjY291bnRcbiAgcHJpdmF0ZSBfaGFzaFRhZyh0YWc6IHN0cmluZywgYXR0cnM6IHtbazogc3RyaW5nXTogc3RyaW5nfSwgaXNWb2lkOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCBzdGFydCA9IGA8JHt0YWd9YDtcbiAgICBjb25zdCBzdHJBdHRycyA9IE9iamVjdC5rZXlzKGF0dHJzKS5zb3J0KCkubWFwKChuYW1lKSA9PiBgICR7bmFtZX09JHthdHRyc1tuYW1lXX1gKS5qb2luKCcnKTtcbiAgICBjb25zdCBlbmQgPSBpc1ZvaWQgPyAnLz4nIDogYD48LyR7dGFnfT5gO1xuXG4gICAgcmV0dXJuIHN0YXJ0ICsgc3RyQXR0cnMgKyBlbmQ7XG4gIH1cblxuICBwcml2YXRlIF9oYXNoQ2xvc2luZ1RhZyh0YWc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc2hUYWcoYC8ke3RhZ31gLCB7fSwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVVbmlxdWVOYW1lKGJhc2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VlbiA9IHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50cy5oYXNPd25Qcm9wZXJ0eShiYXNlKTtcbiAgICBpZiAoIXNlZW4pIHtcbiAgICAgIHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50c1tiYXNlXSA9IDE7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHRoaXMuX3BsYWNlSG9sZGVyTmFtZUNvdW50c1tiYXNlXTtcbiAgICB0aGlzLl9wbGFjZUhvbGRlck5hbWVDb3VudHNbYmFzZV0gPSBpZCArIDE7XG4gICAgcmV0dXJuIGAke2Jhc2V9XyR7aWR9YDtcbiAgfVxufVxuIl19