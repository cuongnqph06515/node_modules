/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class _Visitor {
    visitTag(tag) {
        const strAttrs = this._serializeAttributes(tag.attrs);
        if (tag.children.length == 0) {
            return `<${tag.name}${strAttrs}/>`;
        }
        const strChildren = tag.children.map(node => node.visit(this));
        return `<${tag.name}${strAttrs}>${strChildren.join('')}</${tag.name}>`;
    }
    visitText(text) {
        return text.value;
    }
    visitDeclaration(decl) {
        return `<?xml${this._serializeAttributes(decl.attrs)} ?>`;
    }
    _serializeAttributes(attrs) {
        const strAttrs = Object.keys(attrs).map((name) => `${name}="${attrs[name]}"`).join(' ');
        return strAttrs.length > 0 ? ' ' + strAttrs : '';
    }
    visitDoctype(doctype) {
        return `<!DOCTYPE ${doctype.rootTag} [\n${doctype.dtd}\n]>`;
    }
}
const _visitor = new _Visitor();
export function serialize(nodes) {
    return nodes.map((node) => node.visit(_visitor)).join('');
}
export class Declaration {
    constructor(unescapedAttrs) {
        this.attrs = {};
        Object.keys(unescapedAttrs).forEach((k) => {
            this.attrs[k] = escapeXml(unescapedAttrs[k]);
        });
    }
    visit(visitor) {
        return visitor.visitDeclaration(this);
    }
}
export class Doctype {
    constructor(rootTag, dtd) {
        this.rootTag = rootTag;
        this.dtd = dtd;
    }
    visit(visitor) {
        return visitor.visitDoctype(this);
    }
}
export class Tag {
    constructor(name, unescapedAttrs = {}, children = []) {
        this.name = name;
        this.children = children;
        this.attrs = {};
        Object.keys(unescapedAttrs).forEach((k) => {
            this.attrs[k] = escapeXml(unescapedAttrs[k]);
        });
    }
    visit(visitor) {
        return visitor.visitTag(this);
    }
}
export class Text {
    constructor(unescapedValue) {
        this.value = escapeXml(unescapedValue);
    }
    visit(visitor) {
        return visitor.visitText(this);
    }
}
export class CR extends Text {
    constructor(ws = 0) {
        super(`\n${new Array(ws + 1).join(' ')}`);
    }
}
const _ESCAPED_CHARS = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;'],
];
// Escape `_ESCAPED_CHARS` characters in the given text with encoded entities
export function escapeXml(text) {
    return _ESCAPED_CHARS.reduce((text, entry) => text.replace(entry[0], entry[1]), text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sX2hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9pMThuL3NlcmlhbGl6ZXJzL3htbF9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBU0gsTUFBTSxRQUFRO0lBQ1osUUFBUSxDQUFDLEdBQVE7UUFDZixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsSUFBSSxDQUFDO1NBQ3BDO1FBRUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQWlCO1FBQ2hDLE9BQU8sUUFBUSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDNUQsQ0FBQztJQUVPLG9CQUFvQixDQUFDLEtBQTRCO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxHQUFH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TyxDQUFDO0lBQ2YsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQ2hCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUNoQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7SUFDZCxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7Q0FDZixDQUFDO0FBRUYsNkVBQTZFO0FBQzdFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWTtJQUNwQyxPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQ3hCLENBQUMsSUFBWSxFQUFFLEtBQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpc2l0b3Ige1xuICB2aXNpdFRhZyh0YWc6IFRhZyk6IGFueTtcbiAgdmlzaXRUZXh0KHRleHQ6IFRleHQpOiBhbnk7XG4gIHZpc2l0RGVjbGFyYXRpb24oZGVjbDogRGVjbGFyYXRpb24pOiBhbnk7XG4gIHZpc2l0RG9jdHlwZShkb2N0eXBlOiBEb2N0eXBlKTogYW55O1xufVxuXG5jbGFzcyBfVmlzaXRvciBpbXBsZW1lbnRzIElWaXNpdG9yIHtcbiAgdmlzaXRUYWcodGFnOiBUYWcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0ckF0dHJzID0gdGhpcy5fc2VyaWFsaXplQXR0cmlidXRlcyh0YWcuYXR0cnMpO1xuXG4gICAgaWYgKHRhZy5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIGA8JHt0YWcubmFtZX0ke3N0ckF0dHJzfS8+YDtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJDaGlsZHJlbiA9IHRhZy5jaGlsZHJlbi5tYXAobm9kZSA9PiBub2RlLnZpc2l0KHRoaXMpKTtcbiAgICByZXR1cm4gYDwke3RhZy5uYW1lfSR7c3RyQXR0cnN9PiR7c3RyQ2hpbGRyZW4uam9pbignJyl9PC8ke3RhZy5uYW1lfT5gO1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IFRleHQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZXh0LnZhbHVlO1xuICB9XG5cbiAgdmlzaXREZWNsYXJhdGlvbihkZWNsOiBEZWNsYXJhdGlvbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGA8P3htbCR7dGhpcy5fc2VyaWFsaXplQXR0cmlidXRlcyhkZWNsLmF0dHJzKX0gPz5gO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VyaWFsaXplQXR0cmlidXRlcyhhdHRyczoge1trOiBzdHJpbmddOiBzdHJpbmd9KSB7XG4gICAgY29uc3Qgc3RyQXR0cnMgPSBPYmplY3Qua2V5cyhhdHRycykubWFwKChuYW1lOiBzdHJpbmcpID0+IGAke25hbWV9PVwiJHthdHRyc1tuYW1lXX1cImApLmpvaW4oJyAnKTtcbiAgICByZXR1cm4gc3RyQXR0cnMubGVuZ3RoID4gMCA/ICcgJyArIHN0ckF0dHJzIDogJyc7XG4gIH1cblxuICB2aXNpdERvY3R5cGUoZG9jdHlwZTogRG9jdHlwZSk6IGFueSB7XG4gICAgcmV0dXJuIGA8IURPQ1RZUEUgJHtkb2N0eXBlLnJvb3RUYWd9IFtcXG4ke2RvY3R5cGUuZHRkfVxcbl0+YDtcbiAgfVxufVxuXG5jb25zdCBfdmlzaXRvciA9IG5ldyBfVmlzaXRvcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKG5vZGVzOiBOb2RlW10pOiBzdHJpbmcge1xuICByZXR1cm4gbm9kZXMubWFwKChub2RlOiBOb2RlKTogc3RyaW5nID0+IG5vZGUudmlzaXQoX3Zpc2l0b3IpKS5qb2luKCcnKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcbiAgdmlzaXQodmlzaXRvcjogSVZpc2l0b3IpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWNsYXJhdGlvbiBpbXBsZW1lbnRzIE5vZGUge1xuICBwdWJsaWMgYXR0cnM6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHVuZXNjYXBlZEF0dHJzOiB7W2s6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBPYmplY3Qua2V5cyh1bmVzY2FwZWRBdHRycykuZm9yRWFjaCgoazogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLmF0dHJzW2tdID0gZXNjYXBlWG1sKHVuZXNjYXBlZEF0dHJzW2tdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0KHZpc2l0b3I6IElWaXNpdG9yKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdERlY2xhcmF0aW9uKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb2N0eXBlIGltcGxlbWVudHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb290VGFnOiBzdHJpbmcsIHB1YmxpYyBkdGQ6IHN0cmluZykge31cblxuICB2aXNpdCh2aXNpdG9yOiBJVmlzaXRvcik6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXREb2N0eXBlKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWcgaW1wbGVtZW50cyBOb2RlIHtcbiAgcHVibGljIGF0dHJzOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHVuZXNjYXBlZEF0dHJzOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fSxcbiAgICAgIHB1YmxpYyBjaGlsZHJlbjogTm9kZVtdID0gW10pIHtcbiAgICBPYmplY3Qua2V5cyh1bmVzY2FwZWRBdHRycykuZm9yRWFjaCgoazogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLmF0dHJzW2tdID0gZXNjYXBlWG1sKHVuZXNjYXBlZEF0dHJzW2tdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0KHZpc2l0b3I6IElWaXNpdG9yKTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFRhZyh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGV4dCBpbXBsZW1lbnRzIE5vZGUge1xuICB2YWx1ZTogc3RyaW5nO1xuICBjb25zdHJ1Y3Rvcih1bmVzY2FwZWRWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IGVzY2FwZVhtbCh1bmVzY2FwZWRWYWx1ZSk7XG4gIH1cblxuICB2aXNpdCh2aXNpdG9yOiBJVmlzaXRvcik6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0KHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDUiBleHRlbmRzIFRleHQge1xuICBjb25zdHJ1Y3Rvcih3czogbnVtYmVyID0gMCkge1xuICAgIHN1cGVyKGBcXG4ke25ldyBBcnJheSh3cyArIDEpLmpvaW4oJyAnKX1gKTtcbiAgfVxufVxuXG5jb25zdCBfRVNDQVBFRF9DSEFSUzogW1JlZ0V4cCwgc3RyaW5nXVtdID0gW1xuICBbLyYvZywgJyZhbXA7J10sXG4gIFsvXCIvZywgJyZxdW90OyddLFxuICBbLycvZywgJyZhcG9zOyddLFxuICBbLzwvZywgJyZsdDsnXSxcbiAgWy8+L2csICcmZ3Q7J10sXG5dO1xuXG4vLyBFc2NhcGUgYF9FU0NBUEVEX0NIQVJTYCBjaGFyYWN0ZXJzIGluIHRoZSBnaXZlbiB0ZXh0IHdpdGggZW5jb2RlZCBlbnRpdGllc1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVhtbCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gX0VTQ0FQRURfQ0hBUlMucmVkdWNlKFxuICAgICAgKHRleHQ6IHN0cmluZywgZW50cnk6IFtSZWdFeHAsIHN0cmluZ10pID0+IHRleHQucmVwbGFjZShlbnRyeVswXSwgZW50cnlbMV0pLCB0ZXh0KTtcbn1cbiJdfQ==