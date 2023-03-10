import { Component, HostBinding, Input, ElementRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { getCenterOffset } from '../utils';
/**
 * @hidden
 */
var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(content, localizationService) {
        this.content = content;
        this.localizationService = localizationService;
        this.close = new EventEmitter();
        this.tooltipWidth = null;
        this.tooltipHeight = null;
        this.callout = true;
        this.calloutStyles = function (position, calloutSize, isFlip) {
            var styles = {};
            var isVertical = position === 'top' || position === 'bottom';
            var flipDeg = '180deg';
            var zeroDeg = '0deg';
            if (!isFlip) {
                styles.transform = isVertical ? "rotateX(" + zeroDeg + ")" : "rotateY(" + zeroDeg + ")";
                return styles;
            }
            if (position === 'top') {
                styles.bottom = 'unset';
            }
            else if (position === 'bottom') {
                styles.top = 'unset';
            }
            else if (position === 'left') {
                styles.right = 'unset';
            }
            else if (position === 'right') {
                styles.left = 'unset';
            }
            styles[position] = -calloutSize + "px";
            styles.transform = isVertical ? "rotateX(" + flipDeg + ")" : "rotateY(" + flipDeg + ")";
            return styles;
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            return 'k-widget k-tooltip';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContentComponent.prototype, "className", {
        get: function () {
            return this.closable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContentComponent.prototype, "cssPosition", {
        get: function () {
            return 'relative';
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dynamicRTLSubscription = this.localizationService.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
    };
    TooltipContentComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    TooltipContentComponent.prototype.calloutPositionClass = function () {
        return {
            'top': 'k-callout-s',
            'left': 'k-callout-e',
            'bottom': 'k-callout-n',
            'right': 'k-callout-w'
        }[this.position];
    };
    TooltipContentComponent.prototype.onCloseClick = function (event) {
        event.preventDefault();
        this.close.emit();
    };
    TooltipContentComponent.prototype.updateCalloutPosition = function (position, isFlip) {
        if (!this.callout) {
            return;
        }
        var callout = this.content.nativeElement.querySelector('.k-callout');
        var isVertical = position === 'top' || position === 'bottom';
        var size = isVertical ? 'width' : 'height';
        var dir = isVertical ? 'left' : 'top';
        var offsetProperty = isVertical ? 'marginLeft' : 'marginTop';
        var calloutSize = callout.getBoundingClientRect()[size];
        var anchorCenter = getCenterOffset(this.anchor.nativeElement, dir, size);
        var contentCenter = getCenterOffset(this.content.nativeElement, dir, size);
        var diff = Math.abs(contentCenter - anchorCenter);
        if (diff > 1 || diff === 0 || Math.round(diff) === 0) {
            var newMargin = contentCenter - anchorCenter + (calloutSize / 2);
            callout.style[offsetProperty] = -newMargin + "px";
        }
        var calloutStyles = this.calloutStyles(position, calloutSize, isFlip);
        Object.keys(calloutStyles).forEach(function (style) {
            callout.style[style] = calloutStyles[style];
        });
    };
    TooltipContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-tooltip',
                    template: "\n        <div class=\"k-tooltip-title\" *ngIf=\"titleTemplate\">\n            <ng-template\n                [ngIf]=\"titleTemplate\"\n                [ngTemplateOutlet]=\"titleTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: anchor, anchor: anchor }\">\n            </ng-template>\n        </div>\n        <div *ngIf=\"closable\" class=\"k-tooltip-button\" (click)=\"onCloseClick($event)\">\n            <a href=\"#\" class=\"k-icon k-i-close\" title=\"Close\"></a>\n        </div>\n\n        <div class=\"k-tooltip-content\">\n            <ng-template\n                [ngIf]=\"templateRef\"\n                [ngTemplateOutlet]=\"templateRef\"\n                [ngTemplateOutletContext]=\"{ $implicit: anchor, anchor: anchor }\">\n            </ng-template>\n            <ng-template\n                [ngIf]=\"templateString\">\n                {{ templateString }}\n            </ng-template>\n        </div>\n        <div class=\"k-callout\" *ngIf=\"callout\" [ngClass]=\"calloutPositionClass()\"></div>\n    ",
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.tooltip'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    TooltipContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: LocalizationService }
    ]; };
    TooltipContentComponent.propDecorators = {
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        close: [{ type: Output }],
        cssClasses: [{ type: HostBinding, args: ['class',] }],
        className: [{ type: HostBinding, args: ['class.k-tooltip-closable',] }],
        cssPosition: [{ type: HostBinding, args: ['style.position',] }],
        tooltipWidth: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
        tooltipHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
        titleTemplate: [{ type: Input }],
        anchor: [{ type: Input }],
        closable: [{ type: Input }],
        templateRef: [{ type: Input }],
        templateString: [{ type: Input }]
    };
    return TooltipContentComponent;
}());
export { TooltipContentComponent };
