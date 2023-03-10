"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:align no-empty */
var POSITION_MODE = 'absolute';
var COLLISION = { horizontal: "fit", vertical: "fit" };
/**
 * @hidden
 */
var BaseTooltip = /** @class */ (function () {
    function BaseTooltip(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.style = {};
        this.popupRef = null;
    }
    Object.defineProperty(BaseTooltip.prototype, "active", {
        get: function () {
            return this.popupRef !== null;
        },
        enumerable: true,
        configurable: true
    });
    BaseTooltip.prototype.show = function (e) {
        var align = e.anchor.align;
        var offset = e.anchor.point;
        this.style = e.style;
        if (!this.popupRef) {
            this.popupRef = this.popupService.open(Object.assign({
                offset: offset,
                popupAlign: align,
                animate: this.animate,
                content: this.templateRef,
                collision: COLLISION,
                positionMode: POSITION_MODE
            }, this.popupSettings));
            if (this.localizationService.rtl) {
                this.popupRef.popupElement.setAttribute('dir', 'rtl');
            }
            this.onInit();
        }
        else {
            var popup = this.popupRef.popup.instance;
            popup.offset = offset;
            popup.popupAlign = align;
        }
    };
    BaseTooltip.prototype.hide = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    BaseTooltip.prototype.onInit = function () {
    };
    BaseTooltip.prototype.ngOnDestroy = function () {
        this.hide();
    };
    return BaseTooltip;
}());
exports.BaseTooltip = BaseTooltip;
