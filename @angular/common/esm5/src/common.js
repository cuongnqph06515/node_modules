/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
export * from './private_export';
export * from './location/index';
export { formatDate } from './i18n/format_date';
export { formatCurrency, formatNumber, formatPercent } from './i18n/format_number';
export { NgLocaleLocalization, NgLocalization } from './i18n/localization';
export { registerLocaleData } from './i18n/locale_data';
export { Plural, NumberFormatStyle, FormStyle, TranslationWidth, FormatWidth, NumberSymbol, WeekDay, getNumberOfCurrencyDigits, getCurrencySymbol, getLocaleDayPeriods, getLocaleDayNames, getLocaleMonthNames, getLocaleId, getLocaleEraNames, getLocaleWeekEndRange, getLocaleFirstDayOfWeek, getLocaleDateFormat, getLocaleDateTimeFormat, getLocaleExtraDayPeriodRules, getLocaleExtraDayPeriods, getLocalePluralCase, getLocaleTimeFormat, getLocaleNumberSymbol, getLocaleNumberFormat, getLocaleCurrencyCode, getLocaleCurrencyName, getLocaleCurrencySymbol, getLocaleDirection } from './i18n/locale_data_api';
export { parseCookieValue as ɵparseCookieValue } from './cookie';
export { CommonModule } from './common_module';
export { NgClass, NgForOf, NgForOfContext, NgIf, NgIfContext, NgPlural, NgPluralCase, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, NgComponentOutlet } from './directives/index';
export { DOCUMENT } from './dom_tokens';
export { AsyncPipe, DatePipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, LowerCasePipe, CurrencyPipe, DecimalPipe, PercentPipe, SlicePipe, UpperCasePipe, TitleCasePipe, KeyValuePipe } from './pipes/index';
export { PLATFORM_BROWSER_ID as ɵPLATFORM_BROWSER_ID, PLATFORM_SERVER_ID as ɵPLATFORM_SERVER_ID, PLATFORM_WORKER_APP_ID as ɵPLATFORM_WORKER_APP_ID, PLATFORM_WORKER_UI_ID as ɵPLATFORM_WORKER_UI_ID, isPlatformBrowser, isPlatformServer, isPlatformWorkerApp, isPlatformWorkerUi } from './platform_id';
export { VERSION } from './version';
export { ViewportScroller, NullViewportScroller as ɵNullViewportScroller } from './viewport_scroller';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7R0FJRztBQUNILGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakYsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFRLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSw0QkFBNEIsRUFBRSx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVsQixPQUFPLEVBQUMsZ0JBQWdCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdE0sT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3BOLE9BQU8sRUFBQyxtQkFBbUIsSUFBSSxvQkFBb0IsRUFBRSxrQkFBa0IsSUFBSSxtQkFBbUIsRUFBRSxzQkFBc0IsSUFBSSx1QkFBdUIsRUFBRSxxQkFBcUIsSUFBSSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2UyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsSUFBSSxxQkFBcUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBwdWJsaWMgQVBJcyBvZiB0aGUgY29tbW9uIHBhY2thZ2UuXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vcHJpdmF0ZV9leHBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9sb2NhdGlvbi9pbmRleCc7XG5leHBvcnQge2Zvcm1hdERhdGV9IGZyb20gJy4vaTE4bi9mb3JtYXRfZGF0ZSc7XG5leHBvcnQge2Zvcm1hdEN1cnJlbmN5LCBmb3JtYXROdW1iZXIsIGZvcm1hdFBlcmNlbnR9IGZyb20gJy4vaTE4bi9mb3JtYXRfbnVtYmVyJztcbmV4cG9ydCB7TmdMb2NhbGVMb2NhbGl6YXRpb24sIE5nTG9jYWxpemF0aW9ufSBmcm9tICcuL2kxOG4vbG9jYWxpemF0aW9uJztcbmV4cG9ydCB7cmVnaXN0ZXJMb2NhbGVEYXRhfSBmcm9tICcuL2kxOG4vbG9jYWxlX2RhdGEnO1xuZXhwb3J0IHtQbHVyYWwsIE51bWJlckZvcm1hdFN0eWxlLCBGb3JtU3R5bGUsIFRpbWUsIFRyYW5zbGF0aW9uV2lkdGgsIEZvcm1hdFdpZHRoLCBOdW1iZXJTeW1ib2wsIFdlZWtEYXksIGdldE51bWJlck9mQ3VycmVuY3lEaWdpdHMsIGdldEN1cnJlbmN5U3ltYm9sLCBnZXRMb2NhbGVEYXlQZXJpb2RzLCBnZXRMb2NhbGVEYXlOYW1lcywgZ2V0TG9jYWxlTW9udGhOYW1lcywgZ2V0TG9jYWxlSWQsIGdldExvY2FsZUVyYU5hbWVzLCBnZXRMb2NhbGVXZWVrRW5kUmFuZ2UsIGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrLCBnZXRMb2NhbGVEYXRlRm9ybWF0LCBnZXRMb2NhbGVEYXRlVGltZUZvcm1hdCwgZ2V0TG9jYWxlRXh0cmFEYXlQZXJpb2RSdWxlcywgZ2V0TG9jYWxlRXh0cmFEYXlQZXJpb2RzLCBnZXRMb2NhbGVQbHVyYWxDYXNlLCBnZXRMb2NhbGVUaW1lRm9ybWF0LCBnZXRMb2NhbGVOdW1iZXJTeW1ib2wsIGdldExvY2FsZU51bWJlckZvcm1hdCwgZ2V0TG9jYWxlQ3VycmVuY3lDb2RlLCBnZXRMb2NhbGVDdXJyZW5jeU5hbWUsIGdldExvY2FsZUN1cnJlbmN5U3ltYm9sLCBnZXRMb2NhbGVEaXJlY3Rpb259IGZyb20gJy4vaTE4bi9sb2NhbGVfZGF0YV9hcGknO1xuZXhwb3J0IHtwYXJzZUNvb2tpZVZhbHVlIGFzIMm1cGFyc2VDb29raWVWYWx1ZX0gZnJvbSAnLi9jb29raWUnO1xuZXhwb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJy4vY29tbW9uX21vZHVsZSc7XG5leHBvcnQge05nQ2xhc3MsIE5nRm9yT2YsIE5nRm9yT2ZDb250ZXh0LCBOZ0lmLCBOZ0lmQ29udGV4dCwgTmdQbHVyYWwsIE5nUGx1cmFsQ2FzZSwgTmdTdHlsZSwgTmdTd2l0Y2gsIE5nU3dpdGNoQ2FzZSwgTmdTd2l0Y2hEZWZhdWx0LCBOZ1RlbXBsYXRlT3V0bGV0LCBOZ0NvbXBvbmVudE91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL2luZGV4JztcbmV4cG9ydCB7RE9DVU1FTlR9IGZyb20gJy4vZG9tX3Rva2Vucyc7XG5leHBvcnQge0FzeW5jUGlwZSwgRGF0ZVBpcGUsIEkxOG5QbHVyYWxQaXBlLCBJMThuU2VsZWN0UGlwZSwgSnNvblBpcGUsIExvd2VyQ2FzZVBpcGUsIEN1cnJlbmN5UGlwZSwgRGVjaW1hbFBpcGUsIFBlcmNlbnRQaXBlLCBTbGljZVBpcGUsIFVwcGVyQ2FzZVBpcGUsIFRpdGxlQ2FzZVBpcGUsIEtleVZhbHVlUGlwZSwgS2V5VmFsdWV9IGZyb20gJy4vcGlwZXMvaW5kZXgnO1xuZXhwb3J0IHtQTEFURk9STV9CUk9XU0VSX0lEIGFzIMm1UExBVEZPUk1fQlJPV1NFUl9JRCwgUExBVEZPUk1fU0VSVkVSX0lEIGFzIMm1UExBVEZPUk1fU0VSVkVSX0lELCBQTEFURk9STV9XT1JLRVJfQVBQX0lEIGFzIMm1UExBVEZPUk1fV09SS0VSX0FQUF9JRCwgUExBVEZPUk1fV09SS0VSX1VJX0lEIGFzIMm1UExBVEZPUk1fV09SS0VSX1VJX0lELCBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciwgaXNQbGF0Zm9ybVdvcmtlckFwcCwgaXNQbGF0Zm9ybVdvcmtlclVpfSBmcm9tICcuL3BsYXRmb3JtX2lkJztcbmV4cG9ydCB7VkVSU0lPTn0gZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCB7Vmlld3BvcnRTY3JvbGxlciwgTnVsbFZpZXdwb3J0U2Nyb2xsZXIgYXMgybVOdWxsVmlld3BvcnRTY3JvbGxlcn0gZnJvbSAnLi92aWV3cG9ydF9zY3JvbGxlcic7XG4iXX0=