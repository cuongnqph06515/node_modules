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
        define("@angular/compiler/src/aot/compiler_options", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3QvY29tcGlsZXJfb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFvdENvbXBpbGVyT3B0aW9ucyB7XG4gIGxvY2FsZT86IHN0cmluZztcbiAgaTE4bkZvcm1hdD86IHN0cmluZztcbiAgaTE4blVzZUV4dGVybmFsSWRzPzogYm9vbGVhbjtcbiAgdHJhbnNsYXRpb25zPzogc3RyaW5nO1xuICBtaXNzaW5nVHJhbnNsYXRpb24/OiBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneTtcbiAgZW5hYmxlU3VtbWFyaWVzRm9ySml0PzogYm9vbGVhbjtcbiAgcHJlc2VydmVXaGl0ZXNwYWNlcz86IGJvb2xlYW47XG4gIGZ1bGxUZW1wbGF0ZVR5cGVDaGVjaz86IGJvb2xlYW47XG4gIGFsbG93RW1wdHlDb2RlZ2VuRmlsZXM/OiBib29sZWFuO1xuICBzdHJpY3RJbmplY3Rpb25QYXJhbWV0ZXJzPzogYm9vbGVhbjtcbiAgZW5hYmxlSXZ5PzogYm9vbGVhbnwnbmd0c2MnO1xuICBjcmVhdGVFeHRlcm5hbFN5bWJvbEZhY3RvcnlSZWV4cG9ydHM/OiBib29sZWFuO1xufVxuIl19