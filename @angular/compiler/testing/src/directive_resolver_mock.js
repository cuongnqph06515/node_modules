(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/testing/src/directive_resolver_mock", ["require", "exports", "tslib", "@angular/compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var compiler_1 = require("@angular/compiler");
    /**
     * An implementation of {@link DirectiveResolver} that allows overriding
     * various properties of directives.
     */
    var MockDirectiveResolver = /** @class */ (function (_super) {
        tslib_1.__extends(MockDirectiveResolver, _super);
        function MockDirectiveResolver(reflector) {
            var _this = _super.call(this, reflector) || this;
            _this._directives = new Map();
            return _this;
        }
        MockDirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            return this._directives.get(type) || _super.prototype.resolve.call(this, type, throwIfNotFound);
        };
        /**
         * Overrides the {@link core.Directive} for a directive.
         */
        MockDirectiveResolver.prototype.setDirective = function (type, metadata) {
            this._directives.set(type, metadata);
        };
        return MockDirectiveResolver;
    }(compiler_1.DirectiveResolver));
    exports.MockDirectiveResolver = MockDirectiveResolver;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyX21vY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci90ZXN0aW5nL3NyYy9kaXJlY3RpdmVfcmVzb2x2ZXJfbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBNEU7SUFFNUU7OztPQUdHO0lBQ0g7UUFBMkMsaURBQWlCO1FBRzFELCtCQUFZLFNBQTJCO1lBQXZDLFlBQ0Usa0JBQU0sU0FBUyxDQUFDLFNBQ2pCO1lBSk8saUJBQVcsR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQzs7UUFJM0QsQ0FBQztRQUtELHVDQUFPLEdBQVAsVUFBUSxJQUFlLEVBQUUsZUFBc0I7WUFBdEIsZ0NBQUEsRUFBQSxzQkFBc0I7WUFDN0MsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBTSxPQUFPLFlBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRDs7V0FFRztRQUNILDRDQUFZLEdBQVosVUFBYSxJQUFlLEVBQUUsUUFBd0I7WUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDSCw0QkFBQztJQUFELENBQUMsQUFwQkQsQ0FBMkMsNEJBQWlCLEdBb0IzRDtJQXBCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3IsIGNvcmUsIERpcmVjdGl2ZVJlc29sdmVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIERpcmVjdGl2ZVJlc29sdmVyfSB0aGF0IGFsbG93cyBvdmVycmlkaW5nXG4gKiB2YXJpb3VzIHByb3BlcnRpZXMgb2YgZGlyZWN0aXZlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tEaXJlY3RpdmVSZXNvbHZlciBleHRlbmRzIERpcmVjdGl2ZVJlc29sdmVyIHtcbiAgcHJpdmF0ZSBfZGlyZWN0aXZlcyA9IG5ldyBNYXA8Y29yZS5UeXBlLCBjb3JlLkRpcmVjdGl2ZT4oKTtcblxuICBjb25zdHJ1Y3RvcihyZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IpIHtcbiAgICBzdXBlcihyZWZsZWN0b3IpO1xuICB9XG5cbiAgcmVzb2x2ZSh0eXBlOiBjb3JlLlR5cGUpOiBjb3JlLkRpcmVjdGl2ZTtcbiAgcmVzb2x2ZSh0eXBlOiBjb3JlLlR5cGUsIHRocm93SWZOb3RGb3VuZDogdHJ1ZSk6IGNvcmUuRGlyZWN0aXZlO1xuICByZXNvbHZlKHR5cGU6IGNvcmUuVHlwZSwgdGhyb3dJZk5vdEZvdW5kOiBib29sZWFuKTogY29yZS5EaXJlY3RpdmV8bnVsbDtcbiAgcmVzb2x2ZSh0eXBlOiBjb3JlLlR5cGUsIHRocm93SWZOb3RGb3VuZCA9IHRydWUpOiBjb3JlLkRpcmVjdGl2ZXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyZWN0aXZlcy5nZXQodHlwZSkgfHwgc3VwZXIucmVzb2x2ZSh0eXBlLCB0aHJvd0lmTm90Rm91bmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUge0BsaW5rIGNvcmUuRGlyZWN0aXZlfSBmb3IgYSBkaXJlY3RpdmUuXG4gICAqL1xuICBzZXREaXJlY3RpdmUodHlwZTogY29yZS5UeXBlLCBtZXRhZGF0YTogY29yZS5EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICB0aGlzLl9kaXJlY3RpdmVzLnNldCh0eXBlLCBtZXRhZGF0YSk7XG4gIH1cbn1cbiJdfQ==