/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/i18n/localization.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getLocalePluralCase } from './locale_data_api';
/**
 * Returns the plural case based on the locale
 * @param {?} value
 * @param {?} locale
 * @return {?}
 */
export function getPluralCase(value, locale) {
    /** @type {?} */
    const plural = getLocalePluralCase(locale)(value);
    switch (plural) {
        case 0:
            return 'zero';
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'few';
        case 4:
            return 'many';
        default:
            return 'other';
    }
}
/**
 * The locale id that the application is using by default (for translations and ICU expressions).
 * @type {?}
 */
export const DEFAULT_LOCALE_ID = 'en-US';
/**
 * USD currency code that the application uses by default for CurrencyPipe when no
 * DEFAULT_CURRENCY_CODE is provided.
 * @type {?}
 */
export const USD_CURRENCY_CODE = 'USD';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvaTE4bi9sb2NhbGl6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFLdEQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFVLEVBQUUsTUFBYzs7VUFDaEQsTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVqRCxRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssQ0FBQztZQUNKLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLEtBQUssQ0FBQztZQUNKLE9BQU8sS0FBSyxDQUFDO1FBQ2YsS0FBSyxDQUFDO1lBQ0osT0FBTyxLQUFLLENBQUM7UUFDZixLQUFLLENBQUM7WUFDSixPQUFPLEtBQUssQ0FBQztRQUNmLEtBQUssQ0FBQztZQUNKLE9BQU8sTUFBTSxDQUFDO1FBQ2hCO1lBQ0UsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFDSCxDQUFDOzs7OztBQUtELE1BQU0sT0FBTyxpQkFBaUIsR0FBRyxPQUFPOzs7Ozs7QUFNeEMsTUFBTSxPQUFPLGlCQUFpQixHQUFHLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2V0TG9jYWxlUGx1cmFsQ2FzZX0gZnJvbSAnLi9sb2NhbGVfZGF0YV9hcGknO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHBsdXJhbCBjYXNlIGJhc2VkIG9uIHRoZSBsb2NhbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdXJhbENhc2UodmFsdWU6IGFueSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBwbHVyYWwgPSBnZXRMb2NhbGVQbHVyYWxDYXNlKGxvY2FsZSkodmFsdWUpO1xuXG4gIHN3aXRjaCAocGx1cmFsKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuICd6ZXJvJztcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gJ29uZSc7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuICd0d28nO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAnZmV3JztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gJ21hbnknO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJ290aGVyJztcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsb2NhbGUgaWQgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgdXNpbmcgYnkgZGVmYXVsdCAoZm9yIHRyYW5zbGF0aW9ucyBhbmQgSUNVIGV4cHJlc3Npb25zKS5cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9DQUxFX0lEID0gJ2VuLVVTJztcblxuLyoqXG4gKiBVU0QgY3VycmVuY3kgY29kZSB0aGF0IHRoZSBhcHBsaWNhdGlvbiB1c2VzIGJ5IGRlZmF1bHQgZm9yIEN1cnJlbmN5UGlwZSB3aGVuIG5vXG4gKiBERUZBVUxUX0NVUlJFTkNZX0NPREUgaXMgcHJvdmlkZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBVU0RfQ1VSUkVOQ1lfQ09ERSA9ICdVU0QnO1xuIl19