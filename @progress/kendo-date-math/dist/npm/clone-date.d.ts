/**
 * A function that clones the passed date. The parameter could be `null`.
 *
 * @param date - The initial date value.
 * @returns - A new `Date` instance.
 *
 * @example
 * ```ts-no-run
 * cloneDate(new Date(2016, 0, 1)); // returns new Date(2016, 0, 1);
 * cloneDate(null); // returns null
 * ```
 */
export declare const cloneDate: (date?: Date) => Date;
