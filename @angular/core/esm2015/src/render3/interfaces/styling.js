/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/interfaces/styling.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertNumber, assertNumberInRange } from '../../util/assert';
/**
 * Store the static values for the styling binding.
 *
 * The `TStylingStatic` is just `KeyValueArray` where key `""` (stored at location 0) contains the
 * `TStylingKey` (stored at location 1). In other words this wraps the `TStylingKey` such that the
 * `""` contains the wrapped value.
 *
 * When instructions are resolving styling they may need to look forward or backwards in the linked
 * list to resolve the value. For this reason we have to make sure that he linked list also contains
 * the static values. However the list only has space for one item per styling instruction. For this
 * reason we store the static values here as part of the `TStylingKey`. This means that the
 * resolution function when looking for a value needs to first look at the binding value, and than
 * at `TStylingKey` (if it exists).
 *
 * Imagine we have:
 *
 * ```
 * <div class="TEMPLATE" my-dir>
 *
 * \@Directive({
 *   host: {
 *     class: 'DIR',
 *     '[class.dynamic]': 'exp' // ɵɵclassProp('dynamic', ctx.exp);
 *   }
 * })
 * ```
 *
 * In the above case the linked list will contain one item:
 *
 * ```
 *   // assume binding location: 10 for `ɵɵclassProp('dynamic', ctx.exp);`
 *   tData[10] = <TStylingStatic>[
 *     '': 'dynamic', // This is the wrapped value of `TStylingKey`
 *     'DIR': true,   // This is the default static value of directive binding.
 *   ];
 *   tData[10 + 1] = 0; // We don't have prev/next.
 *
 *   lView[10] = undefined;     // assume `ctx.exp` is `undefined`
 *   lView[10 + 1] = undefined; // Just normalized `lView[10]`
 * ```
 *
 * So when the function is resolving styling value, it first needs to look into the linked list
 * (there is none) and than into the static `TStylingStatic` too see if there is a default value for
 * `dynamic` (there is not). Therefore it is safe to remove it.
 *
 * If setting `true` case:
 * ```
 *   lView[10] = true;     // assume `ctx.exp` is `true`
 *   lView[10 + 1] = true; // Just normalized `lView[10]`
 * ```
 * So when the function is resolving styling value, it first needs to look into the linked list
 * (there is none) and than into `TNode.residualClass` (TNode.residualStyle) which contains
 * ```
 *   tNode.residualClass = [
 *     'TEMPLATE': true,
 *   ];
 * ```
 *
 * This means that it is safe to add class.
 * @record
 */
export function TStylingStatic() { }
/**
 * This is a branded number which contains previous and next index.
 *
 * When we come across styling instructions we need to store the `TStylingKey` in the correct
 * order so that we can re-concatenate the styling value in the desired priority.
 *
 * The insertion can happen either at the:
 * - end of template as in the case of coming across additional styling instruction in the template
 * - in front of the template in the case of coming across additional instruction in the
 *   `hostBindings`.
 *
 * We use `TStylingRange` to store the previous and next index into the `TData` where the template
 * bindings can be found.
 *
 * - bit 0 is used to mark that the previous index has a duplicate for current value.
 * - bit 1 is used to mark that the next index has a duplicate for the current value.
 * - bits 2-16 are used to encode the next/tail of the template.
 * - bits 17-32 are used to encode the previous/head of template.
 *
 * NODE: *duplicate* false implies that it is statically known that this binding will not collide
 * with other bindings and therefore there is no need to check other bindings. For example the
 * bindings in `<div [style.color]="exp" [style.width]="exp">` will never collide and will have
 * their bits set accordingly. Previous duplicate means that we may need to check previous if the
 * current binding is `null`. Next duplicate means that we may need to check next bindings if the
 * current binding is not `null`.
 *
 * NOTE: `0` has special significance and represents `null` as in no additional pointer.
 * @record
 */
