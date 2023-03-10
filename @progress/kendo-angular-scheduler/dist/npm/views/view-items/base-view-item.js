"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var rxjs_1 = require("rxjs");
var utils_1 = require("../utils");
var kendo_date_math_1 = require("@progress/kendo-date-math");
/**
 * @hidden
 */
var BaseViewItem = /** @class */ (function () {
    function BaseViewItem(slotService, localization, focusService, element, renderer) {
        this.slotService = slotService;
        this.localization = localization;
        this.focusService = focusService;
        this.element = element;
        this.renderer = renderer;
        this.className = true;
        this.subs = new rxjs_1.Subscription();
    }
    Object.defineProperty(BaseViewItem.prototype, "taskIndex", {
        get: function () {
            return this.item.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "touchAction", {
        get: function () {
            return this.editable && this.editable.drag !== false ? 'none' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "eventTitle", {
        get: function () {
            var startTime = kendo_date_math_1.toLocalDate(this.item.startTime);
            var endTime = kendo_date_math_1.toLocalDate(this.item.endTime);
            var time = utils_1.formatEventTime(startTime, endTime, this.item.isAllDay);
            return time + ", " + this.item.event.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "deleteMessage", {
        get: function () {
            return this.localization.get('deleteTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "resizable", {
        get: function () {
            return this.editable && this.editable.resize !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "removable", {
        get: function () {
            return this.editable && this.editable.remove !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "isRecurrence", {
        get: function () {
            return utils_1.isRecurrence(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "isRecurrenceException", {
        get: function () {
            return utils_1.isRecurrenceException(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseViewItem.prototype, "nativeElement", {
        get: function () {
            if (this.element) {
                return this.element.nativeElement;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseViewItem.prototype.setStyles = function (styles) {
        var element = this.nativeElement;
        if (element) {
            for (var name_1 in styles) {
                if (styles.hasOwnProperty(name_1)) {
                    this.renderer.setStyle(element, name_1, styles[name_1]);
                }
            }
        }
    };
    BaseViewItem.prototype.toggle = function (visible) {
        this.setStyles({ display: visible ? 'block' : 'none' });
    };
    BaseViewItem.prototype.reflow = function () {
        var rect = this.rect;
        if (rect) {
            this.setStyles({
                left: !this.localization.rtl ? rect.left + "px" : '',
                right: this.localization.rtl ? rect.left + "px" : '',
                top: rect.top + "px",
                width: rect.width + "px",
                height: rect.height + "px",
                display: 'block'
            });
        }
    };
    BaseViewItem.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dragHint) {
            return;
        }
        this.subs.add(this.slotService.slotsChange.subscribe(function () {
            _this.rect = null;
            _this.setStyles({
                display: 'none',
                width: 0,
                left: 0
            });
            _this.slotService.unregisterItem(_this, _this.resourceIndex, _this.index);
            if (_this.resourceIndex >= 0) {
                _this.slotService.registerItem(_this);
            }
        }));
    };
    BaseViewItem.prototype.ngOnChanges = function (changes) {
        if (this.dragHint) {
            return;
        }
        if (kendo_angular_common_1.anyChanged(['resourceIndex', 'index'], changes)) {
            var resourceIndex = changes.resourceIndex, index = changes.index;
            var previousResourceIndex = resourceIndex ? resourceIndex.previousValue : this.resourceIndex;
            var previousIndex = index ? index.previousValue : this.index;
            this.slotService.unregisterItem(this, previousResourceIndex, previousIndex);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
                this.toggle(true);
            }
            else {
                this.toggle(false);
            }
        }
    };
    BaseViewItem.prototype.ngOnDestroy = function () {
        if (this.dragHint) {
            return;
        }
        this.slotService.unregisterItem(this);
        this.subs.unsubscribe();
    };
    BaseViewItem.propDecorators = {
        item: [{ type: core_1.Input }],
        resourceIndex: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        eventTemplate: [{ type: core_1.Input }],
        editable: [{ type: core_1.Input }],
        dragHint: [{ type: core_1.Input }],
        resources: [{ type: core_1.Input }],
        className: [{ type: core_1.HostBinding, args: ['class.k-event',] }],
        taskIndex: [{ type: core_1.HostBinding, args: ['attr.data-task-index',] }],
        touchAction: [{ type: core_1.HostBinding, args: ['style.touch-action',] }],
        eventTitle: [{ type: core_1.HostBinding, args: ['attr.aria-label',] }]
    };
    return BaseViewItem;
}());
exports.BaseViewItem = BaseViewItem;
