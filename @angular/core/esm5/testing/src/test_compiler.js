/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __extends } from "tslib";
import { Compiler, Injectable } from '@angular/core';
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * @publicApi
 */
var TestingCompiler = /** @class */ (function (_super) {
    __extends(TestingCompiler, _super);
    function TestingCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestingCompiler.prototype, "injector", {
        get: function () {
            throw unimplemented();
        },
        enumerable: true,
        configurable: true
    });
    TestingCompiler.prototype.overrideModule = function (module, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overrideDirective = function (directive, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overrideComponent = function (component, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overridePipe = function (directive, overrides) {
        throw unimplemented();
    };
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    TestingCompiler.prototype.loadAotSummaries = function (summaries) {
        throw unimplemented();
    };
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    TestingCompiler.prototype.getComponentFactory = function (component) {
        throw unimplemented();
    };
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    TestingCompiler.prototype.getComponentFromError = function (error) {
        throw unimplemented();
    };
    TestingCompiler = __decorate([
        Injectable()
    ], TestingCompiler);
    return TestingCompiler;
}(Compiler));
export { TestingCompiler };
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
var TestingCompilerFactory = /** @class */ (function () {
    function TestingCompilerFactory() {
    }
    return TestingCompilerFactory;
}());
export { TestingCompilerFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdF9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBMkQsVUFBVSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUk1SSxTQUFTLGFBQWE7SUFDcEIsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOzs7O0dBSUc7QUFFSDtJQUFxQyxtQ0FBUTtJQUE3Qzs7SUF3Q0EsQ0FBQztJQXZDQyxzQkFBSSxxQ0FBUTthQUFaO1lBQ0UsTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHdDQUFjLEdBQWQsVUFBZSxNQUFpQixFQUFFLFNBQXFDO1FBQ3JFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELDJDQUFpQixHQUFqQixVQUFrQixTQUFvQixFQUFFLFNBQXNDO1FBQzVFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELDJDQUFpQixHQUFqQixVQUFrQixTQUFvQixFQUFFLFNBQXNDO1FBQzVFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELHNDQUFZLEdBQVosVUFBYSxTQUFvQixFQUFFLFNBQWlDO1FBQ2xFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7T0FHRztJQUNILDBDQUFnQixHQUFoQixVQUFpQixTQUFzQjtRQUNyQyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsNkNBQW1CLEdBQW5CLFVBQXVCLFNBQWtCO1FBQ3ZDLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILCtDQUFxQixHQUFyQixVQUFzQixLQUFZO1FBQ2hDLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQXZDVSxlQUFlO1FBRDNCLFVBQVUsRUFBRTtPQUNBLGVBQWUsQ0F3QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQXhDRCxDQUFxQyxRQUFRLEdBd0M1QztTQXhDWSxlQUFlO0FBMEM1Qjs7OztHQUlHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCw2QkFBQztBQUFELENBQUMsQUFGRCxJQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVyLCBDb21waWxlck9wdGlvbnMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgRGlyZWN0aXZlLCBJbmplY3RhYmxlLCBJbmplY3RvciwgTmdNb2R1bGUsIFBpcGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01ldGFkYXRhT3ZlcnJpZGV9IGZyb20gJy4vbWV0YWRhdGFfb3ZlcnJpZGUnO1xuXG5mdW5jdGlvbiB1bmltcGxlbWVudGVkKCk6IGFueSB7XG4gIHRocm93IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG59XG5cbi8qKlxuICogU3BlY2lhbCBpbnRlcmZhY2UgdG8gdGhlIGNvbXBpbGVyIG9ubHkgdXNlZCBieSB0ZXN0aW5nXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdGluZ0NvbXBpbGVyIGV4dGVuZHMgQ29tcGlsZXIge1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZU1vZHVsZShtb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlUGlwZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPFBpcGU+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIC8qKlxuICAgKiBBbGxvd3MgdG8gcGFzcyB0aGUgY29tcGlsZSBzdW1tYXJ5IGZyb20gQU9UIGNvbXBpbGF0aW9uIHRvIHRoZSBKSVQgY29tcGlsZXIsXG4gICAqIHNvIHRoYXQgaXQgY2FuIHVzZSB0aGUgY29kZSBnZW5lcmF0ZWQgYnkgQU9ULlxuICAgKi9cbiAgbG9hZEFvdFN1bW1hcmllcyhzdW1tYXJpZXM6ICgpID0+IGFueVtdKSB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvbXBvbmVudCBmYWN0b3J5IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50LlxuICAgKiBUaGlzIGFzc3VtZXMgdGhhdCB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGNvbXBpbGVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgY2FsbCB1c2luZ1xuICAgKiBgY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHMqYC5cbiAgICovXG4gIGdldENvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50RmFjdG9yeTxUPiB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCB0eXBlIHRoYXQgaXMgc3RvcmVkIGluIHRoZSBnaXZlbiBlcnJvci5cbiAgICogVGhpcyBjYW4gYmUgdXNlZCBmb3IgZXJyb3JzIGNyZWF0ZWQgYnkgY29tcGlsZU1vZHVsZS4uLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50RnJvbUVycm9yKGVycm9yOiBFcnJvcik6IFR5cGU8YW55PnxudWxsIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGNyZWF0aW5nIGEgQ29tcGlsZXJcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5IHtcbiAgYWJzdHJhY3QgY3JlYXRlVGVzdGluZ0NvbXBpbGVyKG9wdGlvbnM/OiBDb21waWxlck9wdGlvbnNbXSk6IFRlc3RpbmdDb21waWxlcjtcbn1cbiJdfQ==