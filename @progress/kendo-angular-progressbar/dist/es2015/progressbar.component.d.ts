import { AnimationEndEvent } from './types/animation-end-event';
import { ProgressBarBase } from './common/progressbar-base';
import { NgZone, Renderer2, EventEmitter, SimpleChanges } from '@angular/core';
import { LabelSettings } from './types/label-settings.interface';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { AnimationSettings } from './types/animation-settings.interface';
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
export declare class ProgressBarComponent extends ProgressBarBase {
    localization: LocalizationService;
    private zone;
    private renderer;
    /**
     * Determines whether the status label will be visible.
     * Defaults to `true` - the label will be visible and displayed with the default
     * `LabelSettings` - position: `end` and format: `value`
     */
    label: boolean | LabelSettings;
    /**
     * The CSS styles that will be rendered on the inner element that represents the full portion of the progress bar ([see example]({% slug progressbar_appearance %})).
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    progressCssStyle: {
        [key: string]: string;
    };
    /**
     * The CSS classes that will be rendered on the inner element that represents the full portion of the progress bar ([see example]({% slug progressbar_appearance %})).
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    progressCssClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * The CSS styles that will be rendered on the inner element that represents the empty portion of the progress bar ([see example]({% slug progressbar_appearance %})).
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    emptyCssStyle: {
        [key: string]: string;
    };
    /**
     * The CSS classes that will be rendered on the inner element that represents the empty portion of the progress bar ([see example]({% slug progressbar_appearance %})).
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    emptyCssClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * The animation configuration of the ProgressBar.
     * Defaults to `false`
     */
    animation: boolean | AnimationSettings;
    /**
     * The event is fired when the animation indicating the latest value change is finished.
     */
    animationEnd: EventEmitter<AnimationEndEvent>;
    /**
     * @hidden
     */
    readonly showLabel: boolean;
    /**
     * @hidden
     */
    readonly labelPosition: string;
    /**
     * @hidden
     */
    readonly isPositionStart: boolean;
    /**
     * @hidden
     */
    readonly isPositionCenter: boolean;
    /**
     * @hidden
     */
    readonly isPositionEnd: boolean;
    /**
     * @hidden
     */
    readonly formattedLabelValue: string;
    private progressStatusElement;
    private progressStatusWrapperElement;
    private animationStartSubscription;
    private animationFrame;
    /**
     * @hidden
     */
    constructor(localization: LocalizationService, zone: NgZone, renderer: Renderer2);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    protected startAnimation(previousValue: number): void;
    /**
     * @hidden
     */
    protected readonly animationDuration: number;
    private animate;
}
