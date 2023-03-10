import { Component, HostBinding, Input, ElementRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { getCenterOffset } from '../utils';
/**
 * @hidden
 */
export class TooltipContentComponent {
    constructor(content, localizationService) {
        this.content = content;
        this.localizationService = localizationService;
        this.close = new EventEmitter();
        this.tooltipWidth = null;
        this.tooltipHeight = null;
        this.callout = true;
        this.calloutStyles = (position, calloutSize, isFlip) => {
            const styles = {};
            const isVertical = position === 'top' || position === 'bottom';
            const flipDeg = '180deg';
            const zeroDeg = '0deg';
            if (!isFlip) {
                styles.transform = isVertical ? `rotateX(${zeroDeg})` : `rotateY(${zeroDeg})`;
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
            styles[position] = `${-calloutSize}px`;
            styles.transform = isVertical ? `rotateX(${flipDeg})` : `rotateY(${flipDeg})`;
            return styles;
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    get cssClasses() {
        return 'k-widget k-tooltip';
    }
    get className() {
        return this.closable;
    }
    get cssPosition() {
        return 'relative';
    }
    ngOnInit() {
        this.dynamicRTLSubscription = this.localizationService.changes
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    calloutPositionClass() {
        return {
            'top': 'k-callout-s',
            'left': 'k-callout-e',
            'bottom': 'k-callout-n',
            'right': 'k-callout-w'
        }[this.position];
    }
    onCloseClick(event) {
        event.preventDefault();
        this.close.emit();
    }
    updateCalloutPosition(position, isFlip) {
        if (!this.callout) {
            return;
        }
        const callout = this.content.nativeElement.querySelector('.k-callout');
        const isVertical = position === 'top' || position === 'bottom';
        const size = isVertical ? 'width' : 'height';
        const dir = isVertical ? 'left' : 'top';
        const offsetProperty = isVertical ? 'marginLeft' : 'marginTop';
        const calloutSize = callout.getBoundingClientRect()[size];
        const anchorCenter = getCenterOffset(this.anchor.nativeElement, dir, size);
        const contentCenter = getCenterOffset(this.content.nativeElement, dir, size);
        const diff = Math.abs(contentCenter - anchorCenter);
        if (diff > 1 || diff === 0 || Math.round(diff) === 0) {
            const newMargin = contentCenter - anchorCenter + (calloutSize / 2);
            callout.style[offsetProperty] = `${-newMargin}px`;
        }
        const calloutStyles = this.calloutStyles(position, calloutSize, isFlip);
        Object.keys(calloutStyles).forEach((style) => {
            callout.style[style] = calloutStyles[style];
        });
    }
}
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-tooltip',
                template: `
        <div class="k-tooltip-title" *ngIf="titleTemplate">
            <ng-template
                [ngIf]="titleTemplate"
                [ngTemplateOutlet]="titleTemplate"
                [ngTemplateOutletContext]="{ $implicit: anchor, anchor: anchor }">
            </ng-template>
        </div>
        <div *ngIf="closable" class="k-tooltip-button" (click)="onCloseClick($event)">
            <a href="#" class="k-icon k-i-close" title="Close"></a>
        </div>

        <div class="k-tooltip-content">
            <ng-template
                [ngIf]="templateRef"
                [ngTemplateOutlet]="templateRef"
                [ngTemplateOutletContext]="{ $implicit: anchor, anchor: anchor }">
            </ng-template>
            <ng-template
                [ngIf]="templateString">
                {{ templateString }}
            </ng-template>
        </div>
        <div class="k-callout" *ngIf="callout" [ngClass]="calloutPositionClass()"></div>
    `,
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
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: LocalizationService }
];
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
