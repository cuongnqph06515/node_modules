import { Component, EventEmitter, HostBinding, Input, NgModule, NgZone, Output, Renderer2, ViewChild, isDevMode } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { hasObservers } from '@progress/kendo-angular-common';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
const MIN_MAX_ERROR_MESSAGE = `The max value should be greater than the min.`;
/**
 * @hidden
 */
const LABEL_DECIMALS = 3;
/**
 * @hidden
 */
const MIN_RATIO = 0.00001;

/**
 * @hidden
 */
const reverseChunks = (orientation, reverse) => (orientation === 'vertical' && !reverse || orientation === 'horizontal' && reverse);
/**
 * @hidden
 */
const formatValue = (value, min, max, label) => {
    const defaultFormattedValue = truncateNumber(value);
    if (typeof label !== 'boolean') {
        if (typeof label.format === 'string') {
            switch (label.format) {
                case 'value':
                    return defaultFormattedValue;
                case 'percent':
                    return `${Math.floor(calculatePercentage(value, min, max))}%`;
                default:
                    return defaultFormattedValue;
            }
        }
        else if (typeof label.format === 'function') {
            return label.format(value);
        }
        else {
            return defaultFormattedValue;
        }
    }
    return defaultFormattedValue;
};
/**
 * @hidden
 */
const validateRange = (min, max) => {
    if (isDevMode && min > max) {
        throw new Error(MIN_MAX_ERROR_MESSAGE);
    }
};
/**
 * @hidden
 */
const adjustValueToRange = (min, max, value) => Math.max(Math.min(value, max), min);
/**
 * @hidden
 */
const calculatePercentage = (value, min, max) => {
    const onePercent = Math.abs((max - min) / 100);
    return Math.abs((value - min) / onePercent);
};
/**
 * @hidden
 */
const truncateNumber = (value) => {
    const numberParts = value.toString().split('.');
    return numberParts.length === 1 ? `${numberParts[0]}` : `${numberParts[0]}.${numberParts[1].substr(0, LABEL_DECIMALS)}`;
};
/**
 * @hidden
 */
const calculateRatio = (min, max, value) => Math.max((value - min) / (max - min), MIN_RATIO);
/**
 * @hidden
 */
const extractValueFromChanges = (changes, type, value) => changes[type] && changes[type].currentValue !== undefined ? changes[type].currentValue : value;
/**
 * @hidden
 */
const runAnimation = (changes, animation, previousValue, displayValue) => animation && changes.value && previousValue !== displayValue;

/**
 * @hidden
 */
