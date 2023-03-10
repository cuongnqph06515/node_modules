/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var drag_and_drop_service_1 = require("./drag-and-drop.service");
var drag_hint_service_1 = require("./drag-hint.service");
var drop_cue_service_1 = require("./drop-cue.service");
var utils_1 = require("../utils");
var navigation_service_1 = require("../navigation/navigation.service");
var operators_1 = require("rxjs/operators");
var dom_queries_1 = require("../rendering/common/dom-queries");
// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
var preventOnDblClick = function (release) { return function (mouseDown) {
    return rxjs_1.of(mouseDown).pipe(operators_1.delay(150), operators_1.takeUntil(release));
}; };
var ɵ0 = preventOnDblClick;
exports.ɵ0 = ɵ0;
var hasClass = function (className) { return function (el) { return new RegExp("(^| )" + className + "( |$)").test(el.className); }; };
var ɵ1 = hasClass;
exports.ɵ1 = ɵ1;
var isDeleteButton = utils_1.or(hasClass("k-i-group-delete"), hasClass("k-button-icon"));
var isSortIcon = utils_1.or(hasClass("k-i-sort-asc-sm"), hasClass("k-i-sort-desc-sm"));
var skipButtons = utils_1.and(utils_1.not(isDeleteButton), utils_1.not(isSortIcon), utils_1.not(dom_queries_1.isFocusableWithTabKey), utils_1.not(dom_queries_1.matchesNodeName("label")));
var elementUnderCursor = function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY;
    return document.elementFromPoint(clientX, clientY);
};
var ɵ2 = elementUnderCursor;
exports.ɵ2 = ɵ2;
var hideThenShow = function (element, cont) {
    element.style.display = 'none';
    var result = cont();
    element.style.display = 'block';
    return result;
};
var ɵ3 = hideThenShow;
exports.ɵ3 = ɵ3;
/**
 * @hidden
 */
var DraggableColumnDirective = /** @class */ (function () {
    function DraggableColumnDirective(draggable, element, zone, service, hint, cue, nav, renderer) {
        this.draggable = draggable;
        this.element = element;
        this.zone = zone;
        this.service = service;
        this.hint = hint;
        this.cue = cue;
        this.nav = nav;
        this.renderer = renderer;
        this.context = {};
        this.drag = new core_1.EventEmitter();
        this.subscriptions = new rxjs_1.Subscription();
    }
    Object.defineProperty(DraggableColumnDirective.prototype, "enableDrag", {
        set: function (enabled) {
            this.enabled = enabled;
            this.updateTouchAction();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableColumnDirective.prototype, "hostClass", {
        get: function () {
            return this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    DraggableColumnDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.zone.runOutsideAngular(function () {
            return _this.draggable.kendoPress.pipe(operators_1.filter(function (_) { return _this.enabled; }), operators_1.filter(function (_a) {
                var target = _a.originalEvent.target;
                return target === _this.element.nativeElement || skipButtons(target);
            }), operators_1.tap(function (e) {
                var originalEvent = e.originalEvent;
                if (!e.isTouch) {
                    originalEvent.preventDefault();
                }
                _this.nav.navigateTo(originalEvent.target);
            }), operators_1.switchMap(preventOnDblClick(_this.draggable.kendoRelease)), operators_1.tap(function (down) {
                _this.hint.create(down, _this.element.nativeElement, _this.context.hint);
                _this.cue.create();
            }), operators_1.switchMap(function (down) {
                return _this.draggable.kendoDrag.pipe(operators_1.tap(function (e) {
                    if (e.isTouch) {
                        e.originalEvent.preventDefault();
                    }
                }), operators_1.tap(_this.hint.attach()), operators_1.tap(_this.cue.attach()), operators_1.takeUntil(_this.draggable.kendoRelease), operators_1.map(function (move) { return ({ move: move, down: down }); }));
            }), operators_1.tap(_this.performDrag.bind(_this)), operators_1.switchMapTo(_this.draggable.kendoRelease)).subscribe(_this.drop.bind(_this));
        }));
    };
    DraggableColumnDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    DraggableColumnDirective.prototype.drop = function (upEvent) {
        this.hint.remove();
        this.cue.remove();
        this.service.notifyDrop(this, upEvent);
    };
    DraggableColumnDirective.prototype.performDrag = function (_a) {
        var move = _a.move;
        this.hint.move(move);
        var cursorElement = this.elementUnderCursor(move);
        if (cursorElement) {
            this.service.notifyDrag(this, cursorElement, move);
        }
        this.drag.emit({
            draggable: this,
            mouseEvent: move
        });
    };
    DraggableColumnDirective.prototype.elementUnderCursor = function (mouseEvent) {
        this.hint.hide();
        var target = elementUnderCursor(mouseEvent);
        if (target && /k-grouping-dropclue/.test(target.className)) {
            target = hideThenShow(target, elementUnderCursor.bind(this, mouseEvent));
        }
        this.hint.show();
        return target;
    };
    DraggableColumnDirective.prototype.updateTouchAction = function () {
        if (!this.element) {
            return;
        }
        this.renderer.setStyle(this.element.nativeElement, 'touch-action', this.enabled ? 'none' : '');
    };
    DraggableColumnDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDraggableColumn]'
                },] },
    ];
    /** @nocollapse */
    DraggableColumnDirective.ctorParameters = function () { return [
        { type: kendo_angular_common_1.DraggableDirective, decorators: [{ type: core_1.Host }] },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: drag_and_drop_service_1.DragAndDropService },
        { type: drag_hint_service_1.DragHintService },
        { type: drop_cue_service_1.DropCueService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.Renderer2 }
    ]; };
    DraggableColumnDirective.propDecorators = {
        context: [{ type: core_1.Input }],
        enableDrag: [{ type: core_1.Input }],
        drag: [{ type: core_1.Output }],
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-grid-draggable-header',] }]
    };
    return DraggableColumnDirective;
}());
exports.DraggableColumnDirective = DraggableColumnDirective;