export function TStylingRange() { }
if (false) {
    /** @type {?} */
    TStylingRange.prototype.__brand__;
}
/** @enum {number} */
const StylingRange = {
    /// Number of bits to shift for the previous pointer
    PREV_SHIFT: 17,
    /// Previous pointer mask.
    PREV_MASK: 4294836224,
    /// Number of bits to shift for the next pointer
    NEXT_SHIFT: 2,
    /// Next pointer mask.
    NEXT_MASK: 131068,
    // Mask to remove nagative bit. (interpret number as positive)
    UNSIGNED_MASK: 32767,
    /**
     * This bit is set if the previous bindings contains a binding which could possibly cause a
     * duplicate. For example: `<div [style]="map" [style.width]="width">`, the `width` binding will
     * have previous duplicate set. The implication is that if `width` binding becomes `null`, it is
     * necessary to defer the value to `map.width`. (Because `width` overwrites `map.width`.)
     */
    PREV_DUPLICATE: 2,
    /**
     * This bit is set to if the next binding contains a binding which could possibly cause a
     * duplicate. For example: `<div [style]="map" [style.width]="width">`, the `map` binding will
     * have next duplicate set. The implication is that if `map.width` binding becomes not `null`, it
     * is necessary to defer the value to `width`. (Because `width` overwrites `map.width`.)
     */
    NEXT_DUPLICATE: 1,
};
export { StylingRange };
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
export function toTStylingRange(prev, next) {
    ngDevMode && assertNumberInRange(prev, 0, 32767 /* UNSIGNED_MASK */);
    ngDevMode && assertNumberInRange(next, 0, 32767 /* UNSIGNED_MASK */);
    return (/** @type {?} */ ((prev << 17 /* PREV_SHIFT */ | next << 2 /* NEXT_SHIFT */)));
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function getTStylingRangePrev(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) >> 17 /* PREV_SHIFT */) & 32767 /* UNSIGNED_MASK */;
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function getTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) & 2 /* PREV_DUPLICATE */) ==
        2 /* PREV_DUPLICATE */;
}
/**
 * @param {?} tStylingRange
 * @param {?} previous
 * @return {?}
 */
export function setTStylingRangePrev(tStylingRange, previous) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    ngDevMode && assertNumberInRange(previous, 0, 32767 /* UNSIGNED_MASK */);
    return (/** @type {?} */ (((((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) & ~4294836224 /* PREV_MASK */) |
        (previous << 17 /* PREV_SHIFT */))));
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function setTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (/** @type {?} */ ((((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) | 2 /* PREV_DUPLICATE */)));
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function getTStylingRangeNext(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) & 131068 /* NEXT_MASK */) >> 2 /* NEXT_SHIFT */;
}
/**
 * @param {?} tStylingRange
 * @param {?} next
 * @return {?}
 */
export function setTStylingRangeNext(tStylingRange, next) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    ngDevMode && assertNumberInRange(next, 0, 32767 /* UNSIGNED_MASK */);
    return (/** @type {?} */ (((((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) & ~131068 /* NEXT_MASK */) | //
        next << 2 /* NEXT_SHIFT */)));
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function getTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) & 1 /* NEXT_DUPLICATE */) ===
        1 /* NEXT_DUPLICATE */;
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function setTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (/** @type {?} */ ((((/** @type {?} */ ((/** @type {?} */ (tStylingRange))))) | 1 /* NEXT_DUPLICATE */)));
}
/**
 * @param {?} tStylingRange
 * @return {?}
 */
