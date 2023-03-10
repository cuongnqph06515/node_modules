/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/testing/src/test_compiler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, Injectable } from '@angular/core';
/**
 * @return {?}
 */
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * \@publicApi
 */
export class TestingCompiler extends Compiler {
    /**
     * @return {?}
     */
    get injector() {
        throw unimplemented();
    }
    /**
     * @param {?} module
     * @param {?} overrides
     * @return {?}
     */
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} component
     * @param {?} overrides
     * @return {?}
     */
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     * @param {?} summaries
     * @return {?}
     */
    loadAotSummaries(summaries) {
        throw unimplemented();
    }
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     * @template T
     * @param {?} component
     * @return {?}
     */
    getComponentFactory(component) {
        throw unimplemented();
    }
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     * @param {?} error
     * @return {?}
     */
    getComponentFromError(error) {
        throw unimplemented();
    }
}
TestingCompiler.decorators = [
    { type: Injectable }
];
/**
 * A factory for creating a Compiler
 *
 * \@publicApi
 * @abstract
 */
export class TestingCompilerFactory {
}
if (false) {
    /**
     * @abstract
     * @param {?=} options
     * @return {?}
     */
    TestingCompilerFactory.prototype.createTestingCompiler = function (options) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdF9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUEyRCxVQUFVLEVBQWlDLE1BQU0sZUFBZSxDQUFDOzs7O0FBSTVJLFNBQVMsYUFBYTtJQUNwQixNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMvQixDQUFDOzs7Ozs7QUFRRCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxRQUFROzs7O0lBQzNDLElBQUksUUFBUTtRQUNWLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBQ0QsY0FBYyxDQUFDLE1BQWlCLEVBQUUsU0FBcUM7UUFDckUsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFDRCxpQkFBaUIsQ0FBQyxTQUFvQixFQUFFLFNBQXNDO1FBQzVFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsU0FBb0IsRUFBRSxTQUFzQztRQUM1RSxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUNELFlBQVksQ0FBQyxTQUFvQixFQUFFLFNBQWlDO1FBQ2xFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7OztJQUtELGdCQUFnQixDQUFDLFNBQXNCO1FBQ3JDLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7Ozs7O0lBT0QsbUJBQW1CLENBQUksU0FBa0I7UUFDdkMsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7O0lBTUQscUJBQXFCLENBQUMsS0FBWTtRQUNoQyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQXhDRixVQUFVOzs7Ozs7OztBQWdEWCxNQUFNLE9BQWdCLHNCQUFzQjtDQUUzQzs7Ozs7OztJQURDLGdGQUE2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlciwgQ29tcGlsZXJPcHRpb25zLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIERpcmVjdGl2ZSwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nTW9kdWxlLCBQaXBlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXRhZGF0YU92ZXJyaWRlfSBmcm9tICcuL21ldGFkYXRhX292ZXJyaWRlJztcblxuZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnkge1xuICB0aHJvdyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xufVxuXG4vKipcbiAqIFNwZWNpYWwgaW50ZXJmYWNlIHRvIHRoZSBjb21waWxlciBvbmx5IHVzZWQgYnkgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RpbmdDb21waWxlciBleHRlbmRzIENvbXBpbGVyIHtcbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVNb2R1bGUobW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxOZ01vZHVsZT4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVEaXJlY3RpdmUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZVBpcGUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICAvKipcbiAgICogQWxsb3dzIHRvIHBhc3MgdGhlIGNvbXBpbGUgc3VtbWFyeSBmcm9tIEFPVCBjb21waWxhdGlvbiB0byB0aGUgSklUIGNvbXBpbGVyLFxuICAgKiBzbyB0aGF0IGl0IGNhbiB1c2UgdGhlIGNvZGUgZ2VuZXJhdGVkIGJ5IEFPVC5cbiAgICovXG4gIGxvYWRBb3RTdW1tYXJpZXMoc3VtbWFyaWVzOiAoKSA9PiBhbnlbXSkge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjb21wb25lbnQgZmFjdG9yeSBmb3IgdGhlIGdpdmVuIGNvbXBvbmVudC5cbiAgICogVGhpcyBhc3N1bWVzIHRoYXQgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBjb21waWxlZCBiZWZvcmUgY2FsbGluZyB0aGlzIGNhbGwgdXNpbmdcbiAgICogYGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzKmAuXG4gICAqL1xuICBnZXRDb21wb25lbnRGYWN0b3J5PFQ+KGNvbXBvbmVudDogVHlwZTxUPik6IENvbXBvbmVudEZhY3Rvcnk8VD4ge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgdHlwZSB0aGF0IGlzIHN0b3JlZCBpbiB0aGUgZ2l2ZW4gZXJyb3IuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGVycm9ycyBjcmVhdGVkIGJ5IGNvbXBpbGVNb2R1bGUuLi5cbiAgICovXG4gIGdldENvbXBvbmVudEZyb21FcnJvcihlcnJvcjogRXJyb3IpOiBUeXBlPGFueT58bnVsbCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG59XG5cbi8qKlxuICogQSBmYWN0b3J5IGZvciBjcmVhdGluZyBhIENvbXBpbGVyXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGVzdGluZ0NvbXBpbGVyRmFjdG9yeSB7XG4gIGFic3RyYWN0IGNyZWF0ZVRlc3RpbmdDb21waWxlcihvcHRpb25zPzogQ29tcGlsZXJPcHRpb25zW10pOiBUZXN0aW5nQ29tcGlsZXI7XG59XG4iXX0=