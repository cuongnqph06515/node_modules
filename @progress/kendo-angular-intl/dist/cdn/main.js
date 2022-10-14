/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("tslib"),require("@angular/core"),require("@telerik/kendo-intl")):"function"==typeof define&&define.amd?define(["tslib","@angular/core","@telerik/kendo-intl"],t):"object"==typeof exports?exports.KendoAngularIntl=t(require("tslib"),require("@angular/core"),require("@telerik/kendo-intl")):e.KendoAngularIntl=t(e.tslib,e["@angular/core"],e["@telerik/kendo-intl"])}(window,(function(e,t,r){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=r(1),a=r(3),i=/_/g;function u(e){return new c(e)}t.cldrServiceFactory=u;var l=function(){function e(){this.changes=new n.EventEmitter}return e.prototype.notify=function(){this.changes.emit()},e=o.__decorate([n.Injectable({providedIn:"root",useFactory:u,deps:[n.LOCALE_ID]})],e)}();t.IntlService=l;var c=function(e){function t(t){var r=e.call(this)||this;return r.localeId=t,r}return o.__extends(t,e),Object.defineProperty(t.prototype,"localeId",{get:function(){return this.locale},set:function(e){var t=e.replace(i,"-");t!==this.locale&&(this.locale=t,this.notify())},enumerable:!0,configurable:!0}),t.prototype.format=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return a.format(e,t,this.localeId)},t.prototype.toString=function(e,t,r){return a.toString(e,t,r||this.localeId)},t.prototype.formatDate=function(e,t,r){return a.formatDate(e,t,r||this.localeId)},t.prototype.parseDate=function(e,t,r){return a.parseDate(e,t,r||this.localeId)},t.prototype.parseNumber=function(e,t,r){return a.parseNumber(e,r||this.localeId,t)},t.prototype.formatNumber=function(e,t,r){return a.formatNumber(e,t,r||this.localeId)},t.prototype.dateFieldName=function(e,t){return a.dateFieldName(e,t||this.localeId)},t.prototype.dateFormatNames=function(e,t){return a.dateFormatNames(t||this.localeId,e)},t.prototype.splitDateFormat=function(e,t){return a.splitDateFormat(e,t||this.localeId)},t.prototype.numberSymbols=function(e){return a.numberSymbols(e||this.localeId)},t.prototype.firstDay=function(e){return a.firstDay(e||this.localeId)},t.prototype.weekendRange=function(e){return a.weekendRange(e||this.localeId)},t=o.__decorate([n.Injectable(),o.__param(0,n.Inject(n.LOCALE_ID)),o.__metadata("design:paramtypes",[String])],t)}(l);t.CldrIntlService=c},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(7),n=r(8);function a(e){var t=e.message,r=n.errorSolutions[Object.keys(n.errorSolutions).filter((function(e){return 0===t.indexOf(e)}))[0]];return r?t+" "+r:t}function i(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];try{return e.apply(null,t)}catch(e){throw e.message=a(e),e}}}t.dateFormatNames=i(o.dateFormatNames),t.dateFieldName=i(o.dateFieldName),t.firstDay=i(o.firstDay),t.format=i(o.format),t.formatDate=i(o.formatDate),t.formatNumber=i(o.formatNumber),t.load=i(o.load),t.numberSymbols=i(o.numberSymbols),t.parseDate=i(o.parseDate),t.parseNumber=i(o.parseNumber),t.splitDateFormat=i(o.splitDateFormat),t.toString=i(o.toString),t.weekendRange=i(o.weekendRange),t.setData=function(e){return o.setData(e)},t.localeData=function(e){try{return o.localeInfo(e)}catch(e){throw e.message=a(e),e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=r(1),a=r(2),i=function(){function e(e){this.intlService=e}return e.prototype.transform=function(e,t,r){return void 0===t&&(t=""),(e=this.normalize(e))?this.intlService.formatDate(e,t,r):e},e.prototype.normalize=function(e){return e&&"string"==typeof e?e=this.intlService.parseDate(e):e&&function(e){return!isNaN(e-parseFloat(e))}(e)&&(e=new Date(parseFloat(e))),e},e=o.__decorate([n.Pipe({name:"kendoDate"}),o.__metadata("design:paramtypes",[a.IntlService])],e)}();t.DatePipe=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=r(1),a=r(2),i=function(){function e(e){this.intlService=e}return e.prototype.transform=function(e,t,r){return"string"==typeof e&&(e=this.intlService.parseNumber(e)),null!=e?this.intlService.formatNumber(e,t,r):e},e=o.__decorate([n.Pipe({name:"kendoNumber"}),o.__metadata("design:paramtypes",[a.IntlService])],e)}();t.NumberPipe=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0);o.__exportStar(r(2),t),o.__exportStar(r(4),t),o.__exportStar(r(5),t),o.__exportStar(r(9),t),o.__exportStar(r(3),t)},function(e,t){e.exports=r},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="http://www.telerik.com/kendo-angular-ui/components/internationalization/troubleshooting/";t.errorSolutions={NoCurrency:"Solution: "+o+"#toc-no-currency",NoCurrencyDisplay:"Solution: "+o+"#toc-no-currency-display",NoCurrencyRegion:"Solution: "+o+"#toc-no-currency-region",NoDateFieldNames:"Solution: "+o+"#toc-no-date-filed-names",NoFirstDay:"Solution: "+o+"#toc-no-first-day",NoGMTInfo:"Solution: "+o+"#toc-no-gmt-info",NoLocale:"Solution: "+o+"#toc-no-locale",NoValidCurrency:"Solution: "+o+"#toc-no-valid-currency",NoWeekData:"Solution: "+o+"#toc-no-week-data"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),n=r(1),a=r(4),i=r(5),u=[a.DatePipe,i.NumberPipe],l=function(){function e(){}return e=o.__decorate([n.NgModule({declarations:[u],exports:[u]})],e)}();t.IntlModule=l}])}));