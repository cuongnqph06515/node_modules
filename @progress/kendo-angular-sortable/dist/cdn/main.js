!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("tslib"),require("@angular/core"),require("@progress/kendo-angular-common"),require("rxjs/operators"),require("rxjs"),require("@progress/kendo-angular-l10n"),require("@telerik/kendo-draggable"),require("@angular/common")):"function"==typeof define&&define.amd?define(["tslib","@angular/core","@progress/kendo-angular-common","rxjs/operators","rxjs","@progress/kendo-angular-l10n","@telerik/kendo-draggable","@angular/common"],t):"object"==typeof exports?exports.KendoAngularSortable=t(require("tslib"),require("@angular/core"),require("@progress/kendo-angular-common"),require("rxjs/operators"),require("rxjs"),require("@progress/kendo-angular-l10n"),require("@telerik/kendo-draggable"),require("@angular/common")):e.KendoAngularSortable=t(e.tslib,e["@angular/core"],e["@progress/kendo-angular-common"],e["rxjs/operators"],e.rxjs,e["@progress/kendo-angular-l10n"],e["@telerik/kendo-draggable"],e["@angular/common"])}(window,function(e,t,r,a,n,i,o,s){return function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=16)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=function(){function e(e){this.templateRef=e}return e=a.__decorate([n.Directive({selector:"[kendoSortableItemTemplate]"}),a.__metadata("design:paramtypes",[n.TemplateRef])],e)}();t.ItemTemplateDirective=i;var o=function(){function e(e){this.templateRef=e}return e=a.__decorate([n.Directive({selector:"[kendoSortablePlaceholderTemplate]"}),a.__metadata("design:paramtypes",[n.TemplateRef])],e)}();t.PlaceholderTemplateDirective=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(){this.prevented=!1}return e.prototype.preventDefault=function(){this.prevented=!0},e.prototype.isDefaultPrevented=function(){return this.prevented},e}();t.PreventableEvent=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=r(9),o=r(6),s=r(10),l=r(7),d=r(17),c=r(5),u=r(8),p=r(2),g=r(11),v=r(12),m=r(13),b=r(18),h=function(){function e(e,t,r,a,o){this.ngZone=e,this.localization=t,this.changeDetector=r,this.tabIndex=null,this.navigatable=!1,this.animation=!1,this.disabledIndexes=[],this.zone=void 0,this.acceptZones=void 0,this.itemStyle={},this.emptyItemStyle=void 0,this.activeItemStyle=void 0,this.disabledItemStyle=void 0,this.itemClass="",this.activeItemClass=null,this.emptyItemClass=null,this.disabledItemClass=null,this.emptyText="Empty",this.defaultTemplateRef=null,this.itemTemplateRef=null,this.placeholderTemplateRef=null,this.itemWrappers=null,this.dragStart=new n.EventEmitter,this.dragEnd=new n.EventEmitter,this.dragOver=new n.EventEmitter,this.dragLeave=new n.EventEmitter,this.dataMove=new n.EventEmitter,this.dataAdd=new n.EventEmitter,this.dataRemove=new n.EventEmitter,this.navigate=new n.EventEmitter,this.activeIndex=-1,this.animating=!1,this.dragIndex=-1,this.dragOverIndex=-1,this.onDragStartSubject=new i.Subject,this.onDragOverSubject=new i.Subject,this.onDragLeaveSubject=new i.Subject,this.onDragEndSubject=new i.Subject,this.hintLocation=null,this._localData=[],this.animationDuration=300,this.afterKeyPress=!1,this.sortableService=null,this._hideActiveItem=!1,this.wrapper=a.nativeElement,this.direction=t.rtl?"rtl":"ltr",this.sortableService=o,this.subscribeEvents()}return Object.defineProperty(e.prototype,"data",{get:function(){return this._data},set:function(e){this._data=e,this.cacheData()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"touchAction",{get:function(){return"none"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dir",{get:function(){return this.direction},enumerable:!0,configurable:!0}),e.prototype.setItemData=function(e,t){this._localData[t].item=e.item,this._localData[t].index=e.index,this._localData[t].hidden=e.hidden},e.prototype.itemTemplate=function(e){var t=this.itemTemplateRef;return e===this.dragOverIndex?t=this.placeholderTemplateRef:e===this.dragIndex&&(t=this.itemTemplateRef),t},e.prototype.ngOnInit=function(){var e=this;this.data||(this.data=[]),this.id=this.sortableService.registerComponent(this),this.dragIndex=-1;this.activeItemStyle&&!this.activeItemStyle.display&&(this.activeItemStyle.display=""),this.itemStyle.display||(this.itemStyle.display=""),this.wrapper&&(this.draggable=new b.default({press:function(t){return e.sortableService.onPress(t)},drag:function(t){return e.sortableService.onDrag(t)},release:function(t){return e.sortableService.onRelease(t)}}),this.ngZone.runOutsideAngular(function(){e.draggable.bindTo(e.wrapper)}))},e.prototype.ngOnDestroy=function(){this.unsubscribeEvents(),this.sortableService.unregisterComponent(this.id),this.draggable&&this.draggable.destroy()},e.prototype.ngAfterContentInit=function(){this.itemTemplateRef=this.itemTemplateRef||this.defaultTemplateRef,this.placeholderTemplateRef=this.placeholderTemplateRef||this.defaultTemplateRef},e.prototype.ngAfterViewChecked=function(){if(this.afterKeyPress){if(this.itemWrappers){var e=this.itemWrappers.toArray();e&&e.length>0&&this.activeIndex>-1&&e[this.activeIndex].nativeElement.focus()}this.afterKeyPress=!1}},e.prototype.updateCacheIndices=function(){this._localData.forEach(function(e,t){e.index=t})},e.prototype.cacheData=function(){var e=this;this._localData=[],this._data.forEach(function(t,r){e._localData.push({item:t,active:!1,disabled:!1,index:r,hidden:!1})})},e.prototype.startDrag=function(e){var t=new v.DraggableEvent(e);this.onDragStartSubject.next(t);var r=t.isDefaultPrevented();return r||(this.offsetParent=s.relativeContextElement(this.wrapper)),r},e.prototype.drag=function(e){var t=new v.DraggableEvent(e);return this.onDragOverSubject.next(t),t.isDefaultPrevented()},e.prototype.leave=function(e){var t=new v.DraggableEvent(e);return this.onDragLeaveSubject.next(t),t.isDefaultPrevented()},e.prototype.endDrag=function(e){var t=new v.DraggableEvent(e);return this.onDragEndSubject.next(t),t.isDefaultPrevented()},e.prototype.hintVisible=function(){return this.dragIndex>=0&&this.hintLocation&&this===this.sortableService.getSource()},e.prototype.currentItemStyle=function(e){if(-1===e)return this.emptyItemStyle?this.emptyItemStyle:this.itemStyle;if(!this.itemEnabled(e)&&this.disabledItemStyle)return this.disabledItemStyle;if(e===this.dragIndex||-1===this.dragIndex&&e===this.activeIndex){if(this.hideActiveItem)return{display:"none"};if(this.activeItemStyle)return this.activeItemStyle}return this.itemStyle},e.prototype.currentItemClass=function(e){return-1===e?this.emptyItemClass?this.emptyItemClass:this.itemClass:!this.itemEnabled(e)&&this.disabledItemClass?this.disabledItemClass:(e===this.dragIndex||-1===this.dragIndex&&e===this.activeIndex)&&this.activeItemClass?this.activeItemClass:this.itemClass},e.prototype.hintStyle=function(){var e={left:this.hintLocation.x+10+"px",position:"fixed",top:this.hintLocation.y+10+"px"},t={};return Object.assign(t,this.currentItemStyle(this.dragIndex),e),t},e.prototype.itemEnabled=function(e){return-1===this.disabledIndexes.indexOf(e)},e.prototype.acceptDragFrom=function(e){return void 0===this.acceptZones?this.zone===e.zone:void 0!==e.zone&&-1!==this.acceptZones.indexOf(e.zone)},e.prototype.ariaDropEffect=function(e){return this.itemEnabled(e)?"move":"none"},e.prototype.focusHandler=function(e){this.navigatable&&(this.activeIndex=e)},e.prototype.blurHandler=function(){this.navigatable&&!this.afterKeyPress&&(this.activeIndex=-1)},e.prototype.keydownHandler=function(e){var t=e.keyCode,r=this.navigatable&&t>=37&&t<=40,a=-1!==this.activeIndex;if(r&&a){for(var n="rtl"===this.direction?39:37,i=38===t||t===n?-1:1,o=this.data.length-1,s=this.activeIndex+i;!this.itemEnabled(s)&&s<=o;)s+=i;if(s=Math.min(Math.max(s,0),o),this.itemEnabled(s)){if(r){var l=e.ctrlKey||e.metaKey,d=new g.NavigateEvent({index:s,oldIndex:this.activeIndex,ctrlKey:l});this.navigate.emit(d),d.isDefaultPrevented()||(this.activeIndex=s),this.dragIndex=-1,this.dragOverIndex=-1}e.stopPropagation(),e.preventDefault(),this.afterKeyPress=!0}}},e.prototype.removeDataItem=function(e){this.dragIndex=-1,this.dragOverIndex=-1,this._localData.splice(e,1),this.data.splice(e,1),this.updateCacheIndices()},e.prototype.hideItem=function(e,t){void 0===t&&(t=!0),this._localData[e].hidden=t},Object.defineProperty(e.prototype,"hideActiveItem",{get:function(){return this._hideActiveItem},set:function(e){this.activeIndex=-1,this._hideActiveItem=e},enumerable:!0,configurable:!0}),e.prototype.clearActiveItem=function(){this.navigatable&&this.fixFocus(),this.dragIndex=-1},e.prototype.getActiveItem=function(){if(this.data&&this.dragIndex>=0&&this.dragIndex<this.data.length)return this.data[this.dragIndex]},e.prototype.addDataItem=function(e,t){var r=this,a=this.sortableService.originDraggable;if(a&&a.parent===this){var n=this.animation;this.hideItem(a.index,!1),this.animation=!1,this.moveItem(a.index,t),this.animation=n}else t+1===this.data.length&&t++,this.data.splice(t,0,e),this._localData.splice(t,0,{item:e,active:!1,disabled:!1,index:t,hidden:!1}),this.updateCacheIndices();this.dragIndex=t,this.dragOverIndex=t,this.ngZone.onStable.pipe(l.take(1)).subscribe(function(){r.sortableService.target=r,r.sortableService.setSource(r),r.sortableService.activeDraggable=r.draggables.toArray()[t],r.sortableService.lastDraggable=null})},e.prototype.moveItem=function(e,t){var r=this;if(t!==e){for(var a,n=e,i=t>n?1:-1,o=n,s=[],d=n;n!==t;)n+=i,(this.itemEnabled(n)||n===t)&&(this.animation&&s.push({next:n,prev:d}),a=this._localData[d].index,this._localData[d].index=this._localData[n].index,this._localData[n].index=a,a=this._localData[d],this._localData[d]=this._localData[n],this._localData[n]=a,a=this.data[d],this.data[d]=this.data[n],this.data[n]=a,d=n);this.dragIndex=n,this.dragOverIndex=n,this.activeIndex=n,this.animation&&setTimeout(function(){s.push({next:o,prev:n}),r.animating=!0,r.animate(s)}),this.ngZone.onStable.pipe(l.take(1)).subscribe(function(){r.sortableService.activeDraggable=r.draggables.toArray()[n],r.sortableService.lastDraggable=null})}},e.prototype.animate=function(e){var t=this,r=this.itemWrappers.toArray(),a=[],n=[],i=this;clearTimeout(this._animating);for(var o=0;o<e.length;o++)a.push(r[e[o].prev].nativeElement.getBoundingClientRect()),n.push(r[e[o].next].nativeElement.getBoundingClientRect());for(o=0;o<e.length;o++){var s=e[o].prev,l=n[o],d=a[o],c=r[s].nativeElement;this.applyAnimationStyle(c,"transition","none"),this.applyAnimationStyle(c,"transform","translate3d("+(l.left-d.left).toString()+"px,"+(l.top-d.top).toString()+"px,0)"),this.reflow(c)}var u=function(t){var a=e[t].prev,n=r[a].nativeElement;p.applyAnimationStyle(n,"transition","all "+p.animationDuration+"ms"),p.applyAnimationStyle(n,"transform","translate3d(0,0,0)"),clearTimeout(n.animated),n.animated=setTimeout(function(){i.applyAnimationStyle(n,"transition",""),i.applyAnimationStyle(n,"transform",""),n.animated=!1},p.animationDuration)},p=this;for(o=0;o<e.length;o++)u(o);this._animating=setTimeout(function(){t.animating=!1},this.animationDuration)},e.prototype.positionHintFromEvent=function(e){var t=this.parentOffset();this.hintLocation=e?{x:e.clientX-t.left,y:e.clientY-t.top}:null},e.prototype.parentOffset=function(){var e=this.offsetParent;if(e){var t=e.getBoundingClientRect();return{left:t.left-e.scrollLeft,top:t.top-e.scrollTop}}return{left:0,top:0}},e.prototype.markForCheck=function(){this.changeDetector.markForCheck()},e.prototype.reflow=function(e){return e.offsetWidth},e.prototype.applyAnimationStyle=function(e,t,r){var a=e&&e.style;a&&(t in a||(t="-webkit-"+t),a[t]=r)},e.prototype.subscribeEvents=function(){var e=this;this.localizationChangeSubscription=this.localization.changes.subscribe(function(t){var r=t.rtl;return e.direction=r?"rtl":"ltr"}),this.dragStartSubscription=this.onDragStartSubject.subscribe(function(t){e.sortableService.originDraggable=t.target,e.sortableService.originIndex=t.target.index,e.sortableService.activeDraggable=t.target,e.sortableService.lastDraggable=t.target,e.sortableService.target=e,e.sortableService.setSource(e);var r=new m.DragStartEvent({index:t.target.index});e.dragStart.emit(r),r.isDefaultPrevented()?t.preventDefault():t.target.disabled||(e.sortableService.target&&(e.sortableService.target.dragOverIndex=-1,e.sortableService.target.dragIndex=-1),e.dragOverIndex=t.target.index,e.dragIndex=t.target.index)}),this.dragOverSubscription=this.onDragOverSubject.pipe(l.filter(function(e){return e.target&&0===e.target.el.nativeElement.style.transition.length}),l.filter(function(){return e.sortableService.originDraggable&&!e.sortableService.originDraggable.disabled}),l.filter(function(){return e.sortableService&&e.acceptDragFrom(e.sortableService.getSource())}),l.filter(function(t){return t.target!==e.sortableService.lastDraggable})).subscribe(function(t){e.sortableService.lastDraggable=t.target;var r=e.sortableService.originDraggable,a=t.target.index;r.hidden&&r.parent===e&&r.index<t.target.index&&(a=t.target.index-1),e.sortableService.target=e;var n=e.sortableService.activeDraggable?e.sortableService.activeDraggable.index:0,i=new m.DragOverEvent({index:a,oldIndex:n});e.dragOver.emit(i),!i.isDefaultPrevented()&&t.target&&t.target.index>=0&&(e.dragOverIndex=t.target.index,e.placeHolderItemData(t.target))}),this.dragEndSubscription=this.onDragEndSubject.subscribe(function(t){var r=e.sortableService.getSource();if(r){var a=e.sortableService.target,n=t.target?t.target.index:-1,i=e.sortableService.originDraggable?e.sortableService.originIndex:-1;e.hintLocation=null;var o=new m.DragEndEvent({index:n,oldIndex:i});e.dragEnd.emit(o),o.isDefaultPrevented()||(r.dragIndex=-1,r.dragOverIndex=-1,a&&a!==r&&(a.dragIndex=-1,a.dragOverIndex=-1),setTimeout(function(){e.sortableService.activeDraggable=null,e.sortableService.lastDraggable=null,e.sortableService.originDraggable=null,e.sortableService.target=null,e.sortableService.setSource(null)}))}}),this.dragLeaveSubscription=this.onDragLeaveSubject.pipe(l.filter(function(t){return!!o.isDocumentAvailable()&&e.wrapper!==document.elementFromPoint(t.originalEvent.pageX,t.originalEvent.pageY)}),l.filter(function(t){return!e.animating}),l.filter(function(t){return e.sortableService.target&&e.sortableService.target.dragOverIndex>-1})).subscribe(function(){e.dragLeave.emit({index:e.sortableService.originDraggable.index}),e.sortableService.lastDraggable=null,e.dragOverIndex=-1,e.sortableService.target=null})},e.prototype.unsubscribeEvents=function(){this.localizationChangeSubscription&&this.localizationChangeSubscription.unsubscribe(),this.dragStartSubscription.unsubscribe(),this.dragOverSubscription.unsubscribe(),this.dragEndSubscription.unsubscribe(),this.dragLeaveSubscription.unsubscribe()},e.prototype.placeHolderItemData=function(e){var t=this;if(!e.disabled){var r=this.sortableService.target,a=this.sortableService.getSource(),n=Object.assign({},this._localData[e.index]),o=a._localData[a.dragIndex];this.setItemData(o,e.index);var s=a.onDragEndSubject.pipe(l.take(1)).subscribe(function(){t.setItemData(n,e.index)}),d=r.onDragLeaveSubject.pipe(l.take(1)).subscribe(function(){t.setItemData(n,e.index)}),c=i.merge(this.onDragOverSubject.pipe(l.filter(function(){return e.index!==t.dragOverIndex})),this.onDragLeaveSubject).subscribe(function(){t.setItemData(n,e.index),s.unsubscribe(),c.unsubscribe(),d.unsubscribe()})}},e.prototype.fixFocus=function(){if(this.itemWrappers){var e=this.itemWrappers.toArray();this.dragIndex>-1&&e&&e.length>0&&(e[this.dragIndex].nativeElement.focus(),this.activeIndex=this.dragIndex)}},a.__decorate([n.Input(),a.__metadata("design:type",Number)],e.prototype,"tabIndex",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Array),a.__metadata("design:paramtypes",[Array])],e.prototype,"data",null),a.__decorate([n.Input(),a.__metadata("design:type",Boolean)],e.prototype,"navigatable",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Boolean)],e.prototype,"animation",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Array)],e.prototype,"disabledIndexes",void 0),a.__decorate([n.Input(),a.__metadata("design:type",String)],e.prototype,"zone",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Array)],e.prototype,"acceptZones",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"itemStyle",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"emptyItemStyle",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"activeItemStyle",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"disabledItemStyle",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"itemClass",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"activeItemClass",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"emptyItemClass",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Object)],e.prototype,"disabledItemClass",void 0),a.__decorate([n.Input(),a.__metadata("design:type",String)],e.prototype,"emptyText",void 0),a.__decorate([n.ContentChild(n.TemplateRef),a.__metadata("design:type",n.TemplateRef)],e.prototype,"defaultTemplateRef",void 0),a.__decorate([n.ContentChild(p.ItemTemplateDirective,{read:n.TemplateRef}),a.__metadata("design:type",n.TemplateRef)],e.prototype,"itemTemplateRef",void 0),a.__decorate([n.ContentChild(p.PlaceholderTemplateDirective,{read:n.TemplateRef}),a.__metadata("design:type",n.TemplateRef)],e.prototype,"placeholderTemplateRef",void 0),a.__decorate([n.ViewChildren("itemWrapper"),a.__metadata("design:type",n.QueryList)],e.prototype,"itemWrappers",void 0),a.__decorate([n.ViewChildren(u.DraggableDirective),a.__metadata("design:type",n.QueryList)],e.prototype,"draggables",void 0),a.__decorate([n.ViewChild("hint"),a.__metadata("design:type",n.ElementRef)],e.prototype,"hint",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dragStart",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dragEnd",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dragOver",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dragLeave",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dataMove",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dataAdd",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"dataRemove",void 0),a.__decorate([n.Output(),a.__metadata("design:type",n.EventEmitter)],e.prototype,"navigate",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Number)],e.prototype,"activeIndex",void 0),a.__decorate([n.HostBinding("style.touch-action"),a.__metadata("design:type",String),a.__metadata("design:paramtypes",[])],e.prototype,"touchAction",null),a.__decorate([n.HostBinding("attr.dir"),a.__metadata("design:type",String),a.__metadata("design:paramtypes",[])],e.prototype,"dir",null),e=a.__decorate([n.Component({exportAs:"kendoSortable",providers:[d.LocalizationService,{provide:d.L10N_PREFIX,useValue:"kendo.sortable"}],selector:"kendo-sortable",template:'\n  <div #itemWrapper *ngFor="let item of _localData;let i=index"\n      kendoDraggable\n      [attr.tabIndex]="itemEnabled(i)?(navigatable?tabIndex||0:tabIndex):null"\n      [attr.aria-grabbed]="i===dragIndex"\n      [attr.aria-dropeffect]="ariaDropEffect(i)"\n      [attr.data-sortable-item] = "true"\n      [attr.data-sortable-index]="i"\n      [attr.data-sortable-id]="id"\n      [index]="i"\n      [hidden]="item.hidden"\n      [disabled]="!itemEnabled(i)"\n      [ngClass]="currentItemClass(i)"\n      [ngStyle]="currentItemStyle(i)"\n\n      (focus)="focusHandler(i)"\n      (blur)="blurHandler()"\n      (keydown)="keydownHandler($event)"\n  >\n          <ng-template [ngIf]="itemTemplateRef"\n            [ngTemplateOutlet]="itemTemplate(i)"\n            [ngTemplateOutletContext]="item">\n          </ng-template>\n      <ng-template [ngIf]="!itemTemplateRef">{{item.item}}</ng-template>\n    </div>\n\n    <ng-template #noDataRef [ngIf]="!_data.length || _localData.length === 1 && _localData[0].hidden">\n        <div\n        kendoDraggable\n        [index]="0"\n        [disabled]="true"\n        [attr.data-sortable-id]="id"\n        [attr.data-sortable-index]="0"\n        [ngStyle]="currentItemStyle(-1)"\n        [ngClass]="currentItemClass(-1)"\n        >{{emptyText}}</div>\n    </ng-template>\n     <div *ngIf="hintVisible()" [ngStyle]="hintStyle()" [ngClass]="currentItemClass(dragIndex)">\n         <ng-template [ngIf]="itemTemplateRef"\n             [ngTemplateOutlet]="itemTemplateRef"\n             [ngTemplateOutletContext]="{item: _localData[dragIndex].item}">\n         </ng-template>\n         <ng-template [ngIf]="!itemTemplateRef">{{_localData[dragIndex].item}}</ng-template>\n     </div>\n  '}),a.__metadata("design:paramtypes",[n.NgZone,d.LocalizationService,n.ChangeDetectorRef,n.ElementRef,c.SortableService])],e)}();t.SortableComponent=h},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=r(6),o=r(10),s=r(9),l=r(7),d=function(e){var t=e.originalEvent.target;return t.hasAttribute("data-sortable-item")||!(o.isFocusable(t)||o.widgetTarget(t))},c=function(){function e(e){var t=this;this.ngZone=e,this.activeDraggable=null,this.originDraggable=null,this.targetSortable=null,this.lastDraggable=null,this.onPressSubject=new s.Subject,this.onDragSubject=new s.Subject,this.onReleaseSubject=new s.Subject,this.source=null,this._target=null,this.sortableCounter=0,this.sortableRegister={},i.isDocumentAvailable()&&(this.subscriptions=this.onPressSubject.pipe(l.filter(d),l.tap(function(e){t.targetSortable=t.getSortableComponentFromTouch(e)}),l.filter(function(e){return Boolean(t.targetSortable)}),l.tap(function(e){t.onReleaseSubject.pipe(l.take(1)).subscribe(function(e){return t.release(e)}),t.pressArgs=e,e.isTouch&&e.originalEvent.preventDefault()}),l.switchMap(function(e){return t.onDragSubject.pipe(l.filter(function(e){return Boolean(t.targetSortable)}),l.tap(function(e){return t.drag(e)}))})).subscribe())}return Object.defineProperty(e.prototype,"target",{get:function(){return this._target},set:function(e){this._target=e},enumerable:!0,configurable:!0}),e.prototype.onPress=function(e){this.onPressSubject.next(e)},e.prototype.onDrag=function(e){this.onDragSubject.next(e)},e.prototype.onRelease=function(e){this.onReleaseSubject.next(e)},e.prototype.ngOnDestroy=function(){this.subscriptions&&this.subscriptions.unsubscribe()},e.prototype.registerComponent=function(e){var t=this.sortableCounter.toString();return this.sortableRegister[t]=e,this.sortableCounter++,t},e.prototype.unregisterComponent=function(e){this.sortableRegister[e]=null},e.prototype.setSource=function(e){this.source=e},e.prototype.getSource=function(){return this.source},e.prototype.getSortableComponentFromTouch=function(e){if(!i.isDocumentAvailable())return{component:void 0,index:void 0};for(var t=document.elementFromPoint(e.clientX,e.clientY);t;){var r=t.getAttribute("data-sortable-id"),a=t.getAttribute("data-sortable-index");if(r){var n=this.sortableRegister[r];if(n)return{component:n,index:parseInt(a,10)}}t=t.parentElement}},e.prototype.start=function(){var e=this.pressArgs;if(e){this.pressArgs=null;var t=o.draggableFromEvent(e,this.targetSortable.component);if(this.targetSortable.component.startDrag({target:t,originalEvent:e}))return this.targetSortable=null,!0}},e.prototype.release=function(e){var t=this;this.source&&this.ngZone.run(function(){if(t.targetSortable){var r=o.draggableFromEvent(e,t.targetSortable.component);t.source.endDrag({target:r,originalEvent:e})}t.source.positionHintFromEvent(null),t.source.markForCheck()}),this.targetSortable=null,this.pressArgs=null},e.prototype.drag=function(e){var t=this;this.ngZone.run(function(){if(!t.start()){t.source.positionHintFromEvent(e);var r=t.getSortableComponentFromTouch(e);if((!r||r&&r.component!==t.target)&&(t.target?t.target.leave({target:void 0,originalEvent:e}):t.source!==t.target&&t.source.leave({target:void 0,originalEvent:e})),r&&r.component){var a=o.draggableFromEvent(e,r.component);r.component.drag({target:a,originalEvent:e})}t.source.markForCheck()}})},e=a.__decorate([n.Injectable(),a.__metadata("design:paramtypes",[n.NgZone])],e)}();t.SortableService=c},function(e,t){e.exports=r},function(e,t){e.exports=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=r(4),o=function(){function e(e,t){this.parent=e,this.el=t}return Object.defineProperty(e.prototype,"_focused",{get:function(){return!this.disabled&&this.index===this.parent.activeIndex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_disabled",{get:function(){return this.disabled},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"userSelect",{get:function(){return"none"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"display",{get:function(){return this.hidden?"none":this._display},set:function(e){this._display=e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){var e=this.el.nativeElement;this.display=e.style.display},a.__decorate([n.Input(),a.__metadata("design:type",Number)],e.prototype,"index",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Boolean)],e.prototype,"hidden",void 0),a.__decorate([n.Input(),a.__metadata("design:type",Boolean)],e.prototype,"disabled",void 0),a.__decorate([n.HostBinding("class.k-state-focused"),a.__metadata("design:type",Boolean),a.__metadata("design:paramtypes",[])],e.prototype,"_focused",null),a.__decorate([n.HostBinding("attr.aria-disabled"),a.__metadata("design:type",Boolean),a.__metadata("design:paramtypes",[])],e.prototype,"_disabled",null),a.__decorate([n.HostBinding("style.user-select"),n.HostBinding("style.-ms-user-select"),n.HostBinding("style.-moz-user-select"),n.HostBinding("style.-webkit-user-select"),a.__metadata("design:type",String),a.__metadata("design:paramtypes",[])],e.prototype,"userSelect",null),a.__decorate([n.HostBinding("style.display"),a.__metadata("design:type",String),a.__metadata("design:paramtypes",[String])],e.prototype,"display",null),e=a.__decorate([n.Directive({selector:"[kendoDraggable]"}),a.__param(0,n.Inject(n.forwardRef(function(){return i.SortableComponent}))),a.__metadata("design:paramtypes",[i.SortableComponent,n.ElementRef])],e)}();t.DraggableDirective=o},function(e,t){e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(6),n={},i={},o=/^(?:a|input|select|option|textarea|button|object)$/i;t.matchesNodeName=function(e){return n[e]||(n[e]=function(t){return String(t.nodeName).toLowerCase()===e.toLowerCase()}),n[e]},t.matchesNodeAttr=function(e){return i[e]||(i[e]=function(t){return!!t.hasAttribute&&t.hasAttribute(e)}),i[e]},t.closest=function(e,t){for(;e&&!t(e);)e=e.parentNode;return e},t.draggableFromPoint=function(e,r){if(a.isDocumentAvailable()){var n=document.elementFromPoint(e,r);if(n){var i=n.hasAttribute("kendoDraggable"),o=null!==t.closest(n,t.matchesNodeAttr("kendoDraggable")),s=t.closest(n,t.matchesNodeAttr("kendoDraggable"));return{element:n,index:s?parseInt(s.getAttribute("data-sortable-index"),10):-1,isDraggable:i,isDraggableChild:o,parentDraggable:s,rect:n.getBoundingClientRect()}}}},t.draggableFromEvent=function(e,r){var a;if(e.changedTouches){var n=e.changedTouches[0];a=t.draggableFromPoint(n.clientX,n.clientY)}else a=t.draggableFromPoint(e.clientX,e.clientY);return r.draggables.toArray()[a?a.index:-1]},t.isFocusable=function(e){if(e.tagName){var t=e.tagName.toLowerCase(),r=e.getAttribute("tabIndex"),a="-1"===r,n=null!==r&&!a;return o.test(t)&&(n=!e.disabled&&!a),n}return!1};var s=function(e){return String(e).trim().split(" ")};t.hasClasses=function(e,t){var r=s(t);return Boolean(s(e.className).find(function(e){return r.indexOf(e)>=0}))};var l=t.matchesNodeName("kendo-sortable");t.widgetTarget=function(e){var r=t.closest(e,function(e){return t.hasClasses(e,"k-widget")||l(e)});return r&&!l(r)};var d=function(){if(!a.isDocumentAvailable())return!1;var e=document.createElement("div");e.style.transform="matrix(10, 0, 0, 10, 0, 0)",e.innerHTML='<div style="position: fixed; top: 10px;">child</div>',document.body.appendChild(e);var t=10!==e.children[0].getBoundingClientRect().top;return document.body.removeChild(e),t}();t.relativeContextElement=function(e){if(!e||!d)return null;for(var t=e.parentElement;t;){if("none"!==window.getComputedStyle(t).transform)return t;t=t.parentElement}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(r(3).PreventableEvent);t.NavigateEvent=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(r(3).PreventableEvent);t.DraggableEvent=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(r(3).PreventableEvent);t.DragStartEvent=n;var i=function(e){function t(t){var r=e.call(this,t)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(n);t.DragOverEvent=i;var o=function(e){function t(t){var r=e.call(this,t)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(i);t.DragEndEvent=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=r(4),o=r(5),s=r(15),l=r(7),d=function(){function e(e,t){this.sortable=e,this.sortableService=t,this.sortableService=t}return Object.defineProperty(e.prototype,"data",{set:function(e){this.sortable.data=e},enumerable:!0,configurable:!0}),e.prototype.nextEnabledIndex=function(e,t){for(var r=e;r<=t.data.length;r++)if(t.itemEnabled(r))return r},e.prototype.addItem=function(e,t){var r=e.index,a=this.sortableService.getSource().data[e.oldIndex],n=new s.DataAddEvent({index:r,dataItem:a});return t.dataAdd.emit(n),n.isDefaultPrevented()||t.addDataItem(a,r),!n.isDefaultPrevented()},e.prototype.removeItem=function(e,t){var r=this.sortableService.originDraggable,a=new s.DataRemoveEvent({index:e.oldIndex,dataItem:t.data[e.oldIndex]});return t.dataRemove.emit(a),a.isDefaultPrevented()||(r&&r.parent===t?t.hideItem(e.oldIndex,!0):t.removeDataItem(e.oldIndex)),!a.isDefaultPrevented()},e.prototype.moveItem=function(e,t){if(e.index===e.oldIndex)return!1;var r=new s.DataMoveEvent({dataItem:t.data[e.oldIndex],index:e.index,oldIndex:e.oldIndex});return t.dataMove.emit(r),r.isDefaultPrevented()||t.moveItem(e.oldIndex,e.index),!r.isDefaultPrevented()},e.prototype.removeOriginDraggable=function(){var e=this;this.removeHiddenSubscription&&this.removeHiddenSubscription.unsubscribe(),this.removeHiddenSubscription=this.sortableService.onReleaseSubject.pipe(l.take(1),l.filter(function(t){return null!==e.sortableService.originDraggable&&e.sortableService.originDraggable.hidden})).subscribe(function(t){var r=e.sortableService.originDraggable,a=e.sortableService.getSource();r.parent!==e.sortableService.target&&((!!t.target&&(t.target.isDraggable||t.target.isDraggableChild)||r.parent!==a)&&r.parent!==e.sortableService.target&&r.parent.removeDataItem(r.index),e.sortableService.originDraggable=null)})},e.prototype.onDragOver=function(e){var t=this.sortableService.getSource(),r=this.sortableService.target;e.isDefaultPrevented()||(e.preventDefault(),r===t?this.moveItem(e,r):(r.itemEnabled(e.index)||(e.index=this.nextEnabledIndex(e.index,r)),this.addItem(e,r)&&this.removeItem(e,t)&&(this.removeOriginDraggable(),r.activeIndex=e.index,t.activeIndex=-1)))},e.prototype.onNavigate=function(e){if(e.ctrlKey){var t=new s.DataMoveEvent({dataItem:this.sortable.data[e.oldIndex],index:e.index,oldIndex:e.oldIndex});this.sortable.dataMove.emit(t),t.isDefaultPrevented()||this.sortable.moveItem(e.oldIndex,e.index)}else this.sortable.activeIndex=e.index},e.prototype.ngOnInit=function(){this.dragOverSubscription=this.sortable.dragOver.subscribe(this.onDragOver.bind(this)),this.navigateSubscription=this.sortable.navigate.subscribe(this.onNavigate.bind(this))},e.prototype.ngOnDestroy=function(){this.dragOverSubscription.unsubscribe(),this.navigateSubscription.unsubscribe(),this.removeHiddenSubscription&&this.removeHiddenSubscription.unsubscribe()},a.__decorate([n.Input("kendoSortableBinding"),a.__metadata("design:type",Array),a.__metadata("design:paramtypes",[Array])],e.prototype,"data",null),e=a.__decorate([n.Directive({selector:"[kendoSortableBinding]"}),a.__metadata("design:paramtypes",[i.SortableComponent,o.SortableService])],e)}();t.SortableBindingDirective=d},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(3),i=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(n.PreventableEvent);t.DataAddEvent=i;var o=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(n.PreventableEvent);t.DataRemoveEvent=o;var s=function(e){function t(t){var r=e.call(this)||this;return Object.assign(r,t),r}return a.__extends(t,e),t}(n.PreventableEvent);t.DataMoveEvent=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(4);t.SortableComponent=a.SortableComponent;var n=r(19);t.SortableModule=n.SortableModule;var i=r(3);t.PreventableEvent=i.PreventableEvent;var o=r(12);t.DraggableEvent=o.DraggableEvent;var s=r(13);t.DragStartEvent=s.DragStartEvent,t.DragEndEvent=s.DragEndEvent,t.DragOverEvent=s.DragOverEvent;var l=r(11);t.NavigateEvent=l.NavigateEvent;var d=r(15);t.DataMoveEvent=d.DataMoveEvent;var c=r(8);t.DraggableDirective=c.DraggableDirective;var u=r(14);t.SortableBindingDirective=u.SortableBindingDirective;var p=r(2);t.PlaceholderTemplateDirective=p.PlaceholderTemplateDirective;var g=r(2);t.ItemTemplateDirective=g.ItemTemplateDirective;var v=r(5);t.SortableService=v.SortableService},function(e,t){e.exports=i},function(e,t){e.exports=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),n=r(1),i=r(20),o=r(4),s=r(5),l=r(8),d=r(2),c=r(2),u=r(14),p=[o.SortableComponent,l.DraggableDirective,d.PlaceholderTemplateDirective,c.ItemTemplateDirective,u.SortableBindingDirective],g=function(){function e(){}return e=a.__decorate([n.NgModule({declarations:[p],exports:[p],imports:[i.CommonModule],providers:[s.SortableService]})],e)}();t.SortableModule=g},function(e,t){e.exports=s}])});