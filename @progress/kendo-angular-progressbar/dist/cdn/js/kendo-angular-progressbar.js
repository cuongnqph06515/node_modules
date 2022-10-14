!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@angular/core"),require("tslib"),require("@angular/common"),require("rxjs"),require("@progress/kendo-angular-l10n"),require("rxjs/operators")):"function"==typeof define&&define.amd?define(["@angular/core","tslib","@angular/common","rxjs","@progress/kendo-angular-l10n","rxjs/operators"],t):"object"==typeof exports?exports.KendoAngularProgressbar=t(require("@angular/core"),require("tslib"),require("@angular/common"),require("rxjs"),require("@progress/kendo-angular-l10n"),require("rxjs/operators")):e.KendoAngularProgressbar=t(e["@angular/core"],e.tslib,e["@angular/common"],e.rxjs,e["@progress/kendo-angular-l10n"],e["rxjs/operators"])}(window,(function(e,t,n,r,i,o){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(11),i=n(0);t.reverseChunks=function(e,t){return"vertical"===e&&!t||"horizontal"===e&&t},t.formatValue=function(e,t,n,r){var i=s(e);if("boolean"!=typeof r){if("string"!=typeof r.format)return"function"==typeof r.format?r.format(e):i;switch(r.format){case"value":return i;case"percent":return Math.floor(o(e,t,n))+"%";default:return i}}return i},t.validateRange=function(e,t){if(i.isDevMode&&e>t)throw new Error(r.MIN_MAX_ERROR_MESSAGE)},t.adjustValueToRange=function(e,t,n){return Math.max(Math.min(n,t),e)};var o=function(e,t,n){var r=Math.abs((n-t)/100);return Math.abs((e-t)/r)},s=function(e){var t=e.toString().split(".");return 1===t.length?""+t[0]:t[0]+"."+t[1].substr(0,r.LABEL_DECIMALS)};t.calculateRatio=function(e,t,n){return Math.max((n-e)/(t-e),r.MIN_RATIO)},t.extractValueFromChanges=function(e,t,n){return e[t]&&void 0!==e[t].currentValue?e[t].currentValue:n},t.runAnimation=function(e,t,n,r){return t&&e.value&&n!==r}},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(6),o=n(0),s=n(2),a=n(7),u=n(13),l=function(e){function t(t,n,r){var i=e.call(this,t)||this;return i.localization=t,i.zone=n,i.renderer=r,i.label=!0,i.animation=!1,i.animationEnd=new o.EventEmitter,i}return r.__extends(t,e),Object.defineProperty(t.prototype,"showLabel",{get:function(){return"boolean"==typeof this.label?this.label:(this.label&&!this.label.hasOwnProperty("visible")&&(this.label.visible=!0),this.label.visible)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"labelPosition",{get:function(){return"boolean"==typeof this.label?"end":(this.label&&!this.label.hasOwnProperty("position")&&(this.label.position="end"),this.label.position)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isPositionStart",{get:function(){return"start"===this.labelPosition},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isPositionCenter",{get:function(){return"center"===this.labelPosition},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isPositionEnd",{get:function(){return"end"===this.labelPosition},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"formattedLabelValue",{get:function(){return s.formatValue(this.displayValue,this.min,this.max,this.label)},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){this.animation&&this.previousValue!==this.displayValue&&this.startAnimation(0)},t.prototype.ngOnChanges=function(t){e.prototype.ngOnChanges.call(this,t),s.runAnimation(t,this.animation,this.previousValue,this.displayValue)&&this.startAnimation(this.previousValue)},t.prototype.ngOnDestroy=function(){this.animationStartSubscription&&this.animationStartSubscription.unsubscribe(),this.animationFrame&&cancelAnimationFrame(this.animationFrame)},t.prototype.startAnimation=function(e){this.animate(this.progressStatusElement.nativeElement,e,this.progressStatusWrapperElement.nativeElement)},Object.defineProperty(t.prototype,"animationDuration",{get:function(){return"boolean"==typeof this.animation?400:(this.animation&&!this.animation.hasOwnProperty("duration")&&(this.animation.duration=400),this.animation.duration)},enumerable:!0,configurable:!0}),t.prototype.animate=function(e,t,n){var r=this,i="horizontal"===this.orientation,o=s.calculateRatio(this.min,this.max,t),a=i?100*o:100,l=i?100:100*o;this.zone.runOutsideAngular((function(){r.animationFrame&&cancelAnimationFrame(r.animationFrame);var o=i?"width":"height",s=(new Date).getTime(),p=i?a:l,c=i?r.statusWidth-a:r.statusHeight-l,d=r.animationDuration*Math.abs(c/100),h=function(){var i=(new Date).getTime()-s,a=Math.min(i/d,1),l=p+c*a,g=100/l*100;r.renderer.setStyle(e,o,l+"%"),r.renderer.setStyle(n,o,g+"%"),a<1?requestAnimationFrame(h):u.hasObservers(r.animationEnd)&&r.animationEnd.emit({from:t,to:r.displayValue})};h()}))},r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"label",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"progressCssStyle",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"progressCssClass",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"emptyCssStyle",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"emptyCssClass",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"animation",void 0),r.__decorate([o.Output(),r.__metadata("design:type",o.EventEmitter)],t.prototype,"animationEnd",void 0),r.__decorate([o.ViewChild("progressStatus"),r.__metadata("design:type",o.ElementRef)],t.prototype,"progressStatusElement",void 0),r.__decorate([o.ViewChild("progressStatusWrap"),r.__metadata("design:type",o.ElementRef)],t.prototype,"progressStatusWrapperElement",void 0),t=r.__decorate([o.Component({exportAs:"kendoProgressBar",selector:"kendo-progressbar",template:'\n        <span class="k-progress-status-wrap"\n            [class.k-progress-start]="isPositionStart"\n            [class.k-progress-center]="isPositionCenter"\n            [class.k-progress-end]="isPositionEnd"\n            [ngStyle]="emptyCssStyle"\n            [ngClass]="emptyCssClass">\n            <span *ngIf="showLabel" class="k-progress-status">{{formattedLabelValue}}</span>\n        </span>\n        <div\n            #progressStatus\n            class="k-state-selected"\n            [class.k-complete]="isCompleted"\n            [ngStyle]="progressCssStyle"\n            [ngClass]="progressCssClass"\n            [style.width.%]="statusWidth"\n            [style.height.%]="statusHeight"\n            >\n            <span\n                #progressStatusWrap\n                class="k-progress-status-wrap"\n                [style.width.%]="statusWrapperWidth"\n                [style.height.%]="statusWrapperHeight"\n                [class.k-progress-start]="isPositionStart"\n                [class.k-progress-center]="isPositionCenter"\n                [class.k-progress-end]="isPositionEnd"\n                >\n                <span *ngIf="showLabel" class="k-progress-status">{{formattedLabelValue}}</span>\n            </span>\n        </div>\n       ',providers:[a.LocalizationService,{provide:a.L10N_PREFIX,useValue:"kendo.progressbar"}]}),r.__metadata("design:paramtypes",[a.LocalizationService,o.NgZone,o.Renderer2])],t)}(i.ProgressBarBase);t.ProgressBarComponent=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(0),o=n(2),s=function(){function e(e){var t=this;this.localization=e,this.widgetClasses=!0,this.roleAttribute="progressbar",this.max=100,this.min=0,this.value=0,this.orientation="horizontal",this.disabled=!1,this.reverse=!1,this.indeterminate=!1,this.displayValue=0,this.previousValue=0,this.localizationChangeSubscription=e.changes.subscribe((function(e){var n=e.rtl;t.direction=n?"rtl":"ltr"}))}return Object.defineProperty(e.prototype,"isHorizontal",{get:function(){return"horizontal"===this.orientation},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isVertical",{get:function(){return"vertical"===this.orientation},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabledClass",{get:function(){return this.disabled},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reverseClass",{get:function(){return this.reverse},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"indeterminateClass",{get:function(){return this.indeterminate},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dirAttribute",{get:function(){return this.direction},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ariaMinAttribute",{get:function(){return String(this.min)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ariaMaxAttribute",{get:function(){return String(this.max)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ariaValueAttribute",{get:function(){return this.indeterminate?void 0:String(this.displayValue)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isCompleted",{get:function(){return this.value===this.max},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusWidth",{get:function(){return"horizontal"===this.orientation?100*this._progressRatio:100},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusHeight",{get:function(){return"vertical"===this.orientation?100*this._progressRatio:100},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusWrapperWidth",{get:function(){return"horizontal"===this.orientation?100/this._progressRatio:100},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"statusWrapperHeight",{get:function(){return"vertical"===this.orientation?100/this._progressRatio:100},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_progressRatio",{get:function(){return o.calculateRatio(this.min,this.max,this.displayValue)},enumerable:!0,configurable:!0}),e.prototype.ngOnChanges=function(e){var t=o.extractValueFromChanges(e,"min",this.min),n=o.extractValueFromChanges(e,"max",this.max),r=o.extractValueFromChanges(e,"value",this.value);if(e.min||e.max||e.value){if((e.min||e.max)&&o.validateRange(t,n),e.value){(null==r||Number.isNaN(r))&&(this.value=t);var i=this.displayValue;this.displayValue=o.adjustValueToRange(this.min,this.max,r),i!==this.displayValue&&(this.previousValue=i)}this.min=t,this.max=n,this.displayValue=o.adjustValueToRange(this.min,this.max,r)}},e.prototype.ngOnDestroy=function(){this.localizationChangeSubscription&&this.localizationChangeSubscription.unsubscribe()},r.__decorate([i.HostBinding("class.k-widget"),i.HostBinding("class.k-progressbar"),r.__metadata("design:type",Boolean)],e.prototype,"widgetClasses",void 0),r.__decorate([i.HostBinding("class.k-progressbar-horizontal"),r.__metadata("design:type",Boolean),r.__metadata("design:paramtypes",[])],e.prototype,"isHorizontal",null),r.__decorate([i.HostBinding("class.k-progressbar-vertical"),r.__metadata("design:type",Boolean),r.__metadata("design:paramtypes",[])],e.prototype,"isVertical",null),r.__decorate([i.HostBinding("class.k-state-disabled"),r.__metadata("design:type",Boolean),r.__metadata("design:paramtypes",[])],e.prototype,"disabledClass",null),r.__decorate([i.HostBinding("class.k-progressbar-reverse"),r.__metadata("design:type",Boolean),r.__metadata("design:paramtypes",[])],e.prototype,"reverseClass",null),r.__decorate([i.HostBinding("class.k-progressbar-indeterminate"),r.__metadata("design:type",Boolean),r.__metadata("design:paramtypes",[])],e.prototype,"indeterminateClass",null),r.__decorate([i.HostBinding("attr.dir"),r.__metadata("design:type",String),r.__metadata("design:paramtypes",[])],e.prototype,"dirAttribute",null),r.__decorate([i.HostBinding("attr.role"),r.__metadata("design:type",String)],e.prototype,"roleAttribute",void 0),r.__decorate([i.HostBinding("attr.aria-valuemin"),r.__metadata("design:type",String),r.__metadata("design:paramtypes",[])],e.prototype,"ariaMinAttribute",null),r.__decorate([i.HostBinding("attr.aria-valuemax"),r.__metadata("design:type",String),r.__metadata("design:paramtypes",[])],e.prototype,"ariaMaxAttribute",null),r.__decorate([i.HostBinding("attr.aria-valuenow"),r.__metadata("design:type",String),r.__metadata("design:paramtypes",[])],e.prototype,"ariaValueAttribute",null),r.__decorate([i.Input(),r.__metadata("design:type",Number)],e.prototype,"max",void 0),r.__decorate([i.Input(),r.__metadata("design:type",Number)],e.prototype,"min",void 0),r.__decorate([i.Input(),r.__metadata("design:type",Number)],e.prototype,"value",void 0),r.__decorate([i.Input(),r.__metadata("design:type",String)],e.prototype,"orientation",void 0),r.__decorate([i.Input(),r.__metadata("design:type",Boolean)],e.prototype,"disabled",void 0),r.__decorate([i.Input(),r.__metadata("design:type",Boolean)],e.prototype,"reverse",void 0),r.__decorate([i.Input(),r.__metadata("design:type",Boolean)],e.prototype,"indeterminate",void 0),e}();t.ProgressBarBase=s},function(e,t){e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(6),o=n(0),s=n(2),a=n(7),u=function(e){function t(t){var n=e.call(this,t)||this;return n.localization=t,n.chunkCount=5,n._orientationStyles={width:n.chunkSizePercentage+"%"},n}return r.__extends(t,e),Object.defineProperty(t.prototype,"chunks",{get:function(){for(var e=this.chunkCount,t=Array(e).fill(!1),n=Math.floor(this._progressRatio*e),r=0;r<n;r++)t[r]=!0;return s.reverseChunks(this.orientation,this.reverse)&&t.reverse(),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"chunkSizePercentage",{get:function(){return 100/this.chunkCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"orientationStyles",{get:function(){return"horizontal"===this.orientation?(this._orientationStyles.width=this.chunkSizePercentage+"%",this._orientationStyles.height=void 0):(this._orientationStyles.height=this.chunkSizePercentage+"%",this._orientationStyles.width=void 0),this._orientationStyles},enumerable:!0,configurable:!0}),r.__decorate([o.Input(),r.__metadata("design:type",Number)],t.prototype,"chunkCount",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"progressCssStyle",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"progressCssClass",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"emptyCssStyle",void 0),r.__decorate([o.Input(),r.__metadata("design:type",Object)],t.prototype,"emptyCssClass",void 0),t=r.__decorate([o.Component({exportAs:"kendoChunkProgressBar",selector:"kendo-chunkprogressbar",template:'\n        <ul class="k-reset">\n            <li class="k-item" *ngFor="let chunk of chunks; let i = index;"\n                [class.k-first]="i === 0"\n                [class.k-last]="i === chunkCount - 1"\n                [class.k-state-selected]="chunk"\n                [ngClass]="chunk ? progressCssClass : emptyCssClass"\n                [ngStyle]="chunk ? progressCssStyle : emptyCssStyle"\n                [style.width]="orientationStyles.width"\n                [style.height]="orientationStyles.height"\n                >\n            </li>\n        </ul>\n    ',providers:[a.LocalizationService,{provide:a.L10N_PREFIX,useValue:"kendo.chunkprogressbar"}]}),r.__metadata("design:paramtypes",[a.LocalizationService])],t)}(i.ProgressBarBase);t.ChunkProgressBarComponent=u},function(e,t){e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5);t.ProgressBarComponent=r.ProgressBarComponent;var i=n(8);t.ChunkProgressBarComponent=i.ChunkProgressBarComponent;var o=n(12);t.ProgressBarModule=o.ProgressBarModule},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MIN_MAX_ERROR_MESSAGE="The max value should be greater than the min.",t.LABEL_DECIMALS=3,t.MIN_RATIO=1e-5},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(8),o=n(0),s=n(3),a=[n(5).ProgressBarComponent,i.ChunkProgressBarComponent],u=[s.CommonModule],l=function(){function e(){}return e=r.__decorate([o.NgModule({declarations:a,exports:a,imports:u})],e)}();t.ProgressBarModule=l},function(e,t,n){"use strict";n.r(t);var r=n(0),i=function(e,t){return function(n){return t(e(n))}},o=function(e,t,n){return e.addEventListener&&e.addEventListener(t,n)},s=function(e,t,n){return e&&e.removeEventListener&&e.removeEventListener(t,n)},a=function(){},u=function(e){return e.preventDefault()},l=/touch/;function p(e){return e.type.match(l)?{pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY,clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY,type:e.type,originalEvent:e,isTouch:!0}:{pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,type:e.type,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,originalEvent:e}}var c=function(e){var t=this,n=e.press;void 0===n&&(n=a);var r=e.drag;void 0===r&&(r=a);var l=e.release;void 0===l&&(l=a);var c=e.mouseOnly;void 0===c&&(c=!1),this._pressHandler=i(p,n),this._dragHandler=i(p,r),this._releaseHandler=i(p,l),this._ignoreMouse=!1,this._mouseOnly=c,this._touchstart=function(e){1===e.touches.length&&t._pressHandler(e)},this._touchmove=function(e){1===e.touches.length&&t._dragHandler(e)},this._touchend=function(e){0===e.touches.length&&1===e.changedTouches.length&&(t._releaseHandler(e),t._ignoreMouse=!0,setTimeout(t._restoreMouse,2e3))},this._restoreMouse=function(){t._ignoreMouse=!1},this._mousedown=function(e){var n=e.which;n&&n>1||t._ignoreMouse||(o(document,"mousemove",t._mousemove),o(document,"mouseup",t._mouseup),t._pressHandler(e))},this._mousemove=function(e){t._dragHandler(e)},this._mouseup=function(e){s(document,"mousemove",t._mousemove),s(document,"mouseup",t._mouseup),t._releaseHandler(e)},this._pointerdown=function(e){e.isPrimary&&0===e.button&&(o(document,"pointermove",t._pointermove),o(document,"pointerup",t._pointerup),o(document,"pointercancel",t._pointerup),o(document,"contextmenu",u),t._pressHandler(e))},this._pointermove=function(e){e.isPrimary&&t._dragHandler(e)},this._pointerup=function(e){e.isPrimary&&(s(document,"pointermove",t._pointermove),s(document,"pointerup",t._pointerup),s(document,"pointercancel",t._pointerup),s(document,"contextmenu",u),t._releaseHandler(e))}};c.supportPointerEvent=function(){return"undefined"!=typeof window&&window.PointerEvent},c.prototype.bindTo=function(e){e!==this._element&&(this._element&&this._unbindFromCurrent(),this._element=e,this._bindToCurrent())},c.prototype._bindToCurrent=function(){var e=this._element;this._usePointers()?o(e,"pointerdown",this._pointerdown):(o(e,"mousedown",this._mousedown),this._mouseOnly||(o(e,"touchstart",this._touchstart),o(e,"touchmove",this._touchmove),o(e,"touchend",this._touchend)))},c.prototype._unbindFromCurrent=function(){var e=this._element;if(this._usePointers())return s(e,"pointerdown",this._pointerdown),s(document,"pointermove",this._pointermove),s(document,"pointerup",this._pointerup),s(document,"contextmenu",u),void s(document,"pointercancel",this._pointerup);s(e,"mousedown",this._mousedown),this._mouseOnly||(s(e,"touchstart",this._touchstart),s(e,"touchmove",this._touchmove),s(e,"touchend",this._touchend))},c.prototype._usePointers=function(){return!this._mouseOnly&&c.supportPointerEvent()},c.prototype.destroy=function(){this._unbindFromCurrent(),this._element=null},c.default=c;var d=c,h=n(3),g=n(4),m=n(9);n.d(t,"DraggableDirective",(function(){return C})),n.d(t,"DraggableModule",(function(){return O})),n.d(t,"EventsOutsideAngularDirective",(function(){return S})),n.d(t,"EventsModule",(function(){return E})),n.d(t,"ResizeSensorComponent",(function(){return D})),n.d(t,"ResizeBatchService",(function(){return k})),n.d(t,"ResizeSensorModule",(function(){return K})),n.d(t,"KendoInput",(function(){return A})),n.d(t,"isDocumentAvailable",(function(){return f})),n.d(t,"isChanged",(function(){return _})),n.d(t,"anyChanged",(function(){return b})),n.d(t,"hasObservers",(function(){return v})),n.d(t,"guid",(function(){return P})),n.d(t,"Keys",(function(){return y}));var y,f=function(){return"undefined"!=typeof document},_=function(e,t,n){return void 0===n&&(n=!0),!(void 0===t[e]||t[e].isFirstChange()&&n||t[e].previousValue===t[e].currentValue)},b=function(e,t,n){return void 0===n&&(n=!0),e.some((function(e){return _(e,t,n)}))},v=function(e){return e&&e.observers.length>0},P=function(){for(var e="",t=0;t<32;t++){var n=16*Math.random()|0;8!==t&&12!==t&&16!==t&&20!==t||(e+="-"),e+=(12===t?4:16===t?3&n|8:n).toString(16)}return e},C=function(){function e(e,t){this.element=e,this.ngZone=t,this.enableDrag=!0,this.kendoPress=new r.EventEmitter,this.kendoDrag=new r.EventEmitter,this.kendoRelease=new r.EventEmitter}return e.prototype.ngOnInit=function(){this.toggleDraggable()},e.prototype.ngOnChanges=function(e){_("enableDrag",e)&&this.toggleDraggable()},e.prototype.ngOnDestroy=function(){this.destroyDraggable()},e.prototype.toggleDraggable=function(){var e=this;f()&&(this.destroyDraggable(),this.enableDrag&&(this.draggable=new d({drag:function(t){return e.kendoDrag.next(t)},press:function(t){return e.kendoPress.next(t)},release:function(t){return e.kendoRelease.next(t)}}),this.ngZone.runOutsideAngular((function(){return e.draggable.bindTo(e.element.nativeElement)}))))},e.prototype.destroyDraggable=function(){this.draggable&&(this.draggable.destroy(),this.draggable=null)},e.decorators=[{type:r.Directive,args:[{selector:"[kendoDraggable]"}]}],e.ctorParameters=function(){return[{type:r.ElementRef},{type:r.NgZone}]},e.propDecorators={enableDrag:[{type:r.Input}],kendoPress:[{type:r.Output}],kendoDrag:[{type:r.Output}],kendoRelease:[{type:r.Output}]},e}(),O=function(){function e(){}return e.decorators=[{type:r.NgModule,args:[{declarations:[C],exports:[C],imports:[h.CommonModule]}]}],e}(),S=function(){function e(e,t,n){this.element=e,this.ngZone=t,this.renderer=n,this.events={}}return e.prototype.ngOnInit=function(){var e=this;if(this.element&&this.element.nativeElement){var t=this.events;this.subscriptions=[],this.ngZone.runOutsideAngular((function(){for(var n in t)t.hasOwnProperty(n)&&e.subscriptions.push(e.renderer.listen(e.element.nativeElement,n,e.scope?t[n].bind(e.scope):t[n]))}))}},e.prototype.ngOnDestroy=function(){if(this.subscriptions){for(var e=0;e<this.subscriptions.length;e++)this.subscriptions[e]();this.subscriptions=null}},e.decorators=[{type:r.Directive,args:[{selector:"[kendoEventsOutsideAngular]"}]}],e.ctorParameters=function(){return[{type:r.ElementRef},{type:r.NgZone},{type:r.Renderer2}]},e.propDecorators={events:[{type:r.Input,args:["kendoEventsOutsideAngular"]}],scope:[{type:r.Input}]},e}(),E=function(){function e(){}return e.decorators=[{type:r.NgModule,args:[{declarations:[S],exports:[S]}]}],e}(),k=function(){function e(e){this.ngZone=e,this.scheduled=[],this.resolvedPromise=Promise.resolve(null),this.flush=this.flush.bind(this)}return e.prototype.schedule=function(e,t){var n=this;this.scheduled.push({instance:e,method:t}),this.subscription||this.ngZone.runOutsideAngular((function(){n.subscription=Object(g.from)(n.resolvedPromise).subscribe(n.flush)}))},e.prototype.isScheduled=function(e){return Boolean(this.scheduled.find((function(t){return t.instance===e})))},e.prototype.cancel=function(e){for(var t=this.scheduled,n=t.length,r=0;r<n;r++)if(t[r].instance===e)return t.splice(r,1),void(t.length||this.unsubscribe())},e.prototype.ngOnDestroy=function(){this.unsubscribe()},e.prototype.unsubscribe=function(){this.subscription&&(this.subscription.unsubscribe(),this.subscription=null)},e.prototype.flush=function(){this.scheduled.forEach((function(e){e.method.call(e.instance)})),this.scheduled=[],this.unsubscribe()},e.decorators=[{type:r.Injectable}],e.ctorParameters=function(){return[{type:r.NgZone}]},e}(),w=10,x="position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;overflow: hidden; visibility: hidden;",D=function(){function e(e,t,n,i){this.resizeBatchService=e,this.element=t,this.zone=n,this.renderer=i,this.rateLimit=w,this.resize=new r.EventEmitter,this.dir="ltr",this.source=new g.Subject,this.state=0,this.acceptedSize=!1}return e.prototype.ngAfterViewInit=function(){var e=this;this.zone.runOutsideAngular((function(){var t=e.scroll.bind(e),n=e.renderer.listen(e.expand.nativeElement,"scroll",t),r=e.renderer.listen(e.shrink.nativeElement,"scroll",t);e.detachScrollHandlers=function(){n(),r()}}))},e.prototype.ngAfterViewChecked=function(){"undefined"!=typeof document&&(2!==this.state?0===this.state&&(this.state=1,this.resizeBatchService.schedule(this,this.init)):this.resizeBatchService.isScheduled(this)||this.resizeBatchService.schedule(this,this.scroll))},e.prototype.ngOnDestroy=function(){this.subscription&&this.subscription.unsubscribe(),this.detachScrollHandlers&&this.detachScrollHandlers(),this.resizeBatchService.cancel(this)},e.prototype.acceptSize=function(e){void 0===e&&(e=this.measure()),this.lastWidth=e.width,this.lastHeight=e.height,this.acceptedSize=!0},e.prototype.scroll=function(e){var t=this;if(this.parentElement){var n=this.measure(),r=n.width,i=n.height;r===this.lastWidth&&i===this.lastHeight||(this.lastWidth=r,this.lastHeight=i,this.acceptedSize=!1,this.zone.runOutsideAngular((function(){t.source.next()})),this.reset())}},e.prototype.init=function(){var e,t,n=this,r=1e3/(this.rateLimit||w);this.subscription=this.source.asObservable().pipe(Object(m.auditTime)(r)).subscribe((function(){n.acceptedSize||n.resize.emit()})),this.parentElement=this.element.nativeElement.parentElement,"static"===(e=this.parentElement,t="position",getComputedStyle(e,null).getPropertyValue(t))&&(this.parentElement.style.position="relative"),this.reset(),this.lastWidth=this.parentElement.offsetWidth,this.lastHeight=this.parentElement.offsetHeight,this.state=2},e.prototype.reset=function(){var e=this.expandChild.nativeElement;e.style.width=1e5+"px",e.style.height=1e5+"px";var t=this.expand.nativeElement;t.scrollLeft=1e5,t.scrollTop=1e5;var n=this.shrink.nativeElement;n.scrollLeft=1e5,n.scrollTop=1e5},e.prototype.measure=function(){var e=0,t=0;return this.parentElement&&(t=this.parentElement.offsetHeight,e=this.parentElement.offsetWidth),{height:t,width:e}},e.decorators=[{type:r.Component,args:[{selector:"kendo-resize-sensor",styles:[":host { "+x+" }"],template:'<div #expand style="'+x+'">  <div #expandChild style="position: absolute; left: 0; top: 0; transition: 0s;"></div></div><div #shrink style="'+x+'">  <div style="position: absolute; left: 0; top: 0; transition: 0s;width: 200%; height: 200%;"></div></div>'}]}],e.ctorParameters=function(){return[{type:k},{type:r.ElementRef},{type:r.NgZone},{type:r.Renderer2}]},e.propDecorators={rateLimit:[{type:r.Input}],resize:[{type:r.Output}],dir:[{type:r.HostBinding,args:["attr.dir"]}],expand:[{type:r.ViewChild,args:["expand"]}],expandChild:[{type:r.ViewChild,args:["expandChild"]}],shrink:[{type:r.ViewChild,args:["shrink"]}]},e}(),j=[D],K=function(){function e(){}return e.decorators=[{type:r.NgModule,args:[{declarations:[j],exports:[j],providers:[k]}]}],e}(),A=function(){};!function(e){e[e.Alt=18]="Alt",e[e.ArrowDown=40]="ArrowDown",e[e.ArrowLeft=37]="ArrowLeft",e[e.ArrowRight=39]="ArrowRight",e[e.ArrowUp=38]="ArrowUp",e[e.Backspace=8]="Backspace",e[e.Control=17]="Control",e[e.Delete=46]="Delete",e[e.Digit0=48]="Digit0",e[e.Digit1=49]="Digit1",e[e.Digit2=50]="Digit2",e[e.Digit3=51]="Digit3",e[e.Digit4=52]="Digit4",e[e.Digit5=53]="Digit5",e[e.Digit6=54]="Digit6",e[e.Digit7=55]="Digit7",e[e.Digit8=56]="Digit8",e[e.Digit9=57]="Digit9",e[e.End=35]="End",e[e.Enter=13]="Enter",e[e.Escape=27]="Escape",e[e.F1=112]="F1",e[e.F2=113]="F2",e[e.F10=121]="F10",e[e.Home=36]="Home",e[e.Insert=45]="Insert",e[e.KeyA=65]="KeyA",e[e.KeyB=66]="KeyB",e[e.KeyC=67]="KeyC",e[e.KeyD=68]="KeyD",e[e.KeyE=69]="KeyE",e[e.KeyF=70]="KeyF",e[e.KeyG=71]="KeyG",e[e.KeyH=72]="KeyH",e[e.KeyI=73]="KeyI",e[e.KeyJ=74]="KeyJ",e[e.KeyK=75]="KeyK",e[e.KeyL=76]="KeyL",e[e.KeyM=77]="KeyM",e[e.KeyN=78]="KeyN",e[e.KeyO=79]="KeyO",e[e.KeyP=80]="KeyP",e[e.KeyQ=81]="KeyQ",e[e.KeyR=82]="KeyR",e[e.KeyS=83]="KeyS",e[e.KeyT=84]="KeyT",e[e.KeyU=85]="KeyU",e[e.KeyV=86]="KeyV",e[e.KeyW=87]="KeyW",e[e.KeyX=88]="KeyX",e[e.KeyY=89]="KeyY",e[e.KeyZ=90]="KeyZ",e[e.NumpadDecimal=110]="NumpadDecimal",e[e.PageDown=34]="PageDown",e[e.PageUp=33]="PageUp",e[e.Shift=16]="Shift",e[e.Space=32]="Space",e[e.Tab=9]="Tab"}(y||(y={}))}])}));