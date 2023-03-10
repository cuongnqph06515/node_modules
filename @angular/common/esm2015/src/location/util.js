/**
 * @fileoverview added by tsickle
 * Generated from: packages/common/src/location/util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Joins two parts of a URL with a slash if needed.
 *
 * @param {?} start  URL string
 * @param {?} end    URL string
 *
 *
 * @return {?} The joined URL string.
 */
export function joinWithSlash(start, end) {
    if (start.length == 0) {
        return end;
    }
    if (end.length == 0) {
        return start;
    }
    /** @type {?} */
    let slashes = 0;
    if (start.endsWith('/')) {
        slashes++;
    }
    if (end.startsWith('/')) {
        slashes++;
    }
    if (slashes == 2) {
        return start + end.substring(1);
    }
    if (slashes == 1) {
        return start + end;
    }
    return start + '/' + end;
}
/**
 * Removes a trailing slash from a URL string if needed.
 * Looks for the first occurrence of either `#`, `?`, or the end of the
 * line as `/` characters and removes the trailing slash if one exists.
 *
 * @param {?} url URL string.
 *
 * @return {?} The URL string, modified if needed.
 */
export function stripTrailingSlash(url) {
    /** @type {?} */
    const match = url.match(/#|\?|$/);
    /** @type {?} */
    const pathEndIdx = match && match.index || url.length;
    /** @type {?} */
    const droppedSlashIdx = pathEndIdx - (url[pathEndIdx - 1] === '/' ? 1 : 0);
    return url.slice(0, droppedSlashIdx) + url.slice(pathEndIdx);
}
/**
 * Normalizes URL parameters by prepending with `?` if needed.
 *
 * @param {?} params String of URL parameters.
 *
 * @return {?} The normalized URL parameters string.
 */
export function normalizeQueryParams(params) {
    return params && params[0] !== '?' ? '?' + params : params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvbG9jYXRpb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFhLEVBQUUsR0FBVztJQUN0RCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1FBQ0csT0FBTyxHQUFHLENBQUM7SUFDZixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN2QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7SUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7UUFDaEIsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUMzQixDQUFDOzs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVc7O1VBQ3RDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7VUFDM0IsVUFBVSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNOztVQUMvQyxlQUFlLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvRCxDQUFDOzs7Ozs7OztBQVNELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxNQUFjO0lBQ2pELE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUM3RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbi8qKlxuICogSm9pbnMgdHdvIHBhcnRzIG9mIGEgVVJMIHdpdGggYSBzbGFzaCBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHN0YXJ0ICBVUkwgc3RyaW5nXG4gKiBAcGFyYW0gZW5kICAgIFVSTCBzdHJpbmdcbiAqXG4gKlxuICogQHJldHVybnMgVGhlIGpvaW5lZCBVUkwgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gam9pbldpdGhTbGFzaChzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChzdGFydC5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybiBlbmQ7XG4gIH1cbiAgaWYgKGVuZC5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybiBzdGFydDtcbiAgfVxuICBsZXQgc2xhc2hlcyA9IDA7XG4gIGlmIChzdGFydC5lbmRzV2l0aCgnLycpKSB7XG4gICAgc2xhc2hlcysrO1xuICB9XG4gIGlmIChlbmQuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgc2xhc2hlcysrO1xuICB9XG4gIGlmIChzbGFzaGVzID09IDIpIHtcbiAgICByZXR1cm4gc3RhcnQgKyBlbmQuc3Vic3RyaW5nKDEpO1xuICB9XG4gIGlmIChzbGFzaGVzID09IDEpIHtcbiAgICByZXR1cm4gc3RhcnQgKyBlbmQ7XG4gIH1cbiAgcmV0dXJuIHN0YXJ0ICsgJy8nICsgZW5kO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYSB0cmFpbGluZyBzbGFzaCBmcm9tIGEgVVJMIHN0cmluZyBpZiBuZWVkZWQuXG4gKiBMb29rcyBmb3IgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgZWl0aGVyIGAjYCwgYD9gLCBvciB0aGUgZW5kIG9mIHRoZVxuICogbGluZSBhcyBgL2AgY2hhcmFjdGVycyBhbmQgcmVtb3ZlcyB0aGUgdHJhaWxpbmcgc2xhc2ggaWYgb25lIGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0gdXJsIFVSTCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMgVGhlIFVSTCBzdHJpbmcsIG1vZGlmaWVkIGlmIG5lZWRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKC8jfFxcP3wkLyk7XG4gIGNvbnN0IHBhdGhFbmRJZHggPSBtYXRjaCAmJiBtYXRjaC5pbmRleCB8fCB1cmwubGVuZ3RoO1xuICBjb25zdCBkcm9wcGVkU2xhc2hJZHggPSBwYXRoRW5kSWR4IC0gKHVybFtwYXRoRW5kSWR4IC0gMV0gPT09ICcvJyA/IDEgOiAwKTtcbiAgcmV0dXJuIHVybC5zbGljZSgwLCBkcm9wcGVkU2xhc2hJZHgpICsgdXJsLnNsaWNlKHBhdGhFbmRJZHgpO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgVVJMIHBhcmFtZXRlcnMgYnkgcHJlcGVuZGluZyB3aXRoIGA/YCBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtICBwYXJhbXMgU3RyaW5nIG9mIFVSTCBwYXJhbWV0ZXJzLlxuICpcbiAqIEByZXR1cm5zIFRoZSBub3JtYWxpemVkIFVSTCBwYXJhbWV0ZXJzIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVF1ZXJ5UGFyYW1zKHBhcmFtczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhcmFtcyAmJiBwYXJhbXNbMF0gIT09ICc/JyA/ICc/JyArIHBhcmFtcyA6IHBhcmFtcztcbn1cbiJdfQ==