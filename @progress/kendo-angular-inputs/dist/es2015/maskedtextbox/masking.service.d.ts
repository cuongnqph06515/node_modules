/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export declare class MaskingService {
    rules: {
        [key: string]: RegExp;
    };
    prompt: string;
    mask: string;
    promptPlaceholder: string;
    includeLiterals: boolean;
    maskTokens: any[];
    unmaskTokens: any[];
    rawTokens: any[];
    validationTokens: any[];
    update({ mask, prompt, promptPlaceholder, rules, includeLiterals }: any): void;
    validationValue(maskedValue?: string): string;
    rawValue(maskedValue?: string): string;
    /**
     * @hidden
     */
    maskRaw(rawValue?: string): string;
    maskInput(input: string, control: string, splitPoint: number): any;
    maskInRange(pasted: string, oldValue: string, start: number, end: number): any;
    private maskRemoved;
    private adjustPosition;
    private maskInserted;
    protected readonly maskTokenCreator: {
        [key: string]: Function;
    };
    protected readonly unmaskTokenCreator: {
        [key: string]: Function;
    };
    protected readonly rawTokenCreator: {
        [key: string]: Function;
    };
    protected readonly validationTokenCreator: {
        [key: string]: Function;
    };
    private tokenize;
}
