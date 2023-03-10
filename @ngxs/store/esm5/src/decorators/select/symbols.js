/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CONFIG_MESSAGES, VALIDATION_CODE } from '../../configs/messages.config';
import { propGetter } from '../../internal/internals';
import { SelectFactory } from './select-factory';
/** @type {?} */
var DOLLAR_CHAR_CODE = 36;
/**
 * @template T
 * @param {?} selector
 * @return {?}
 */
export function createSelectObservable(selector) {
    if (!SelectFactory.store) {
        throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.SELECT_FACTORY_NOT_CONNECTED]());
    }
    return SelectFactory.store.select(selector);
}
/**
 * @param {?} name
 * @param {?=} rawSelector
 * @param {?=} paths
 * @return {?}
 */
export function createSelectorFn(name, rawSelector, paths) {
    if (paths === void 0) { paths = []; }
    rawSelector = !rawSelector ? removeDollarAtTheEnd(name) : rawSelector;
    if (typeof rawSelector === 'string') {
        /** @type {?} */
        var propsArray = paths.length
            ? tslib_1.__spread([rawSelector], paths) : rawSelector.split('.');
        return propGetter(propsArray, (/** @type {?} */ (SelectFactory.config)));
    }
    return rawSelector;
}
/**
 * \@example If `foo$` => make it just `foo`
 * @param {?} name
 * @return {?}
 */
export function removeDollarAtTheEnd(name) {
    /** @type {?} */
    var lastCharIndex = name.length - 1;
    /** @type {?} */
    var dollarAtTheEnd = name.charCodeAt(lastCharIndex) === DOLLAR_CHAR_CODE;
    return dollarAtTheEnd ? name.slice(0, lastCharIndex) : name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL2RlY29yYXRvcnMvc2VsZWN0L3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBSTNDLGdCQUFnQixHQUFHLEVBQUU7Ozs7OztBQUUzQixNQUFNLFVBQVUsc0JBQXNCLENBQVUsUUFBYTtJQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDbEY7SUFFRCxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFdBQWlCLEVBQUUsS0FBb0I7SUFBcEIsc0JBQUEsRUFBQSxVQUFvQjtJQUNwRixXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFFdEUsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7O1lBQzdCLFVBQVUsR0FBYSxLQUFLLENBQUMsTUFBTTtZQUN2QyxDQUFDLG1CQUFFLFdBQVcsR0FBSyxLQUFLLEVBQ3hCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMxQixPQUFPLFVBQVUsQ0FBQyxVQUFVLEVBQUUsbUJBQUEsYUFBYSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDOzs7Ozs7QUFLRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsSUFBWTs7UUFDekMsYUFBYSxHQUFXLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7UUFDdkMsY0FBYyxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssZ0JBQWdCO0lBQ25GLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzlELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBDT05GSUdfTUVTU0FHRVMsIFZBTElEQVRJT05fQ09ERSB9IGZyb20gJy4uLy4uL2NvbmZpZ3MvbWVzc2FnZXMuY29uZmlnJztcclxuaW1wb3J0IHsgcHJvcEdldHRlciB9IGZyb20gJy4uLy4uL2ludGVybmFsL2ludGVybmFscyc7XHJcbmltcG9ydCB7IFNlbGVjdEZhY3RvcnkgfSBmcm9tICcuL3NlbGVjdC1mYWN0b3J5JztcclxuaW1wb3J0IHsgU3RhdGVUb2tlbiB9IGZyb20gJy4uLy4uL3N0YXRlLXRva2VuL3N0YXRlLXRva2VuJztcclxuaW1wb3J0IHsgRXh0cmFjdFRva2VuVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlLXRva2VuL3N5bWJvbHMnO1xyXG5cclxuY29uc3QgRE9MTEFSX0NIQVJfQ09ERSA9IDM2O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdE9ic2VydmFibGU8VCA9IGFueT4oc2VsZWN0b3I6IGFueSk6IE9ic2VydmFibGU8VD4ge1xyXG4gIGlmICghU2VsZWN0RmFjdG9yeS5zdG9yZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKENPTkZJR19NRVNTQUdFU1tWQUxJREFUSU9OX0NPREUuU0VMRUNUX0ZBQ1RPUllfTk9UX0NPTk5FQ1RFRF0oKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gU2VsZWN0RmFjdG9yeS5zdG9yZS5zZWxlY3Qoc2VsZWN0b3IpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGbihuYW1lOiBzdHJpbmcsIHJhd1NlbGVjdG9yPzogYW55LCBwYXRoczogc3RyaW5nW10gPSBbXSk6IGFueSB7XHJcbiAgcmF3U2VsZWN0b3IgPSAhcmF3U2VsZWN0b3IgPyByZW1vdmVEb2xsYXJBdFRoZUVuZChuYW1lKSA6IHJhd1NlbGVjdG9yO1xyXG5cclxuICBpZiAodHlwZW9mIHJhd1NlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgY29uc3QgcHJvcHNBcnJheTogc3RyaW5nW10gPSBwYXRocy5sZW5ndGhcclxuICAgICAgPyBbcmF3U2VsZWN0b3IsIC4uLnBhdGhzXVxyXG4gICAgICA6IHJhd1NlbGVjdG9yLnNwbGl0KCcuJyk7XHJcbiAgICByZXR1cm4gcHJvcEdldHRlcihwcm9wc0FycmF5LCBTZWxlY3RGYWN0b3J5LmNvbmZpZyEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJhd1NlbGVjdG9yO1xyXG59XHJcblxyXG4vKipcclxuICogQGV4YW1wbGUgSWYgYGZvbyRgID0+IG1ha2UgaXQganVzdCBgZm9vYFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURvbGxhckF0VGhlRW5kKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgbGFzdENoYXJJbmRleDogbnVtYmVyID0gbmFtZS5sZW5ndGggLSAxO1xyXG4gIGNvbnN0IGRvbGxhckF0VGhlRW5kOiBib29sZWFuID0gbmFtZS5jaGFyQ29kZUF0KGxhc3RDaGFySW5kZXgpID09PSBET0xMQVJfQ0hBUl9DT0RFO1xyXG4gIHJldHVybiBkb2xsYXJBdFRoZUVuZCA/IG5hbWUuc2xpY2UoMCwgbGFzdENoYXJJbmRleCkgOiBuYW1lO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQcm9wZXJ0eVR5cGU8VD4gPSBUIGV4dGVuZHMgU3RhdGVUb2tlbjxhbnk+XHJcbiAgPyBPYnNlcnZhYmxlPEV4dHJhY3RUb2tlblR5cGU8VD4+XHJcbiAgOiBUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnlcclxuICA/IE9ic2VydmFibGU8UmV0dXJuVHlwZTxUPj5cclxuICA6IGFueTtcclxuIl19