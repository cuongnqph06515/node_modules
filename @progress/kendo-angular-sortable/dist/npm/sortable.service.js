"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var util_1 = require("./util");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var allowDrag = function (e) {
    var target = e.originalEvent.target;
    return target.hasAttribute('data-sortable-item') || !(util_1.isFocusable(target) || util_1.widgetTarget(target));
};
var ɵ0 = allowDrag;
exports.ɵ0 = ɵ0;
/**
 * The service that provides the drag-and-drop functionality for
 * transferring items between Sortable components within the same page.
 *
 */
var SortableService = /** @class */ (function () {
    function SortableService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        /**
         * Specifies the Draggable item that is currently being moved.
         */
        this.activeDraggable = null;
        /**
         * Specifies the Draggable item from which the dragging started.
         */
        this.originDraggable = null;
        /**
         * @hidden
         */
        this.targetSortable = null;
        /**
         * Specifies the Draggable item that last emitted an event.
         */
        this.lastDraggable = null;
        /**
         * @hidden
         */
        this.onPressSubject = new rxjs_1.Subject();
        /**
         * @hidden
         */
        this.onDragSubject = new rxjs_1.Subject();
        /**
         * @hidden
         */
        this.onReleaseSubject = new rxjs_1.Subject();
        this.source = null;
        this._target = null;
        this.sortableCounter = 0;
        this.sortableRegister = {};
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.subscriptions = this.onPressSubject.pipe(operators_1.filter(allowDrag), operators_1.tap(function (press) {
            _this.targetSortable = _this.getSortableComponentFromTouch(press);
        }), operators_1.filter(function (_) { return Boolean(_this.targetSortable); }), operators_1.tap(function (press) {
            _this.onReleaseSubject.pipe(operators_1.take(1)).subscribe(function (event) { return _this.release(event); });
            _this.pressArgs = press;
            if (press.isTouch) {
                press.originalEvent.preventDefault();
            }
        }), operators_1.switchMap(function (_drag) {
            return _this.onDragSubject.pipe(operators_1.filter(function (_) { return Boolean(_this.targetSortable); }), //stop further events if dragStart is prevented
            operators_1.tap(function (e) { return _this.drag(e); }));
        })).subscribe();
    }
    Object.defineProperty(SortableService.prototype, "target", {
        get: function () {
            return this._target;
        },
        /**
         * Specifies the `SortableComponent` instance under the currently dragged item.
         */
        set: function (target) {
            this._target = target;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SortableService.prototype.onPress = function (e) {
        this.onPressSubject.next(e);
    };
    /**
     * @hidden
     */
    SortableService.prototype.onDrag = function (e) {
        this.onDragSubject.next(e);
    };
    /**
     * @hidden
     */
    SortableService.prototype.onRelease = function (e) {
        this.onReleaseSubject.next(e);
    };
    /**
     * @hidden
     */
    SortableService.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    /**
     * Registers a `SortableComponent` with which the service operates.
     *
     * @param sortableComponent - The `SortableComponent`.
     * @return - The unique key that the current `SortableComponent` gets when registered.
     */
    SortableService.prototype.registerComponent = function (sortableComponent) {
        var id = this.sortableCounter.toString();
        this.sortableRegister[id] = sortableComponent;
        this.sortableCounter++;
        return id;
    };
    /**
     * Removes a `SortableComponent` from the registered `SortableComponents` with which the service operates.
     *
     * @param key - The key of the `SortableComponent` which will be removed from the register.
     * Obtained when `registerComponent` is called.
     */
    SortableService.prototype.unregisterComponent = function (key) {
        this.sortableRegister[key] = null;
    };
    /**
     * Sets the `SortableComponent` as a source component. When dragging an item from one Sortable to another,
     * the source component is the one from which the item originates.
     *
     * @param sortable - The `SortableComponent`.
     */
    SortableService.prototype.setSource = function (sortable) {
        this.source = sortable;
    };
    /**
     * Returns the source `SortableComponent` from which
     * an item is dragged to other Sortable components.
     *
     * @return - The `SourceComponent`.
     */
    SortableService.prototype.getSource = function () {
        return this.source;
    };
    /**
     * The method that finds the `SortableComponent` which is registered to
     * the `SortableService` by using the arguments of the `touch` event.
     *
     * @param touch - A Touch-Object of the `Touch` type interface.
     * Represents a single contact point (finger or stylus)
     * on a touch-sensitive device (touchscreen or trackpad).
     *
     * @return { component: SortableComponent, index: number } - An object
     * where the component is the `SortableComponent` that owns the item
     * and the index is the index of the touched item.
     */
    SortableService.prototype.getSortableComponentFromTouch = function (touch) {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return { component: undefined, index: undefined };
        }
        var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        while (realTarget) {
            var id = realTarget.getAttribute('data-sortable-id');
            var index = realTarget.getAttribute('data-sortable-index');
            if (id) {
                var targetSortable = this.sortableRegister[id];
                if (targetSortable) {
                    return { component: targetSortable, index: parseInt(index, 10) };
                }
            }
            realTarget = realTarget.parentElement;
        }
    };
    SortableService.prototype.start = function () {
        var pressArgs = this.pressArgs;
        if (pressArgs) {
            this.pressArgs = null;
            var startTarget = util_1.draggableFromEvent(pressArgs, this.targetSortable.component);
            if (this.targetSortable.component.startDrag({ target: startTarget, originalEvent: pressArgs })) {
                this.targetSortable = null;
                return true;
            }
        }
    };
    SortableService.prototype.release = function (event) {
        var _this = this;
        if (this.source) {
            this.ngZone.run(function () {
                if (_this.targetSortable) {
                    var dropTarget = util_1.draggableFromEvent(event, _this.targetSortable.component);
                    _this.source.endDrag({ target: dropTarget, originalEvent: event });
                }
                _this.source.positionHintFromEvent(null);
                _this.source.markForCheck();
            });
        }
        this.targetSortable = null;
        this.pressArgs = null;
    };
    SortableService.prototype.drag = function (event) {
        var _this = this;
        this.ngZone.run(function () {
            if (_this.start()) {
                return;
            }
            _this.source.positionHintFromEvent(event);
            var sortable = _this.getSortableComponentFromTouch(event);
            if (!sortable || sortable && sortable.component !== _this.target) {
                if (_this.target) {
                    _this.target.leave({ target: undefined, originalEvent: event });
                }
                else if (_this.source !== _this.target) {
                    _this.source.leave({ target: undefined, originalEvent: event });
                }
            }
            if (sortable && sortable.component) {
                var draggable = util_1.draggableFromEvent(event, sortable.component);
                sortable.component.drag({ target: draggable, originalEvent: event });
            }
            _this.source.markForCheck();
        });
    };
    SortableService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SortableService.ctorParameters = function () { return [
        { type: core_1.NgZone }
    ]; };
    return SortableService;
}());
exports.SortableService = SortableService;
