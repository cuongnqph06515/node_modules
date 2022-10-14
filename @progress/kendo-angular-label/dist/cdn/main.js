/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/core"),require("tslib"),require("rxjs"),require("rxjs/operators"),require("@progress/kendo-angular-common"),require("@angular/common"),require("@angular/forms")):"function"==typeof define&&define.amd?define(["@angular/core","tslib","rxjs","rxjs/operators","@progress/kendo-angular-common","@angular/common","@angular/forms"],t):"object"==typeof exports?exports.KendoAngularLabel=t(require("@angular/core"),require("tslib"),require("rxjs"),require("rxjs/operators"),require("@progress/kendo-angular-common"),require("@angular/common"),require("@angular/forms")):e.KendoAngularLabel=t(e["@angular/core"],e.tslib,e.rxjs,e["rxjs/operators"],e["@progress/kendo-angular-common"],e["@angular/common"],e["@angular/forms"])}(window,(function(e,t,n,o,r,i,a){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=15)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t),n.d(t,"MessageService",(function(){return a})),n.d(t,"ComponentMessages",(function(){return s})),n.d(t,"L10N_PREFIX",(function(){return u})),n.d(t,"LocalizationService",(function(){return c})),n.d(t,"RTL",(function(){return l}));var o=n(0),r=n(3),i=n(4),a=function(){function e(){this.changes=new r.Subject}return e.prototype.notify=function(e){this.changes.next({rtl:e})},e.prototype.get=function(e){},e.decorators=[{type:o.Injectable}],e}(),s=function(){function e(){}return Object.defineProperty(e.prototype,"override",{get:function(){return!1},enumerable:!0,configurable:!0}),e.prototype.ngOnChanges=function(e){this.register(e),Object.keys(e).some((function(t){return!e[t].isFirstChange()}))&&this.service.notifyChanges()},e.prototype.ngOnInit=function(){var e=this;this.subscription=this.service.changes.pipe(Object(i.skip)(1)).subscribe((function(){return e.register(e)}))},e.prototype.register=function(e){var t=this;Object.keys(e).forEach((function(e){return t.service.register(e,t[e],t.override)}))},e.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe()},e}(),l=new o.InjectionToken("Kendo UI Right-to-Left token"),u=new o.InjectionToken("Localization key prefix"),c=function(){function e(e,t,n){var o=this;this.prefix=e,this.messageService=t,this._rtl=n,this.changes=new r.BehaviorSubject({rtl:this._rtl}),this.dictionary={},t&&(this.subscription=t.changes.pipe(Object(i.map)((function(e){var t=e.rtl;return void 0!==t?t:o._rtl})),Object(i.tap)((function(e){return o._rtl=e}))).subscribe((function(e){o.dictionary={},o.changes.next({rtl:e})})))}return Object.defineProperty(e.prototype,"rtl",{get:function(){return this._rtl},enumerable:!0,configurable:!0}),e.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe()},e.prototype.get=function(e){var t=this.key(e);return this.dictionary[t]},e.prototype.register=function(e,t,n){void 0===n&&(n=!1);var o=this.key(e),r=t;if(!n){if(this.dictionary.hasOwnProperty(o))return;r=this.defaultValue(o,t)}this.dictionary[o]=r},e.prototype.notifyChanges=function(){this.changes.next({rtl:this.rtl})},e.prototype.key=function(e){return this.prefix+"."+e},e.prototype.defaultValue=function(e,t){if(!this.messageService)return t;var n=this.messageService.get(e);return void 0===n?t:n},e.decorators=[{type:o.Injectable}],e.ctorParameters=function(){return[{type:String,decorators:[{type:o.Inject,args:[u]}]},{type:a,decorators:[{type:o.Optional}]},{type:Boolean,decorators:[{type:o.Optional},{type:o.Inject,args:[l]}]}]},e}()},function(e,t){e.exports=n},function(e,t){e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(7),i=n(0),a=n(6),s=function(){function e(e,t,n){var o=this;this.label=e,this.renderer=t,this.zone=n,this.labelClass=!0,this.handleClick=function(){var e=o.getFocusableComponent();e&&(r.isUploadComponent(e)&&e.fileSelect.nativeElement.click(),e.focus&&e.focus(),r.shouldClickComponent(e,o.label.nativeElement)&&e.click())}}return Object.defineProperty(e.prototype,"labelFor",{get:function(){if("string"==typeof this.for)return this.for;if(!a.isDocumentAvailable())return null;var e=this.getFocusableComponent()||{};return e.focusableId||e.id||null},enumerable:!0,configurable:!0}),e.prototype.ngAfterViewInit=function(){var e=this;this.setAriaLabelledby(),this.zone.runOutsideAngular((function(){return e.clickListener=e.renderer.listen(e.label.nativeElement,"click",e.handleClick)}))},e.prototype.ngOnDestroy=function(){this.clickListener&&this.clickListener()},e.prototype.setAriaLabelledby=function(){if(a.isDocumentAvailable()){var e=this.getFocusableComponent();if(e&&e.focusableId){var t=r.getRootElement(this.label.nativeElement).querySelector("#"+e.focusableId);if(!t)return;var n=this.label.nativeElement,o=n.id||"k-"+a.guid();n.getAttribute("id")||this.renderer.setAttribute(n,"id",o),this.renderer.setAttribute(t,"aria-labelledby",o)}}},e.prototype.getFocusableComponent=function(){var e=this.for;return e&&void 0!==e.focus?e:null},o.__decorate([i.Input(),o.__metadata("design:type",Object)],e.prototype,"for",void 0),o.__decorate([i.HostBinding("attr.for"),o.__metadata("design:type",String),o.__metadata("design:paramtypes",[])],e.prototype,"labelFor",null),o.__decorate([i.HostBinding("class.k-label"),o.__metadata("design:type",Boolean)],e.prototype,"labelClass",void 0),e=o.__decorate([i.Directive({selector:"label[for]"}),o.__metadata("design:paramtypes",[i.ElementRef,i.Renderer2,i.NgZone])],e)}();t.LabelDirective=s},function(e,t){e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isUploadComponent=function(e){return e.wrapper&&"KENDO-UPLOAD"===e.wrapper.tagName},t.getNativeInputContent=function(e){return e.querySelector("kendo-label > input, kendo-label > textarea, kendo-label > select")},t.isActiveCheckboxOrRadio=function(e){return e instanceof HTMLInputElement&&/^(checkbox|radio)$/.test(e.type)&&!e.hidden},t.isNestedOrAssociated=function(e,t){return e.parentElement===t||t.hasAttribute("for")},t.shouldClickComponent=function(e,n){return t.isActiveCheckboxOrRadio(e)&&!t.isNestedOrAssociated(e,n)},t.getRootElement=function(e){if(!e)return null;for(var t=e;t.parentElement;)t=t.parentElement;return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(17),a=n(10),s=[i.LocalizedMessagesDirective,a.CustomMessagesComponent],l=function(){function e(){}return e=o.__decorate([r.NgModule({declarations:[s],exports:[s]})],e)}();t.SharedDirectivesModule=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),o.__decorate([r.Input(),o.__metadata("design:type",String)],t.prototype,"optional",void 0),t}(n(2).ComponentMessages);t.Messages=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(2),a=n(9),s=function(e){function t(t){var n=e.call(this)||this;return n.service=t,n}var n;return o.__extends(t,e),n=t,Object.defineProperty(t.prototype,"override",{get:function(){return!0},enumerable:!0,configurable:!0}),t=n=o.__decorate([r.Component({providers:[{provide:a.Messages,useExisting:r.forwardRef((function(){return n}))}],selector:"kendo-label-messages, kendo-floatinglabel-messages",template:""}),o.__metadata("design:paramtypes",[i.LocalizationService])],t)}(a.Messages);t.CustomMessagesComponent=s},function(e,t){e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(11),a=n(8),s=[n(13).FloatingLabelComponent],l=function(){function e(){}return e=o.__decorate([r.NgModule({declarations:s.slice(),exports:s.concat([a.SharedDirectivesModule]),imports:[i.CommonModule,a.SharedDirectivesModule]})],e)}();t.FloatingLabelModule=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(2),a=n(18),s=n(6),l=n(19),u=function(e){return"[object Function]"===Object.prototype.toString.call(e)},c=function(){function e(e,t,n,o){this.elementRef=e,this.renderer=t,this.changeDetectorRef=n,this.localization=o,this.hostClasses=!0,this.focused=!1,this.empty=!0,this.invalid=!1,this.labelId="k-"+s.guid(),this.autoFillStarted=!1,this.direction=o.rtl?"rtl":"ltr",this.renderer.removeAttribute(this.elementRef.nativeElement,"id")}return Object.defineProperty(e.prototype,"focusedClass",{get:function(){return this.focused},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"invalidClass",{get:function(){return this.invalid},enumerable:!0,configurable:!0}),e.prototype.ngAfterContentInit=function(){this.validateSetup();var e=new l.FloatingLabelInputAdapter(this.kendoInput||this.formControl.valueAccessor,this.formControl);this.addHandlers(e),this.setLabelFor(e)},e.prototype.ngAfterViewInit=function(){this.kendoInput&&this.setAriaLabelledby(this.kendoInput)},e.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe()},e.prototype.textFor=function(e){return this.localization.get(e)},e.prototype.subscribe=function(e,t,n){if(e[t]instanceof r.EventEmitter){var o=e[t].subscribe(n);this.subscription?this.subscription.add(o):this.subscription=o}},e.prototype.updateState=function(){var e=function(e){return 0!==e&&!1!==e&&(!(!Array.isArray(e)||e.length)||!e)},t=this.formControl;if(t){var n=t.valueAccessor;u(n.isEmpty)?this.empty=n.isEmpty():this.empty=e(t.value),this.invalid=t.invalid&&(t.touched||t.dirty)}else this.empty=u(this.kendoInput.isEmpty)?this.kendoInput.isEmpty():e(this.kendoInput.value);this.empty?this.renderer.addClass(this.elementRef.nativeElement,"k-state-empty"):this.renderer.removeClass(this.elementRef.nativeElement,"k-state-empty"),this.changeDetectorRef.markForCheck()},e.prototype.setAriaLabelledby=function(e){var t=e.focusableId||e.id;if(t){var n=this.elementRef.nativeElement.querySelector("#"+t);this.renderer.setAttribute(n,"aria-labelledby",this.labelId)}},e.prototype.setLabelFor=function(e){var t=e.focusableId||e.id;if(this.id&&t)this.id=t;else if(this.id)e.focusableId=this.id;else if(t)this.id=t;else{var n="k-"+s.guid();e.focusableId=n,this.id=n}},e.prototype.handleAutofill=function(e){var t=this;this.subscribe(e,"autoFillStart",(function(){t.autoFillStarted=!0,t.renderer.removeClass(t.elementRef.nativeElement,"k-state-empty")})),this.subscribe(e,"autoFillEnd",(function(){t.autoFillStarted&&(t.autoFillStarted=!1,t.empty&&t.renderer.addClass(t.elementRef.nativeElement,"k-state-empty"))}))},e.prototype.addHandlers=function(e){var t=this,n=function(e){return function(){t.focused=e,t.updateState()}};this.subscribe(e,"onFocus",n(!0)),this.subscribe(e,"onBlur",n(!1)),this.handleAutofill(e);var o=function(){return t.updateState()};o(),this.subscribe(e,"onValueChange",o)},e.prototype.validateSetup=function(){if(this.formControl||this.kendoInput);else if(r.isDevMode())throw new Error("The FloatingLabelComponent requires a Kendo Input component or a forms-bound component to function properly.")},o.__decorate([r.HostBinding("class.k-floating-label-container"),o.__metadata("design:type",Boolean)],e.prototype,"hostClasses",void 0),o.__decorate([r.HostBinding("class.k-state-focused"),o.__metadata("design:type",Boolean),o.__metadata("design:paramtypes",[])],e.prototype,"focusedClass",null),o.__decorate([r.HostBinding("class.k-state-invalid"),o.__metadata("design:type",Boolean),o.__metadata("design:paramtypes",[])],e.prototype,"invalidClass",null),o.__decorate([r.HostBinding("attr.dir"),o.__metadata("design:type",String)],e.prototype,"direction",void 0),o.__decorate([r.Input(),o.__metadata("design:type",String)],e.prototype,"id",void 0),o.__decorate([r.Input(),o.__metadata("design:type",String)],e.prototype,"text",void 0),o.__decorate([r.Input(),o.__metadata("design:type",Boolean)],e.prototype,"optional",void 0),o.__decorate([r.ContentChild(s.KendoInput),o.__metadata("design:type",Object)],e.prototype,"kendoInput",void 0),o.__decorate([r.ContentChild(a.NgControl),o.__metadata("design:type",a.NgControl)],e.prototype,"formControl",void 0),e=o.__decorate([r.Component({selector:"kendo-floatinglabel",exportAs:"kendoFloatingLabel",providers:[i.LocalizationService,{provide:i.L10N_PREFIX,useValue:"kendo.floatinglabel"}],template:'\n        <ng-container kendoFloatingLabelLocalizedMessages\n            i18n-optional="kendo.floatinglabel.optional|The text for the optional segment of a FloatingLabel component"\n            optional="Optional"\n         >\n        </ng-container>\n        <ng-content></ng-content>\n        <label *ngIf="text" [for]="id" [attr.id]="labelId" class="k-label">\n            {{ text }}<span *ngIf="optional" class="k-label-optional">({{textFor(\'optional\')}})</span>\n        </label>\n    '}),o.__metadata("design:paramtypes",[r.ElementRef,r.Renderer2,r.ChangeDetectorRef,i.LocalizationService])],e)}();t.FloatingLabelComponent=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(3),a=n(2),s=n(6),l=n(5),u=n(7),c=function(){function e(e,t,n){this.elementRef=e,this.renderer=t,this.localization=n,this.subscriptions=new i.Subscription,this.direction=n.rtl?"rtl":"ltr",this.renderer.removeAttribute(this.elementRef.nativeElement,"id")}return e.prototype.ngAfterContentInit=function(){if(this.for)this.control=this.for;else{var e=u.getNativeInputContent(this.elementRef.nativeElement);if(e)return e.hasAttribute("id")||this.renderer.setAttribute(e,"id","k-"+s.guid()),void(this.control=e);this.control=this.kendoInput}},e.prototype.ngOnInit=function(){var e=this;this.subscriptions.add(this.localization.changes.subscribe((function(t){var n=t.rtl;e.direction=n?"rtl":"ltr"})))},e.prototype.ngAfterViewInit=function(){this.labelDirective.setAriaLabelledby()},e.prototype.ngOnDestroy=function(){this.subscriptions&&this.subscriptions.unsubscribe()},e.prototype.textFor=function(e){return this.localization.get(e)},o.__decorate([r.HostBinding("attr.dir"),o.__metadata("design:type",String)],e.prototype,"direction",void 0),o.__decorate([r.Input(),o.__metadata("design:type",String)],e.prototype,"text",void 0),o.__decorate([r.Input(),o.__metadata("design:type",Object)],e.prototype,"for",void 0),o.__decorate([r.Input(),o.__metadata("design:type",Boolean)],e.prototype,"optional",void 0),o.__decorate([r.ViewChild(l.LabelDirective,{static:!0}),o.__metadata("design:type",l.LabelDirective)],e.prototype,"labelDirective",void 0),o.__decorate([r.ContentChild(s.KendoInput,{static:!0}),o.__metadata("design:type",Object)],e.prototype,"kendoInput",void 0),e=o.__decorate([r.Component({selector:"kendo-label",exportAs:"kendoLabel",providers:[a.LocalizationService,{provide:a.L10N_PREFIX,useValue:"kendo.label"}],template:'\n        <ng-container kendoLabelLocalizedMessages\n            i18n-optional="kendo.label.optional|The text for the optional segment of a Label component"\n            optional="Optional"\n         >\n        </ng-container>\n        <label\n            [for]="control"\n            [class.k-label-empty]="!text">\n            {{ text }}<span *ngIf="optional" class="k-label-optional">({{textFor(\'optional\')}})</span>\n        </label>\n        <ng-content></ng-content>\n    '}),o.__metadata("design:paramtypes",[r.ElementRef,r.Renderer2,a.LocalizationService])],e)}();t.LabelComponent=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(5);t.LabelDirective=o.LabelDirective;var r=n(16);t.LabelModule=r.LabelModule;var i=n(12);t.FloatingLabelModule=i.FloatingLabelModule;var a=n(13);t.FloatingLabelComponent=a.FloatingLabelComponent;var s=n(14);t.LabelComponent=s.LabelComponent;var l=n(10);t.CustomMessagesComponent=l.CustomMessagesComponent},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(8),i=n(11),a=n(0),s=n(12),l=n(5),u=n(14),c=[l.LabelDirective,u.LabelComponent],d=function(){function e(){}return e=o.__decorate([a.NgModule({imports:[i.CommonModule,r.SharedDirectivesModule],declarations:c.slice(),exports:c.concat([s.FloatingLabelModule,r.SharedDirectivesModule])})],e)}();t.LabelModule=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(0),i=n(2),a=n(9),s=function(e){function t(t){var n=e.call(this)||this;return n.service=t,n}var n;return o.__extends(t,e),n=t,t=n=o.__decorate([r.Directive({providers:[{provide:a.Messages,useExisting:r.forwardRef((function(){return n}))}],selector:"\n      [kendoLabelLocalizedMessages],\n      [kendoFloatingLabelLocalizedMessages]\n    "}),o.__metadata("design:paramtypes",[i.LocalizationService])],t)}(a.Messages);t.LocalizedMessagesDirective=s},function(e,t){e.exports=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),r=n(0),i=function(){function e(e,t){this.component=e;var n=function(e){return e instanceof o.Observable||e instanceof r.EventEmitter};n(e.onFocus)&&(this.onFocus=e.onFocus),n(e.autoFillStart)&&(this.autoFillStart=e.autoFillStart),n(e.autoFillEnd)&&(this.autoFillEnd=e.autoFillEnd),n(e.onBlur)&&(this.onBlur=e.onBlur),t?this.onValueChange=t.valueChanges:e.onValueChange&&(this.onValueChange=e.onValueChange)}return Object.defineProperty(e.prototype,"focusableId",{get:function(){var e=this.component;return"focusableId"in e?e.focusableId:"id"in e?e.id:""},set:function(e){var t=this.component;"focusableId"in t?t.focusableId=e:"id"in t&&(t.id=e)},enumerable:!0,configurable:!0}),e}();t.FloatingLabelInputAdapter=i}])}));