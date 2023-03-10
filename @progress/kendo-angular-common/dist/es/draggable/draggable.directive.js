/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, Directive, Output, NgZone, Input } from '@angular/core';
import { isDocumentAvailable, isChanged } from '../utils';
import Draggable from '@telerik/kendo-draggable';
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.enableDrag = true;
        this.kendoPress = new EventEmitter();
        this.kendoDrag = new EventEmitter();
        this.kendoRelease = new EventEmitter();
    }
    DraggableDirective.prototype.ngOnInit = function () {
        this.toggleDraggable();
    };
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (isChanged('enableDrag', changes)) {
            this.toggleDraggable();
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this.destroyDraggable();
    };
    DraggableDirective.prototype.toggleDraggable = function () {
        var _this = this;
        if (isDocumentAvailable()) {
            this.destroyDraggable();
            if (this.enableDrag) {
                this.draggable = new Draggable({
                    drag: function (e) { return _this.kendoDrag.next(e); },
                    press: function (e) { return _this.kendoPress.next(e); },
                    release: function (e) { return _this.kendoRelease.next(e); }
                });
                this.ngZone.runOutsideAngular(function () { return _this.draggable.bindTo(_this.element.nativeElement); });
            }
        }
    };
    DraggableDirective.prototype.destroyDraggable = function () {
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    DraggableDirective.propDecorators = {
        enableDrag: [{ type: Input }],
        kendoPress: [{ type: Output }],
        kendoDrag: [{ type: Output }],
        kendoRelease: [{ type: Output }]
    };
    return DraggableDirective;
}());
export { DraggableDirective };
