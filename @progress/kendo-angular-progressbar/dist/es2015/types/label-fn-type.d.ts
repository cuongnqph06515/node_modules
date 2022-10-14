/**
 * The callback that returns the string content of the status label. The current value is available as an argument.
 * @param { number } value - The current set value.
 * @returns { string } - the formatted string that will be displayed within the label.
 */
export declare type LabelFn = (value: number) => string;
