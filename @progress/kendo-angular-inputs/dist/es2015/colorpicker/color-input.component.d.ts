/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnChanges, SimpleChanges, EventEmitter, ElementRef } from '@angular/core';
import { RGBA } from './models';
/**
 * @hidden
 */
export declare class ColorInputComponent implements OnChanges {
    private host;
    /**
     * The color value that will be parsed and populate the hex & rgba inputs.
     * Required input property.
     */
    value: string;
    /**
     * Sets whether the alpha slider will be shown.
     */
    opacity: boolean;
    /**
     * Sets the disabled state of the ColorInput.
     */
    disabled: boolean;
    /**
     * Sets the read-only state of the ColorInput.
     */
    readonly: boolean;
    /**
     * Emits a parsed rgba string color.
     */
    valueChange: EventEmitter<string>;
    colorInputClass: boolean;
    /**
     * The rgba inputs values.
     */
    rgba: RGBA;
    hex: string;
    /**
     * Indicates whether any of the inputs are focused.
     */
    private readonly isFocused;
    /**
     * Indicates whether any of the rgba inputs have value.
     */
    private readonly rgbaInputValid;
    constructor(host: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    handleRgbaValueChange(): void;
    handleHexValueChange(hex: string): void;
    handleRgbaInputBlur(): void;
    handleHexInputBlur(): void;
}
