/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TagContentType } from './tags';
var XmlTagDefinition = /** @class */ (function () {
    function XmlTagDefinition() {
        this.closedByParent = false;
        this.contentType = TagContentType.PARSABLE_DATA;
        this.isVoid = false;
        this.ignoreFirstLf = false;
        this.canSelfClose = true;
    }
    XmlTagDefinition.prototype.requireExtraParent = function (currentParent) {
        return false;
    };
    XmlTagDefinition.prototype.isClosedByChild = function (name) {
        return false;
    };
    return XmlTagDefinition;
}());
export { XmlTagDefinition };
var _TAG_DEFINITION = new XmlTagDefinition();
export function getXmlTagDefinition(tagName) {
    return _TAG_DEFINITION;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sX3RhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvbWxfcGFyc2VyL3htbF90YWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQWdCLE1BQU0sUUFBUSxDQUFDO0FBRXJEO0lBQUE7UUFDRSxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQU9oQyxnQkFBVyxHQUFtQixjQUFjLENBQUMsYUFBYSxDQUFDO1FBQzNELFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsaUJBQVksR0FBWSxJQUFJLENBQUM7SUFTL0IsQ0FBQztJQVBDLDZDQUFrQixHQUFsQixVQUFtQixhQUFxQjtRQUN0QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwwQ0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOztBQUVELElBQU0sZUFBZSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUUvQyxNQUFNLFVBQVUsbUJBQW1CLENBQUMsT0FBZTtJQUNqRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RhZ0NvbnRlbnRUeXBlLCBUYWdEZWZpbml0aW9ufSBmcm9tICcuL3RhZ3MnO1xuXG5leHBvcnQgY2xhc3MgWG1sVGFnRGVmaW5pdGlvbiBpbXBsZW1lbnRzIFRhZ0RlZmluaXRpb24ge1xuICBjbG9zZWRCeVBhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcmVxdWlyZWRQYXJlbnRzIToge1trZXk6IHN0cmluZ106IGJvb2xlYW59O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcGFyZW50VG9BZGQhOiBzdHJpbmc7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeCE6IHN0cmluZztcbiAgY29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlID0gVGFnQ29udGVudFR5cGUuUEFSU0FCTEVfREFUQTtcbiAgaXNWb2lkOiBib29sZWFuID0gZmFsc2U7XG4gIGlnbm9yZUZpcnN0TGY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2FuU2VsZkNsb3NlOiBib29sZWFuID0gdHJ1ZTtcblxuICByZXF1aXJlRXh0cmFQYXJlbnQoY3VycmVudFBhcmVudDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNDbG9zZWRCeUNoaWxkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5jb25zdCBfVEFHX0RFRklOSVRJT04gPSBuZXcgWG1sVGFnRGVmaW5pdGlvbigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0WG1sVGFnRGVmaW5pdGlvbih0YWdOYW1lOiBzdHJpbmcpOiBYbWxUYWdEZWZpbml0aW9uIHtcbiAgcmV0dXJuIF9UQUdfREVGSU5JVElPTjtcbn1cbiJdfQ==