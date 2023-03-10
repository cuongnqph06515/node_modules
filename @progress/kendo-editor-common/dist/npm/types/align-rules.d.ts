/**
 * @hidden
 */
export interface AlignRule {
    node: string;
    style: Array<{
        name: string;
        value: string;
    }>;
}
/**
 * @hidden
 */
export declare const alignLeftRules: Array<AlignRule>;
/**
 * @hidden
 */
export declare const alignRightRules: Array<AlignRule>;
/**
 * @hidden
 */
export declare const alignCenterRules: Array<AlignRule>;
/**
 * @hidden
 */
export declare const alignJustifyRules: Array<AlignRule>;
/**
 * @hidden
 */
export declare const alignRemoveRules: Array<AlignRule>;
