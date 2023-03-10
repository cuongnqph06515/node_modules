/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils");
var kendo_draggable_1 = require("@telerik/kendo-draggable");
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.enableDrag = true;
        this.kendoPress = new core_1.EventEmitter();
        this.kendoDrag = new core_1.EventEmitter();
        this.kendoRelease = new core_1.EventEmitter();
    }
    DraggableDirective.prototype.ngOnInit = function () {
        this.toggleDraggable();
    };
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged('enableDrag', changes)) {
            this.toggleDraggable();
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this.destroyDraggable();
    };
    DraggableDirective.prototype.toggleDraggable = function () {
        var _this = this;
        if (utils_1.isDocumentAvailable()) {
            this.destroyDraggable();
            if (this.enableDrag) {
                this.draggable = new kendo_draggable_1.default({
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    DraggableDirective.propDecorators = {
        enableDrag: [{ type: core_1.Input }],
        kendoPress: [{ type: core_1.Output }],
        kendoDrag: [{ type: core_1.Output }],
        kendoRelease: [{ type: core_1.Output }]
    };
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;
