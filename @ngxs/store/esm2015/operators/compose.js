/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {...?} operators
 * @return {?}
 */
export function compose(...operators) {
    return (/**
     * @param {?} existing
     * @return {?}
     */
    function composeOperator(existing) {
        return operators.reduce((/**
         * @param {?} accumulator
         * @param {?} operator
         * @return {?}
         */
        (accumulator, operator) => operator(accumulator)), existing);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlL29wZXJhdG9ycy8iLCJzb3VyY2VzIjpbImNvbXBvc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsTUFBTSxVQUFVLE9BQU8sQ0FBSSxHQUFHLFNBQTZCO0lBQ3pEOzs7O0lBQU8sU0FBUyxlQUFlLENBQUMsUUFBcUI7UUFDbkQsT0FBTyxTQUFTLENBQUMsTUFBTTs7Ozs7UUFBQyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRSxRQUFRLENBQUMsQ0FBQztJQUN0RixDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGVPcGVyYXRvciB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPFQ+KC4uLm9wZXJhdG9yczogU3RhdGVPcGVyYXRvcjxUPltdKTogU3RhdGVPcGVyYXRvcjxUPiB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXBvc2VPcGVyYXRvcihleGlzdGluZzogUmVhZG9ubHk8VD4pOiBUIHtcclxuICAgIHJldHVybiBvcGVyYXRvcnMucmVkdWNlKChhY2N1bXVsYXRvciwgb3BlcmF0b3IpID0+IG9wZXJhdG9yKGFjY3VtdWxhdG9yKSwgZXhpc3RpbmcpO1xyXG4gIH07XHJcbn1cclxuIl19