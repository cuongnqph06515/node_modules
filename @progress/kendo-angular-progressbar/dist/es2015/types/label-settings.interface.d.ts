import { LabelType } from './label-type';
import { LabelFn } from './label-fn-type';
import { LabelPosition } from './label-position';
/**
 * Represents the settings of the label which indicates the progress status of the ProgressBar.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-progressbar
 *              [value]="value"
 *              [label]="label">
 *        </kendo-progressbar>
 *    `
 * })
 * class AppComponent {
 *     public value = 50;
 *     public label = {
 *          visible: true,
 *          position: 'start',
 *          format: 'percent'
 *      };
 * }
 * ```
 */
export interface LabelSettings {
    /**
     * Determines whether the label for the progress status will be visible.
     */
    visible?: boolean;
    /**
     * Sets the position of the progress status label.
     *
     * The accepted values are:
     * * `start`
     * * `center`
     * * (Default) `end`
     */
    position?: LabelPosition;
    /**
     * Sets the format that will be used when rendering the value in the label.
     * The supported preset types are `value` (default) and `percent`.
     * You can also provide a callback that will expose the current value and which has to
     * return the formatted string that will be displayed in the label
     * ([see example]({% slug progressbar_label %}#toc-using-a-formatting-function)).
     */
    format?: LabelType | LabelFn;
}
