import { ProgressBarBase } from './common/progressbar-base';
import { Component, Input, NgZone, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatValue, calculateRatio, runAnimation } from './common/util';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { hasObservers } from '@progress/kendo-angular-common';
/**
 * Represents the [Kendo UI ProgressBar component for Angular]({% slug overview_progressbar %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-progressbar [value]="value">
 *        </kendo-progressbar>
 *    `
 * })
 * class AppComponent {
 *     public value = 50;
 * }
 * ```
 */
export class ProgressBarComponent extends ProgressBarBase {
    /**
     * @hidden
     */
    constructor(localization, zone, renderer) {
        super(localization);
        this.localization = localization;
        this.zone = zone;
        this.renderer = renderer;
        /**
         * Determines whether the status label will be visible.
         * Defaults to `true` - the label will be visible and displayed with the default
         * `LabelSettings` - position: `end` and format: `value`
         */
        this.label = true;
        /**
         * The animation configuration of the ProgressBar.
         * Defaults to `false`
         */
        this.animation = false;
        /**
         * The event is fired when the animation indicating the latest value change is finished.
         */
        this.animationEnd = new EventEmitter();
    }
    /**
     * @hidden
     */
    get showLabel() {
        if (typeof this.label === 'boolean') {
            return this.label;
        }
        else {
            if (this.label && !this.label.hasOwnProperty('visible')) {
                this.label.visible = true;
            }
            return this.label.visible;
        }
    }
    /**
     * @hidden
     */
    get labelPosition() {
        if (typeof this.label === 'boolean') {
            return 'end';
        }
        else {
            if (this.label && !this.label.hasOwnProperty('position')) {
                this.label.position = 'end';
            }
            return this.label.position;
        }
    }
    /**
     * @hidden
     */
    get isPositionStart() {
        return this.labelPosition === 'start';
    }
    /**
     * @hidden
     */
    get isPositionCenter() {
        return this.labelPosition === 'center';
    }
    /**
     * @hidden
     */
    get isPositionEnd() {
        return this.labelPosition === 'end';
    }
    /**
     * @hidden
     */
    get formattedLabelValue() {
        return formatValue(this.displayValue, this.min, this.max, this.label);
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.animation && this.previousValue !== this.displayValue) {
            this.startAnimation(0);
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (runAnimation(changes, this.animation, this.previousValue, this.displayValue)) {
            this.startAnimation(this.previousValue);
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.animationStartSubscription) {
            this.animationStartSubscription.unsubscribe();
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    /**
     * @hidden
     */
    startAnimation(previousValue) {
        this.animate(this.progressStatusElement.nativeElement, previousValue, this.progressStatusWrapperElement.nativeElement);
    }
    /**
     * @hidden
     */
    get animationDuration() {
        if (typeof this.animation === 'boolean') {
            return 400;
        }
        else {
            if (this.animation && !this.animation.hasOwnProperty('duration')) {
                this.animation.duration = 400;
            }
            return this.animation.duration;
        }
    }
    animate(element, previousValue, wrapperElement) {
        const isHorizontal = this.orientation === 'horizontal';
        const previousRatio = calculateRatio(this.min, this.max, previousValue);
        const previousStatusWidth = isHorizontal ? previousRatio * 100 : 100;
        const previousStatusHeight = !isHorizontal ? previousRatio * 100 : 100;
        this.zone.runOutsideAngular(() => {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            const property = isHorizontal ? 'width' : 'height';
            const startTime = new Date().getTime();
            const startSize = isHorizontal ? previousStatusWidth : previousStatusHeight;
            const deltaSize = isHorizontal ? this.statusWidth - previousStatusWidth : this.statusHeight - previousStatusHeight;
            const duration = this.animationDuration * Math.abs((deltaSize / 100));
            const animate = () => {
                const elapsed = new Date().getTime() - startTime;
                const position = Math.min(elapsed / duration, 1);
                const width = startSize + deltaSize * position;
                const wrapperWidth = (100 / width) * 100;
                this.renderer.setStyle(element, property, width + '%');
                this.renderer.setStyle(wrapperElement, property, wrapperWidth + '%');
                if (position < 1) {
                    requestAnimationFrame(animate);
                }
                else {
                    if (hasObservers(this.animationEnd)) {
                        this.animationEnd.emit({
                            from: previousValue,
                            to: this.displayValue
                        });
                    }
                }
            };
            animate();
        });
    }
}
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoProgressBar',
                selector: 'kendo-progressbar',
                template: `
        <span class="k-progress-status-wrap"
            [class.k-progress-start]="isPositionStart"
            [class.k-progress-center]="isPositionCenter"
            [class.k-progress-end]="isPositionEnd"
            [ngStyle]="emptyCssStyle"
            [ngClass]="emptyCssClass">
            <span *ngIf="showLabel" class="k-progress-status">{{formattedLabelValue}}</span>
        </span>
        <div
            #progressStatus
            class="k-state-selected"
            [class.k-complete]="isCompleted"
            [ngStyle]="progressCssStyle"
            [ngClass]="progressCssClass"
            [style.width.%]="statusWidth"
            [style.height.%]="statusHeight"
            >
            <span
                #progressStatusWrap
                class="k-progress-status-wrap"
                [style.width.%]="statusWrapperWidth"
                [style.height.%]="statusWrapperHeight"
                [class.k-progress-start]="isPositionStart"
                [class.k-progress-center]="isPositionCenter"
                [class.k-progress-end]="isPositionEnd"
                >
                <span *ngIf="showLabel" class="k-progress-status">{{formattedLabelValue}}</span>
            </span>
        </div>
       `,
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.progressbar'
                    }
                ]
            },] },
];
/** @nocollapse */
ProgressBarComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: NgZone },
    { type: Renderer2 }
];
ProgressBarComponent.propDecorators = {
    label: [{ type: Input }],
    progressCssStyle: [{ type: Input }],
    progressCssClass: [{ type: Input }],
    emptyCssStyle: [{ type: Input }],
    emptyCssClass: [{ type: Input }],
    animation: [{ type: Input }],
    animationEnd: [{ type: Output }],
    progressStatusElement: [{ type: ViewChild, args: ['progressStatus',] }],
    progressStatusWrapperElement: [{ type: ViewChild, args: ['progressStatusWrap',] }]
};