export function getTStylingRangeTail(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    /** @type {?} */
    const next = getTStylingRangeNext(tStylingRange);
    return next === 0 ? getTStylingRangePrev(tStylingRange) : next;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9zdHlsaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRnBFLG9DQUE2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEI3RCxtQ0FFQzs7O0lBREMsa0NBQTJCOzs7QUFNN0IsTUFBa0IsWUFBWTtJQUM1QixvREFBb0Q7SUFDcEQsVUFBVSxJQUFLO0lBQ2YsMEJBQTBCO0lBQzFCLFNBQVMsWUFBYTtJQUV0QixnREFBZ0Q7SUFDaEQsVUFBVSxHQUFJO0lBQ2Qsc0JBQXNCO0lBQ3RCLFNBQVMsUUFBWTtJQUVyQiw4REFBOEQ7SUFDOUQsYUFBYSxPQUFTO0lBRXRCOzs7OztPQUtHO0lBQ0gsY0FBYyxHQUFPO0lBRXJCOzs7OztPQUtHO0lBQ0gsY0FBYyxHQUFPO0VBQ3RCOzs7Ozs7O0FBR0QsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUN4RCxTQUFTLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsNEJBQTZCLENBQUM7SUFDdEUsU0FBUyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDLDRCQUE2QixDQUFDO0lBQ3RFLE9BQU8sbUJBQUEsQ0FBQyxJQUFJLHVCQUEyQixHQUFHLElBQUksc0JBQTJCLENBQUMsRUFBTyxDQUFDO0FBQ3BGLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGFBQTRCO0lBQy9ELFNBQVMsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFD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QUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0tleVZhbHVlQXJyYXl9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXlfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnROdW1iZXIsIGFzc2VydE51bWJlckluUmFuZ2V9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcblxuLyoqXG4gKiBWYWx1ZSBzdG9yZWQgaW4gdGhlIGBURGF0YWAgd2hpY2ggaXMgbmVlZGVkIHRvIHJlLWNvbmNhdGVuYXRlIHRoZSBzdHlsaW5nLlxuICpcbiAqIFNlZTogYFRTdHlsaW5nS2V5UHJpbWl0aXZlYCBhbmQgYFRTdHlsaW5nU3RhdGljYFxuICovXG5leHBvcnQgdHlwZSBUU3R5bGluZ0tleSA9IFRTdHlsaW5nS2V5UHJpbWl0aXZlfFRTdHlsaW5nU3RhdGljO1xuXG5cbi8qKlxuICogVGhlIHByaW1pdGl2ZSBwb3J0aW9uIChgVFN0eWxpbmdTdGF0aWNgIHJlbW92ZWQpIG9mIHRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIGBURGF0YWAgd2hpY2ggaXNcbiAqIG5lZWRlZCB0byByZS1jb25jYXRlbmF0ZSB0aGUgc3R5bGluZy5cbiAqXG4gKiAtIGBzdHJpbmdgOiBTdG9yZXMgdGhlIHByb3BlcnR5IG5hbWUuIFVzZWQgd2l0aCBgybXJtXN0eWxlUHJvcGAvYMm1ybVjbGFzc1Byb3BgIGluc3RydWN0aW9uLlxuICogLSBgbnVsbGA6IFJlcHJlc2VudHMgbWFwLCBzbyB0aGVyZSBpcyBubyBuYW1lLiBVc2VkIHdpdGggYMm1ybVzdHlsZU1hcGAvYMm1ybVjbGFzc01hcGAuXG4gKiAtIGBmYWxzZWA6IFJlcHJlc2VudHMgYW4gaWdub3JlIGNhc2UuIFRoaXMgaGFwcGVucyB3aGVuIGDJtcm1c3R5bGVQcm9wYC9gybXJtWNsYXNzUHJvcGAgaW5zdHJ1Y3Rpb25cbiAqICAgaXMgY29tYmluZWQgd2l0aCBkaXJlY3RpdmUgd2hpY2ggc2hhZG93cyBpdHMgaW5wdXQgYEBJbnB1dCgnY2xhc3MnKWAuIFRoYXQgd2F5IHRoZSBiaW5kaW5nXG4gKiAgIHNob3VsZCBub3QgcGFydGljaXBhdGUgaW4gdGhlIHN0eWxpbmcgcmVzb2x1dGlvbi5cbiAqL1xuZXhwb3J0IHR5cGUgVFN0eWxpbmdLZXlQcmltaXRpdmUgPSBzdHJpbmd8bnVsbHxmYWxzZTtcblxuLyoqXG4gKiBTdG9yZSB0aGUgc3RhdGljIHZhbHVlcyBmb3IgdGhlIHN0eWxpbmcgYmluZGluZy5cbiAqXG4gKiBUaGUgYFRTdHlsaW5nU3RhdGljYCBpcyBqdXN0IGBLZXlWYWx1ZUFycmF5YCB3aGVyZSBrZXkgYFwiXCJgIChzdG9yZWQgYXQgbG9jYXRpb24gMCkgY29udGFpbnMgdGhlXG4gKiBgVFN0eWxpbmdLZXlgIChzdG9yZWQgYXQgbG9jYXRpb24gMSkuIEluIG90aGVyIHdvcmRzIHRoaXMgd3JhcHMgdGhlIGBUU3R5bGluZ0tleWAgc3VjaCB0aGF0IHRoZVxuICogYFwiXCJgIGNvbnRhaW5zIHRoZSB3cmFwcGVkIHZhbHVlLlxuICpcbiAqIFdoZW4gaW5zdHJ1Y3Rpb25zIGFyZSByZXNvbHZpbmcgc3R5bGluZyB0aGV5IG1heSBuZWVkIHRvIGxvb2sgZm9yd2FyZCBvciBiYWNrd2FyZHMgaW4gdGhlIGxpbmtlZFxuICogbGlzdCB0byByZXNvbHZlIHRoZSB2YWx1ZS4gRm9yIHRoaXMgcmVhc29uIHdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgaGUgbGlua2VkIGxpc3QgYWxzbyBjb250YWluc1xuICogdGhlIHN0YXRpYyB2YWx1ZXMuIEhvd2V2ZXIgdGhlIGxpc3Qgb25seSBoYXMgc3BhY2UgZm9yIG9uZSBpdGVtIHBlciBzdHlsaW5nIGluc3RydWN0aW9uLiBGb3IgdGhpc1xuICogcmVhc29uIHdlIHN0b3JlIHRoZSBzdGF0aWMgdmFsdWVzIGhlcmUgYXMgcGFydCBvZiB0aGUgYFRTdHlsaW5nS2V5YC4gVGhpcyBtZWFucyB0aGF0IHRoZVxuICogcmVzb2x1dGlvbiBmdW5jdGlvbiB3aGVuIGxvb2tpbmcgZm9yIGEgdmFsdWUgbmVlZHMgdG8gZmlyc3QgbG9vayBhdCB0aGUgYmluZGluZyB2YWx1ZSwgYW5kIHRoYW5cbiAqIGF0IGBUU3R5bGluZ0tleWAgKGlmIGl0IGV4aXN0cykuXG4gKlxuICogSW1hZ2luZSB3ZSBoYXZlOlxuICpcbiAqIGBgYFxuICogPGRpdiBjbGFzcz1cIlRFTVBMQVRFXCIgbXktZGlyPlxuICpcbiAqIEBEaXJlY3RpdmUoe1xuICogICBob3N0OiB7XG4gKiAgICAgY2xhc3M6ICdESVInLFxuICogICAgICdbY2xhc3MuZHluYW1pY10nOiAnZXhwJyAvLyDJtcm1Y2xhc3NQcm9wKCdkeW5hbWljJywgY3R4LmV4cCk7XG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBJbiB0aGUgYWJvdmUgY2FzZSB0aGUgbGlua2VkIGxpc3Qgd2lsbCBjb250YWluIG9uZSBpdGVtOlxuICpcbiAqIGBgYFxuICogICAvLyBhc3N1bWUgYmluZGluZyBsb2NhdGlvbjogMTAgZm9yIGDJtcm1Y2xhc3NQcm9wKCdkeW5hbWljJywgY3R4LmV4cCk7YFxuICogICB0RGF0YVsxMF0gPSA8VFN0eWxpbmdTdGF0aWM+W1xuICogICAgICcnOiAnZHluYW1pYycsIC8vIFRoaXMgaXMgdGhlIHdyYXBwZWQgdmFsdWUgb2YgYFRTdHlsaW5nS2V5YFxuICogICAgICdESVInOiB0cnVlLCAgIC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgc3RhdGljIHZhbHVlIG9mIGRpcmVjdGl2ZSBiaW5kaW5nLlxuICogICBdO1xuICogICB0RGF0YVsxMCArIDFdID0gMDsgLy8gV2UgZG9uJ3QgaGF2ZSBwcmV2L25leHQuXG4gKlxuICogICBsVmlld1sxMF0gPSB1bmRlZmluZWQ7ICAgICAvLyBhc3N1bWUgYGN0eC5leHBgIGlzIGB1bmRlZmluZWRgXG4gKiAgIGxWaWV3WzEwICsgMV0gPSB1bmRlZmluZWQ7IC8vIEp1c3Qgbm9ybWFsaXplZCBgbFZpZXdbMTBdYFxuICogYGBgXG4gKlxuICogU28gd2hlbiB0aGUgZnVuY3Rpb24gaXMgcmVzb2x2aW5nIHN0eWxpbmcgdmFsdWUsIGl0IGZpcnN0IG5lZWRzIHRvIGxvb2sgaW50byB0aGUgbGlua2VkIGxpc3RcbiAqICh0aGVyZSBpcyBub25lKSBhbmQgdGhhbiBpbnRvIHRoZSBzdGF0aWMgYFRTdHlsaW5nU3RhdGljYCB0b28gc2VlIGlmIHRoZXJlIGlzIGEgZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIGBkeW5hbWljYCAodGhlcmUgaXMgbm90KS4gVGhlcmVmb3JlIGl0IGlzIHNhZmUgdG8gcmVtb3ZlIGl0LlxuICpcbiAqIElmIHNldHRpbmcgYHRydWVgIGNhc2U6XG4gKiBgYGBcbiAqICAgbFZpZXdbMTBdID0gdHJ1ZTsgICAgIC8vIGFzc3VtZSBgY3R4LmV4cGAgaXMgYHRydWVgXG4gKiAgIGxWaWV3WzEwICsgMV0gPSB0cnVlOyAvLyBKdXN0IG5vcm1hbGl6ZWQgYGxWaWV3WzEwXWBcbiAqIGBgYFxuICogU28gd2hlbiB0aGUgZnVuY3Rpb24gaXMgcmVzb2x2aW5nIHN0eWxpbmcgdmFsdWUsIGl0IGZpcnN0IG5lZWRzIHRvIGxvb2sgaW50byB0aGUgbGlua2VkIGxpc3RcbiAqICh0aGVyZSBpcyBub25lKSBhbmQgdGhhbiBpbnRvIGBUTm9kZS5yZXNpZHVhbENsYXNzYCAoVE5vZGUucmVzaWR1YWxTdHlsZSkgd2hpY2ggY29udGFpbnNcbiAqIGBgYFxuICogICB0Tm9kZS5yZXNpZHVhbENsYXNzID0gW1xuICogICAgICdURU1QTEFURSc6IHRydWUsXG4gKiAgIF07XG4gKiBgYGBcbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgaXQgaXMgc2FmZSB0byBhZGQgY2xhc3MuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVFN0eWxpbmdTdGF0aWMgZXh0ZW5kcyBLZXlWYWx1ZUFycmF5PGFueT4ge31cblxuLyoqXG4gKiBUaGlzIGlzIGEgYnJhbmRlZCBudW1iZXIgd2hpY2ggY29udGFpbnMgcHJldmlvdXMgYW5kIG5leHQgaW5kZXguXG4gKlxuICogV2hlbiB3ZSBjb21lIGFjcm9zcyBzdHlsaW5nIGluc3RydWN0aW9ucyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBgVFN0eWxpbmdLZXlgIGluIHRoZSBjb3JyZWN0XG4gKiBvcmRlciBzbyB0aGF0IHdlIGNhbiByZS1jb25jYXRlbmF0ZSB0aGUgc3R5bGluZyB2YWx1ZSBpbiB0aGUgZGVzaXJlZCBwcmlvcml0eS5cbiAqXG4gKiBUaGUgaW5zZXJ0aW9uIGNhbiBoYXBwZW4gZWl0aGVyIGF0IHRoZTpcbiAqIC0gZW5kIG9mIHRlbXBsYXRlIGFzIGluIHRoZSBjYXNlIG9mIGNvbWluZyBhY3Jvc3MgYWRkaXRpb25hbCBzdHlsaW5nIGluc3RydWN0aW9uIGluIHRoZSB0ZW1wbGF0ZVxuICogLSBpbiBmcm9udCBvZiB0aGUgdGVtcGxhdGUgaW4gdGhlIGNhc2Ugb2YgY29taW5nIGFjcm9zcyBhZGRpdGlvbmFsIGluc3RydWN0aW9uIGluIHRoZVxuICogICBgaG9zdEJpbmRpbmdzYC5cbiAqXG4gKiBXZSB1c2UgYFRTdHlsaW5nUmFuZ2VgIHRvIHN0b3JlIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBpbmRleCBpbnRvIHRoZSBgVERhdGFgIHdoZXJlIHRoZSB0ZW1wbGF0ZVxuICogYmluZGluZ3MgY2FuIGJlIGZvdW5kLlxuICpcbiAqIC0gYml0IDAgaXMgdXNlZCB0byBtYXJrIHRoYXQgdGhlIHByZXZpb3VzIGluZGV4IGhhcyBhIGR1cGxpY2F0ZSBmb3IgY3VycmVudCB2YWx1ZS5cbiAqIC0gYml0IDEgaXMgdXNlZCB0byBtYXJrIHRoYXQgdGhlIG5leHQgaW5kZXggaGFzIGEgZHVwbGljYXRlIGZvciB0aGUgY3VycmVudCB2YWx1ZS5cbiAqIC0gYml0cyAyLTE2IGFyZSB1c2VkIHRvIGVuY29kZSB0aGUgbmV4dC90YWlsIG9mIHRoZSB0ZW1wbGF0ZS5cbiAqIC0gYml0cyAxNy0zMiBhcmUgdXNlZCB0byBlbmNvZGUgdGhlIHByZXZpb3VzL2hlYWQgb2YgdGVtcGxhdGUuXG4gKlxuICogTk9ERTogKmR1cGxpY2F0ZSogZmFsc2UgaW1wbGllcyB0aGF0IGl0IGlzIHN0YXRpY2FsbHkga25vd24gdGhhdCB0aGlzIGJpbmRpbmcgd2lsbCBub3QgY29sbGlkZVxuICogd2l0aCBvdGhlciBiaW5kaW5ncyBhbmQgdGhlcmVmb3JlIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2hlY2sgb3RoZXIgYmluZGluZ3MuIEZvciBleGFtcGxlIHRoZVxuICogYmluZGluZ3MgaW4gYDxkaXYgW3N0eWxlLmNvbG9yXT1cImV4cFwiIFtzdHlsZS53aWR0aF09XCJleHBcIj5gIHdpbGwgbmV2ZXIgY29sbGlkZSBhbmQgd2lsbCBoYXZlXG4gKiB0aGVpciBiaXRzIHNldCBhY2NvcmRpbmdseS4gUHJldmlvdXMgZHVwbGljYXRlIG1lYW5zIHRoYXQgd2UgbWF5IG5lZWQgdG8gY2hlY2sgcHJldmlvdXMgaWYgdGhlXG4gKiBjdXJyZW50IGJpbmRpbmcgaXMgYG51bGxgLiBOZXh0IGR1cGxpY2F0ZSBtZWFucyB0aGF0IHdlIG1heSBuZWVkIHRvIGNoZWNrIG5leHQgYmluZGluZ3MgaWYgdGhlXG4gKiBjdXJyZW50IGJpbmRpbmcgaXMgbm90IGBudWxsYC5cbiAqXG4gKiBOT1RFOiBgMGAgaGFzIHNwZWNpYWwgc2lnbmlmaWNhbmNlIGFuZCByZXByZXNlbnRzIGBudWxsYCBhcyBpbiBubyBhZGRpdGlvbmFsIHBvaW50ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVFN0eWxpbmdSYW5nZSB7XG4gIF9fYnJhbmRfXzogJ1RTdHlsaW5nUmFuZ2UnO1xufVxuXG4vKipcbiAqIFNoaWZ0IGFuZCBtYXNrcyBjb25zdGFudHMgZm9yIGVuY29kaW5nIHR3byBudW1iZXJzIGludG8gYW5kIGR1cGxpY2F0ZSBpbmZvIGludG8gYSBzaW5nbGUgbnVtYmVyLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBTdHlsaW5nUmFuZ2Uge1xuICAvLy8gTnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQgZm9yIHRoZSBwcmV2aW91cyBwb2ludGVyXG4gIFBSRVZfU0hJRlQgPSAxNyxcbiAgLy8vIFByZXZpb3VzIHBvaW50ZXIgbWFzay5cbiAgUFJFVl9NQVNLID0gMHhGRkZFMDAwMCxcblxuICAvLy8gTnVtYmVyIG9mIGJpdHMgdG8gc2hpZnQgZm9yIHRoZSBuZXh0IHBvaW50ZXJcbiAgTkVYVF9TSElGVCA9IDIsXG4gIC8vLyBOZXh0IHBvaW50ZXIgbWFzay5cbiAgTkVYVF9NQVNLID0gMHgwMDFGRkZDLFxuXG4gIC8vIE1hc2sgdG8gcmVtb3ZlIG5hZ2F0aXZlIGJpdC4gKGludGVycHJldCBudW1iZXIgYXMgcG9zaXRpdmUpXG4gIFVOU0lHTkVEX01BU0sgPSAweDdGRkYsXG5cbiAgLyoqXG4gICAqIFRoaXMgYml0IGlzIHNldCBpZiB0aGUgcHJldmlvdXMgYmluZGluZ3MgY29udGFpbnMgYSBiaW5kaW5nIHdoaWNoIGNvdWxkIHBvc3NpYmx5IGNhdXNlIGFcbiAgICogZHVwbGljYXRlLiBGb3IgZXhhbXBsZTogYDxkaXYgW3N0eWxlXT1cIm1hcFwiIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiPmAsIHRoZSBgd2lkdGhgIGJpbmRpbmcgd2lsbFxuICAgKiBoYXZlIHByZXZpb3VzIGR1cGxpY2F0ZSBzZXQuIFRoZSBpbXBsaWNhdGlvbiBpcyB0aGF0IGlmIGB3aWR0aGAgYmluZGluZyBiZWNvbWVzIGBudWxsYCwgaXQgaXNcbiAgICogbmVjZXNzYXJ5IHRvIGRlZmVyIHRoZSB2YWx1ZSB0byBgbWFwLndpZHRoYC4gKEJlY2F1c2UgYHdpZHRoYCBvdmVyd3JpdGVzIGBtYXAud2lkdGhgLilcbiAgICovXG4gIFBSRVZfRFVQTElDQVRFID0gMHgwMixcblxuICAvKipcbiAgICogVGhpcyBiaXQgaXMgc2V0IHRvIGlmIHRoZSBuZXh0IGJpbmRpbmcgY29udGFpbnMgYSBiaW5kaW5nIHdoaWNoIGNvdWxkIHBvc3NpYmx5IGNhdXNlIGFcbiAgICogZHVwbGljYXRlLiBGb3IgZXhhbXBsZTogYDxkaXYgW3N0eWxlXT1cIm1hcFwiIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiPmAsIHRoZSBgbWFwYCBiaW5kaW5nIHdpbGxcbiAgICogaGF2ZSBuZXh0IGR1cGxpY2F0ZSBzZXQuIFRoZSBpbXBsaWNhdGlvbiBpcyB0aGF0IGlmIGBtYXAud2lkdGhgIGJpbmRpbmcgYmVjb21lcyBub3QgYG51bGxgLCBpdFxuICAgKiBpcyBuZWNlc3NhcnkgdG8gZGVmZXIgdGhlIHZhbHVlIHRvIGB3aWR0aGAuIChCZWNhdXNlIGB3aWR0aGAgb3ZlcndyaXRlcyBgbWFwLndpZHRoYC4pXG4gICAqL1xuICBORVhUX0RVUExJQ0FURSA9IDB4MDEsXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVFN0eWxpbmdSYW5nZShwcmV2OiBudW1iZXIsIG5leHQ6IG51bWJlcik6IFRTdHlsaW5nUmFuZ2Uge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVySW5SYW5nZShwcmV2LCAwLCBTdHlsaW5nUmFuZ2UuVU5TSUdORURfTUFTSyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXJJblJhbmdlKG5leHQsIDAsIFN0eWxpbmdSYW5nZS5VTlNJR05FRF9NQVNLKTtcbiAgcmV0dXJuIChwcmV2IDw8IFN0eWxpbmdSYW5nZS5QUkVWX1NISUZUIHwgbmV4dCA8PCBTdHlsaW5nUmFuZ2UuTkVYVF9TSElGVCkgYXMgYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFN0eWxpbmdSYW5nZVByZXYodFN0eWxpbmdSYW5nZTogVFN0eWxpbmdSYW5nZSk6IG51bWJlciB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICByZXR1cm4gKCh0U3R5bGluZ1JhbmdlIGFzIGFueSBhcyBudW1iZXIpID4+IFN0eWxpbmdSYW5nZS5QUkVWX1NISUZUKSAmIFN0eWxpbmdSYW5nZS5VTlNJR05FRF9NQVNLO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFN0eWxpbmdSYW5nZVByZXZEdXBsaWNhdGUodFN0eWxpbmdSYW5nZTogVFN0eWxpbmdSYW5nZSk6IGJvb2xlYW4ge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHRTdHlsaW5nUmFuZ2UsICdleHBlY3RlZCBudW1iZXInKTtcbiAgcmV0dXJuICgodFN0eWxpbmdSYW5nZSBhcyBhbnkgYXMgbnVtYmVyKSAmIFN0eWxpbmdSYW5nZS5QUkVWX0RVUExJQ0FURSkgPT1cbiAgICAgIFN0eWxpbmdSYW5nZS5QUkVWX0RVUExJQ0FURTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRTdHlsaW5nUmFuZ2VQcmV2KFxuICAgIHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UsIHByZXZpb3VzOiBudW1iZXIpOiBUU3R5bGluZ1JhbmdlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXJJblJhbmdlKHByZXZpb3VzLCAwLCBTdHlsaW5nUmFuZ2UuVU5TSUdORURfTUFTSyk7XG4gIHJldHVybiAoKCh0U3R5bGluZ1JhbmdlIGFzIGFueSBhcyBudW1iZXIpICYgflN0eWxpbmdSYW5nZS5QUkVWX01BU0spIHxcbiAgICAgICAgICAocHJldmlvdXMgPDwgU3R5bGluZ1JhbmdlLlBSRVZfU0hJRlQpKSBhcyBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUU3R5bGluZ1JhbmdlUHJldkR1cGxpY2F0ZSh0U3R5bGluZ1JhbmdlOiBUU3R5bGluZ1JhbmdlKTogVFN0eWxpbmdSYW5nZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICByZXR1cm4gKCh0U3R5bGluZ1JhbmdlIGFzIGFueSBhcyBudW1iZXIpIHwgU3R5bGluZ1JhbmdlLlBSRVZfRFVQTElDQVRFKSBhcyBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUU3R5bGluZ1JhbmdlTmV4dCh0U3R5bGluZ1JhbmdlOiBUU3R5bGluZ1JhbmdlKTogbnVtYmVyIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIHJldHVybiAoKHRTdHlsaW5nUmFuZ2UgYXMgYW55IGFzIG51bWJlcikgJiBTdHlsaW5nUmFuZ2UuTkVYVF9NQVNLKSA+PiBTdHlsaW5nUmFuZ2UuTkVYVF9TSElGVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRTdHlsaW5nUmFuZ2VOZXh0KHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UsIG5leHQ6IG51bWJlcik6IFRTdHlsaW5nUmFuZ2Uge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHRTdHlsaW5nUmFuZ2UsICdleHBlY3RlZCBudW1iZXInKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlckluUmFuZ2UobmV4dCwgMCwgU3R5bGluZ1JhbmdlLlVOU0lHTkVEX01BU0spO1xuICByZXR1cm4gKCgodFN0eWxpbmdSYW5nZSBhcyBhbnkgYXMgbnVtYmVyKSAmIH5TdHlsaW5nUmFuZ2UuTkVYVF9NQVNLKSB8ICAvL1xuICAgICAgICAgIG5leHQgPDwgU3R5bGluZ1JhbmdlLk5FWFRfU0hJRlQpIGFzIGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRTdHlsaW5nUmFuZ2VOZXh0RHVwbGljYXRlKHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UpOiBib29sZWFuIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIHJldHVybiAoKHRTdHlsaW5nUmFuZ2UgYXMgYW55IGFzIG51bWJlcikgJiBTdHlsaW5nUmFuZ2UuTkVYVF9EVVBMSUNBVEUpID09PVxuICAgICAgU3R5bGluZ1JhbmdlLk5FWFRfRFVQTElDQVRFO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VFN0eWxpbmdSYW5nZU5leHREdXBsaWNhdGUodFN0eWxpbmdSYW5nZTogVFN0eWxpbmdSYW5nZSk6IFRTdHlsaW5nUmFuZ2Uge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHRTdHlsaW5nUmFuZ2UsICdleHBlY3RlZCBudW1iZXInKTtcbiAgcmV0dXJuICgodFN0eWxpbmdSYW5nZSBhcyBhbnkgYXMgbnVtYmVyKSB8IFN0eWxpbmdSYW5nZS5ORVhUX0RVUExJQ0FURSkgYXMgYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFN0eWxpbmdSYW5nZVRhaWwodFN0eWxpbmdSYW5nZTogVFN0eWxpbmdSYW5nZSk6IG51bWJlciB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICBjb25zdCBuZXh0ID0gZ2V0VFN0eWxpbmdSYW5nZU5leHQodFN0eWxpbmdSYW5nZSk7XG4gIHJldHVybiBuZXh0ID09PSAwID8gZ2V0VFN0eWxpbmdSYW5nZVByZXYodFN0eWxpbmdSYW5nZSkgOiBuZXh0O1xufSJdfQ==