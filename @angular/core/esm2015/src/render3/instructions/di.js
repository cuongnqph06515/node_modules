/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/instructions/di.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectFlags, resolveForwardRef } from '../../di';
import { ɵɵinject } from '../../di/injector_compatibility';
import { getOrCreateInjectable, injectAttributeImpl } from '../di';
import { getLView, getPreviousOrParentTNode } from '../state';
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
    /** @type {?} */
    const lView = getLView();
    // Fall back to inject() if view hasn't been created. This situation can happen in tests
    // if inject utilities are used before bootstrapping.
    if (lView == null)
        return ɵɵinject(token, flags);
    /** @type {?} */
    const tNode = getPreviousOrParentTNode();
    return getOrCreateInjectable((/** @type {?} */ (tNode)), lView, resolveForwardRef(token), flags);
}
/**
 * Facade for the attribute injection from DI.
 *
 * \@codeGenApi
 * @param {?} attrNameToInject
 * @return {?}
 */
export function ɵɵinjectAttribute(attrNameToInject) {
    return injectAttributeImpl(getPreviousOrParentTNode(), attrNameToInject);
}
/**
 * Throws an error indicating that a factory function could not be generated by the compiler for a
 * particular class.
 *
 * This instruction allows the actual error message to be optimized away when ngDevMode is turned
 * off, saving bytes of generated code while still providing a good experience in dev mode.
 *
 * The name of the class is not mentioned here, but will be in the generated factory function name
 * and thus in the stack trace.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵinvalidFactory() {
    /** @type {?} */
    const msg = ngDevMode ? `This constructor was not compatible with Dependency Injection.` : 'invalid';
    throw new Error(msg);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luc3RydWN0aW9ucy9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUMsV0FBVyxFQUFrQixpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFekQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sT0FBTyxDQUFDO0FBR2pFLE9BQU8sRUFBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7QUE0QjVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsS0FBZ0MsRUFBRSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU87O1VBQ3pELEtBQUssR0FBRyxRQUFRLEVBQUU7SUFDeEIsd0ZBQXdGO0lBQ3hGLHFEQUFxRDtJQUNyRCxJQUFJLEtBQUssSUFBSSxJQUFJO1FBQUUsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOztVQUMzQyxLQUFLLEdBQUcsd0JBQXdCLEVBQUU7SUFDeEMsT0FBTyxxQkFBcUIsQ0FDeEIsbUJBQUEsS0FBSyxFQUFzQixFQUFFLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzRSxDQUFDOzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxnQkFBd0I7SUFDeEQsT0FBTyxtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDM0UsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFjRCxNQUFNLFVBQVUsZ0JBQWdCOztVQUN4QixHQUFHLEdBQ0wsU0FBUyxDQUFDLENBQUMsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUM1RixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0luamVjdEZsYWdzLCBJbmplY3Rpb25Ub2tlbiwgcmVzb2x2ZUZvcndhcmRSZWZ9IGZyb20gJy4uLy4uL2RpJztcbmltcG9ydCB7ybXJtWluamVjdH0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Z2V0T3JDcmVhdGVJbmplY3RhYmxlLCBpbmplY3RBdHRyaWJ1dGVJbXBsfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge1REaXJlY3RpdmVIb3N0Tm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHthc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzfSBmcm9tICcuLi9ub2RlX2Fzc2VydCc7XG5pbXBvcnQge2dldExWaWV3LCBnZXRQcmV2aW91c09yUGFyZW50VE5vZGV9IGZyb20gJy4uL3N0YXRlJztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiB0b2tlbiBmcm9tIHRoZSBpbmplY3RvcnMuXG4gKlxuICogYGRpcmVjdGl2ZUluamVjdGAgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBmb3IgZGlyZWN0aXZlLCBjb21wb25lbnQgYW5kIHBpcGUgZmFjdG9yaWVzLlxuICogIEFsbCBvdGhlciBpbmplY3Rpb24gdXNlIGBpbmplY3RgIHdoaWNoIGRvZXMgbm90IHdhbGsgdGhlIG5vZGUgaW5qZWN0b3IgdHJlZS5cbiAqXG4gKiBVc2FnZSBleGFtcGxlIChpbiBmYWN0b3J5IGZ1bmN0aW9uKTpcbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgU29tZURpcmVjdGl2ZSB7XG4gKiAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZTogRGlyZWN0aXZlQSkge31cbiAqXG4gKiAgIHN0YXRpYyDJtWRpciA9IMm1ybVkZWZpbmVEaXJlY3RpdmUoe1xuICogICAgIHR5cGU6IFNvbWVEaXJlY3RpdmUsXG4gKiAgICAgZmFjdG9yeTogKCkgPT4gbmV3IFNvbWVEaXJlY3RpdmUoybXJtWRpcmVjdGl2ZUluamVjdChEaXJlY3RpdmVBKSlcbiAqICAgfSk7XG4gKiB9XG4gKiBgYGBcbiAqIEBwYXJhbSB0b2tlbiB0aGUgdHlwZSBvciB0b2tlbiB0byBpbmplY3RcbiAqIEBwYXJhbSBmbGFncyBJbmplY3Rpb24gZmxhZ3NcbiAqIEByZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIHRoZSBpbmplY3RvciBvciBgbnVsbGAgd2hlbiBub3QgZm91bmRcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRpcmVjdGl2ZUluamVjdDxUPih0b2tlbjogVHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPik6IFQ7XG5leHBvcnQgZnVuY3Rpb24gybXJtWRpcmVjdGl2ZUluamVjdDxUPih0b2tlbjogVHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M6IEluamVjdEZsYWdzKTogVDtcbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGlyZWN0aXZlSW5qZWN0PFQ+KFxuICAgIHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBmbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBUfG51bGwge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIC8vIEZhbGwgYmFjayB0byBpbmplY3QoKSBpZiB2aWV3IGhhc24ndCBiZWVuIGNyZWF0ZWQuIFRoaXMgc2l0dWF0aW9uIGNhbiBoYXBwZW4gaW4gdGVzdHNcbiAgLy8gaWYgaW5qZWN0IHV0aWxpdGllcyBhcmUgdXNlZCBiZWZvcmUgYm9vdHN0cmFwcGluZy5cbiAgaWYgKGxWaWV3ID09IG51bGwpIHJldHVybiDJtcm1aW5qZWN0KHRva2VuLCBmbGFncyk7XG4gIGNvbnN0IHROb2RlID0gZ2V0UHJldmlvdXNPclBhcmVudFROb2RlKCk7XG4gIHJldHVybiBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4oXG4gICAgICB0Tm9kZSBhcyBURGlyZWN0aXZlSG9zdE5vZGUsIGxWaWV3LCByZXNvbHZlRm9yd2FyZFJlZih0b2tlbiksIGZsYWdzKTtcbn1cblxuLyoqXG4gKiBGYWNhZGUgZm9yIHRoZSBhdHRyaWJ1dGUgaW5qZWN0aW9uIGZyb20gREkuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVpbmplY3RBdHRyaWJ1dGUoYXR0ck5hbWVUb0luamVjdDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICByZXR1cm4gaW5qZWN0QXR0cmlidXRlSW1wbChnZXRQcmV2aW91c09yUGFyZW50VE5vZGUoKSwgYXR0ck5hbWVUb0luamVjdCk7XG59XG5cbi8qKlxuICogVGhyb3dzIGFuIGVycm9yIGluZGljYXRpbmcgdGhhdCBhIGZhY3RvcnkgZnVuY3Rpb24gY291bGQgbm90IGJlIGdlbmVyYXRlZCBieSB0aGUgY29tcGlsZXIgZm9yIGFcbiAqIHBhcnRpY3VsYXIgY2xhc3MuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhbGxvd3MgdGhlIGFjdHVhbCBlcnJvciBtZXNzYWdlIHRvIGJlIG9wdGltaXplZCBhd2F5IHdoZW4gbmdEZXZNb2RlIGlzIHR1cm5lZFxuICogb2ZmLCBzYXZpbmcgYnl0ZXMgb2YgZ2VuZXJhdGVkIGNvZGUgd2hpbGUgc3RpbGwgcHJvdmlkaW5nIGEgZ29vZCBleHBlcmllbmNlIGluIGRldiBtb2RlLlxuICpcbiAqIFRoZSBuYW1lIG9mIHRoZSBjbGFzcyBpcyBub3QgbWVudGlvbmVkIGhlcmUsIGJ1dCB3aWxsIGJlIGluIHRoZSBnZW5lcmF0ZWQgZmFjdG9yeSBmdW5jdGlvbiBuYW1lXG4gKiBhbmQgdGh1cyBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVpbnZhbGlkRmFjdG9yeSgpOiBuZXZlciB7XG4gIGNvbnN0IG1zZyA9XG4gICAgICBuZ0Rldk1vZGUgPyBgVGhpcyBjb25zdHJ1Y3RvciB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCBEZXBlbmRlbmN5IEluamVjdGlvbi5gIDogJ2ludmFsaWQnO1xuICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbn1cbiJdfQ==