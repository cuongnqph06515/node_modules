/**
 * Represents the settings of the animation which indicates the progress status of the ProgressBar.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-progressbar
 *              [value]="value"
 *              [animate]="{duration: duration}">
 *        </kendo-progressbar>
 *    `
 * })
 * class AppComponent {
 *     public value = 50;
 *     public duration = 1000;
 * }
 * ```
 */
export interface AnimationSettings {
    /**
     * The duration of the animation in milliseconds.
     * Defaults to 400
     */
    duration: number;
}
