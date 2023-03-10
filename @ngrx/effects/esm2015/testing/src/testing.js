/**
 * @fileoverview added by tsickle
 * Generated from: modules/effects/testing/src/testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Actions } from '@ngrx/effects';
import { defer } from 'rxjs';
/**
 * @param {?} factoryOrSource
 * @return {?}
 */
export function provideMockActions(factoryOrSource) {
    return {
        provide: Actions,
        useFactory: (/**
         * @return {?}
         */
        () => {
            if (typeof factoryOrSource === 'function') {
                return new Actions(defer(factoryOrSource));
            }
            return new Actions(factoryOrSource);
        }),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy90ZXN0aW5nL3NyYy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7OztBQUl6QyxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLGVBQTBEO0lBRTFELE9BQU87UUFDTCxPQUFPLEVBQUUsT0FBTztRQUNoQixVQUFVOzs7UUFBRSxHQUFvQixFQUFFO1lBQ2hDLElBQUksT0FBTyxlQUFlLEtBQUssVUFBVSxFQUFFO2dCQUN6QyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUE7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBkZWZlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tBY3Rpb25zKHNvdXJjZTogT2JzZXJ2YWJsZTxhbnk+KTogUHJvdmlkZXI7XG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tBY3Rpb25zKGZhY3Rvcnk6ICgpID0+IE9ic2VydmFibGU8YW55Pik6IFByb3ZpZGVyO1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVNb2NrQWN0aW9ucyhcbiAgZmFjdG9yeU9yU291cmNlOiAoKCkgPT4gT2JzZXJ2YWJsZTxhbnk+KSB8IE9ic2VydmFibGU8YW55PlxuKTogUHJvdmlkZXIge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IEFjdGlvbnMsXG4gICAgdXNlRmFjdG9yeTogKCk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgICBpZiAodHlwZW9mIGZhY3RvcnlPclNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IEFjdGlvbnMoZGVmZXIoZmFjdG9yeU9yU291cmNlKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgQWN0aW9ucyhmYWN0b3J5T3JTb3VyY2UpO1xuICAgIH0sXG4gIH07XG59XG4iXX0=