/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
System.register("@progress/kendo-angular-l10n",["tslib","rxjs","@angular/core","rxjs/operators"],function(o){var s,c,u,a;function e(t){return t.__useDefault?t.default:t}return{setters:[function(t){s=e(t)},function(t){c=e(t)},function(t){u=e(t)},function(t){a=e(t)}],execute:function(){function r(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,i;i={},r.m=n=[function(t,e){t.exports=u},function(t,e){t.exports=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n=n(0);e.RTL=new n.InjectionToken("Kendo UI Right-to-Left token")},function(t,e){t.exports=a},function(t,e){t.exports=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(0),o=n(4),i=(s.prototype.notify=function(t){this.changes.next({rtl:t})},s.prototype.get=function(t){},r.__decorate([i.Injectable()],s));function s(){this.changes=new o.Subject}e.MessageService=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(0),o=n(5),s=n(2),c=n(4),u=n(3);e.L10N_PREFIX=new i.InjectionToken("Localization key prefix");Object.defineProperty(a.prototype,"rtl",{get:function(){return this._rtl},enumerable:!0,configurable:!0}),a.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe()},a.prototype.get=function(t){t=this.key(t);return this.dictionary[t]},a.prototype.register=function(t,e,n){void 0===n&&(n=!1);var r=this.key(t),t=e;if(!n){if(this.dictionary.hasOwnProperty(r))return;t=this.defaultValue(r,e)}this.dictionary[r]=t},a.prototype.notifyChanges=function(){this.changes.next({rtl:this.rtl})},a.prototype.key=function(t){return this.prefix+"."+t},a.prototype.defaultValue=function(t,e){if(!this.messageService)return e;t=this.messageService.get(t);return void 0===t?e:t},o=r.__decorate([i.Injectable(),r.__param(0,i.Inject(e.L10N_PREFIX)),r.__param(1,i.Optional()),r.__param(2,i.Optional()),r.__param(2,i.Inject(s.RTL)),r.__metadata("design:paramtypes",[String,o.MessageService,Boolean])],a);function a(t,e,n){var r=this;this.prefix=t,this.messageService=e,this._rtl=n,this.changes=new c.BehaviorSubject({rtl:this._rtl}),this.dictionary={},e&&(this.subscription=e.changes.pipe(u.map(function(t){t=t.rtl;return void 0!==t?t:r._rtl}),u.tap(function(t){return r._rtl=t})).subscribe(function(t){r.dictionary={},r.changes.next({rtl:t})}))}e.LocalizationService=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),n=(Object.defineProperty(i.prototype,"override",{get:function(){return!1},enumerable:!0,configurable:!0}),i.prototype.ngOnChanges=function(e){this.register(e),Object.keys(e).some(function(t){return!e[t].isFirstChange()})&&this.service.notifyChanges()},i.prototype.ngOnInit=function(){var t=this;this.subscription=this.service.changes.pipe(r.skip(1)).subscribe(function(){return t.register(t)})},i.prototype.register=function(t){var e=this;Object.keys(t).forEach(function(t){return e.service.register(t,e[t],e.override)})},i.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe()},i);function i(){}e.ComponentMessages=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);r.__exportStar(n(5),e),r.__exportStar(n(7),e),r.__exportStar(n(6),e),r.__exportStar(n(2),e),function(t){for(var e in t)o(e,t[e])}(e)}],r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=8)}}});