class ProgressBarBase {
    /**
     * @hidden
     */
    constructor(localization) {
        this.localization = localization;
        this.widgetClasses = true;
        this.roleAttribute = 'progressbar';
        /**
         * The maximum value of the ProgressBar.
         * Defaults to `100`.
         */
        this.max = 100;
        /**
         * The minimum value of the ProgressBar.
         * Defaults to `0`.
         */
        this.min = 0;
        /**
         * The value of the ProgressBar.
         * Has to be between `min` and `max`.
         *
         * By default, the value will be equal to the `min` value.
         */
        /**
         * The value of the ProgressBar.
         * Has to be between `min` and `max`.
         *
         * By default, the value will be equal to the 0.
         */
        this.value = 0;
        /**
         * Defines the orientation of the ProgressBar
         * ([see example]({% slug progressbar_orientation %})).
         * Defaults to `horizontal`.
         */
        this.orientation = 'horizontal';
        /**
         * If set to `true`, the ProgressBar will be disabled
         * ([see example]({% slug progressbar_disabled %})).
         * It will still allow you to change its value.
         * Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If set to `true`, the ProgressBar will be reversed
         * ([see example]({% slug progressbar_direction %})).
         * Defaults to `false`.
         */
        this.reverse = false;
        /**
         * Sets the `indeterminate` state of the ProgressBar.
         * Defaults to `false`.
         */
        this.indeterminate = false;
        this.displayValue = 0;
        this.previousValue = 0;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    get isHorizontal() {
        return this.orientation === 'horizontal';
    }
    get isVertical() {
        return this.orientation === 'vertical';
    }
    get disabledClass() {
        return this.disabled;
    }
    get reverseClass() {
        return this.reverse;
    }
    get indeterminateClass() {
        return this.indeterminate;
    }
    get dirAttribute() {
        return this.direction;
    }
    get ariaMinAttribute() {
        return String(this.min);
    }
    get ariaMaxAttribute() {
        return String(this.max);
    }
    get ariaValueAttribute() {
        return this.indeterminate ? undefined : String(this.displayValue);
    }
    /**
     * @hidden
     */
    get isCompleted() {
        return this.value === this.max;
    }
    /**
     * @hidden
     */
    get statusWidth() {
        return this.orientation === 'horizontal' ? this._progressRatio * 100 : 100;
    }
    /**
     * @hidden
     */
    get statusHeight() {
        return this.orientation === 'vertical' ? this._progressRatio * 100 : 100;
    }
    /**
     * @hidden
     */
    get statusWrapperWidth() {
        return this.orientation === 'horizontal' ? 100 / this._progressRatio : 100;
    }
    /**
     * @hidden
     */
    get statusWrapperHeight() {
        return this.orientation === 'vertical' ? 100 / this._progressRatio : 100;
    }
    get _progressRatio() {
        return calculateRatio(this.min, this.max, this.displayValue);
    }
    ngOnChanges(changes) {
        const min = extractValueFromChanges(changes, 'min', this.min);
        const max = extractValueFromChanges(changes, 'max', this.max);
        const value = extractValueFromChanges(changes, 'value', this.value);
        if (changes.min || changes.max || changes.value) {
            if (changes.min || changes.max) {
                validateRange(min, max);
            }
            if (changes.value) {
                if (value == null || Number.isNaN(value)) {
                    this.value = min;
                }
                const previousValue = this.displayValue;
                this.displayValue = adjustValueToRange(this.min, this.max, value);
                if (previousValue !== this.displayValue) {
                    this.previousValue = previousValue;
                }
            }
            this.min = min;
            this.max = max;
            this.displayValue = adjustValueToRange(this.min, this.max, value);
        }
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
}
ProgressBarBase.propDecorators = {
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-progressbar',] }],
    isHorizontal: [{ type: HostBinding, args: ['class.k-progressbar-horizontal',] }],
    isVertical: [{ type: HostBinding, args: ['class.k-progressbar-vertical',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    reverseClass: [{ type: HostBinding, args: ['class.k-progressbar-reverse',] }],
    indeterminateClass: [{ type: HostBinding, args: ['class.k-progressbar-indeterminate',] }],
    dirAttribute: [{ type: HostBinding, args: ['attr.dir',] }],
    roleAttribute: [{ type: HostBinding, args: ['attr.role',] }],
    ariaMinAttribute: [{ type: HostBinding, args: ['attr.aria-valuemin',] }],
    ariaMaxAttribute: [{ type: HostBinding, args: ['attr.aria-valuemax',] }],
    ariaValueAttribute: [{ type: HostBinding, args: ['attr.aria-valuenow',] }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    value: [{ type: Input }],
    orientation: [{ type: Input }],
    disabled: [{ type: Input }],
    reverse: [{ type: Input }],
    indeterminate: [{ type: Input }]
};

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
class ProgressBarComponent extends ProgressBarBase {
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

/**
 * Represents the [Kendo UI ChunkProgressBar component for Angular]({% slug overview_chunkprogressbar %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-chunkprogressbar [value]="value">
 *        </kendo-chunkprogressbar>
 *    `
 * })
 * class AppComponent {
 *     public value = 40;
 * }
 * ```
 */
class ChunkProgressBarComponent extends ProgressBarBase {
    /**
     * @hidden
     */
    constructor(localization) {
        super(localization);
        this.localization = localization;
        /**
         * Sets the number of chunks into which the ChunkProgressBar will be split.
         * Defaults to `5`.
         */
        this.chunkCount = 5;
        this._orientationStyles = {
            width: `${this.chunkSizePercentage}%`
        };
    }
    /**
     * @hidden
     */
    get chunks() {
        const count = this.chunkCount;
        const chunks = Array(count).fill(false);
        const completedChunks = Math.floor(this._progressRatio * count);
        for (let i = 0; i < completedChunks; i++) {
            chunks[i] = true;
        }
        if (reverseChunks(this.orientation, this.reverse)) {
            chunks.reverse();
        }
        return chunks;
    }
    /**
     * @hidden
     */
    get chunkSizePercentage() {
        return 100 / this.chunkCount;
    }
    /**
     * @hidden
     */
    get orientationStyles() {
        if (this.orientation === 'horizontal') {
            this._orientationStyles.width = `${this.chunkSizePercentage}%`;
            this._orientationStyles.height = undefined;
        }
        else {
            this._orientationStyles.height = `${this.chunkSizePercentage}%`;
            this._orientationStyles.width = undefined;
        }
        return this._orientationStyles;
    }
}
ChunkProgressBarComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoChunkProgressBar',
                selector: 'kendo-chunkprogressbar',
                template: `
        <ul class="k-reset">
            <li class="k-item" *ngFor="let chunk of chunks; let i = index;"
                [class.k-first]="i === 0"
                [class.k-last]="i === chunkCount - 1"
                [class.k-state-selected]="chunk"
                [ngClass]="chunk ? progressCssClass : emptyCssClass"
                [ngStyle]="chunk ? progressCssStyle : emptyCssStyle"
                [style.width]="orientationStyles.width"
                [style.height]="orientationStyles.height"
                >
            </li>
        </ul>
    `,
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chunkprogressbar'
                    }
                ]
            },] },
];
/** @nocollapse */
ChunkProgressBarComponent.ctorParameters = () => [
    { type: LocalizationService }
];
ChunkProgressBarComponent.propDecorators = {
    chunkCount: [{ type: Input }],
    progressCssStyle: [{ type: Input }],
    progressCssClass: [{ type: Input }],
    emptyCssStyle: [{ type: Input }],
    emptyCssClass: [{ type: Input }]
};

const COMPONENT_DIRECTIVES = [ProgressBarComponent, ChunkProgressBarComponent];
const MODULES = [CommonModule];
/**
 * @hidden
 */
class ProgressBarModule {
}
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: COMPONENT_DIRECTIVES,
                exports: COMPONENT_DIRECTIVES,
                imports: MODULES
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressBarBase, ProgressBarComponent, ChunkProgressBarComponent, ProgressBarModule };
