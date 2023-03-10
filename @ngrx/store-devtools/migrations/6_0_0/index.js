(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store-devtools/migrations/6_0_0/index", ["require", "exports", "@ngrx/store-devtools/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_core_1 = require("@ngrx/store-devtools/schematics-core");
    function default_1() {
        return schematics_core_1.updatePackage('store-devtools');
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlLWRldnRvb2xzL21pZ3JhdGlvbnMvNl8wXzAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFDQSwwRUFBcUU7SUFFckU7UUFDRSxPQUFPLCtCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRkQsNEJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSdWxlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgdXBkYXRlUGFja2FnZSB9IGZyb20gJ0BuZ3J4L3N0b3JlLWRldnRvb2xzL3NjaGVtYXRpY3MtY29yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCk6IFJ1bGUge1xuICByZXR1cm4gdXBkYXRlUGFja2FnZSgnc3RvcmUtZGV2dG9vbHMnKTtcbn1cbiJdfQ==