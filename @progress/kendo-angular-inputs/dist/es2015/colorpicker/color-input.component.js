/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ElementRef, HostBinding } from '@angular/core';
import { getRGBA, parseColor, getColorFromRGBA } from './utils';
import { isPresent } from '../common/utils';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class ColorInputComponent {
    constructor(host) {
        this.host = host;
        /**
         * Sets whether the alpha slider will be shown.
         */
        this.opacity = true;
        /**
         * Sets the disabled state of the ColorInput.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the ColorInput.
         */
        this.readonly = false;
        /**
         * Emits a parsed rgba string color.
         */
        this.valueChange = new EventEmitter();
        this.colorInputClass = true;
        /**
         * The rgba inputs values.
         */
        this.rgba = {};
    }
    /**
     * Indicates whether any of the inputs are focused.
     */
    get isFocused() {
        if (!(isDocumentAvailable() && isPresent(this.host))) {
            return false;
        }
        const activeElement = document.activeElement;
        return this.host.nativeElement.contains(activeElement);
    }
    /**
     * Indicates whether any of the rgba inputs have value.
     */
    get rgbaInputValid() {
        return Object.keys(this.rgba).every(key => isPresent(this.rgba[key]));
    }
    ngOnChanges(changes) {
        if (isPresent(changes.value) && !this.isFocused) {
            this.hex = parseColor(this.value, 'hex');
            this.rgba = getRGBA(this.value);
            this.rgba.a = parseColor(this.value, 'rgba') ? this.rgba.a : 1;
        }
    }
    handleRgbaValueChange() {
        const color = getColorFromRGBA(this.rgba);
        if (!this.rgbaInputValid || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(this.value);
        this.hex = parseColor(color, 'hex');
        this.valueChange.emit(color);
    }
    handleHexValueChange(hex) {
        this.hex = hex;
        const color = parseColor(hex, 'rgba');
        if (!isPresent(color) || color === this.value) {
            return;
        }
        this.value = color;
        this.rgba = getRGBA(color);
        this.valueChange.emit(color);
    }
    handleRgbaInputBlur() {
        if (!this.rgbaInputValid) {
            this.rgba = getRGBA(this.value);
        }
    }
    handleHexInputBlur() {
        this.hex = parseColor(this.value, 'hex');
    }
}
ColorInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-colorinput',
                template: `
        <div class="k-hbox k-gradient-values">
            <input
                #hexInput
                class="k-textbox k-hex-value"
                [disabled]="disabled"
                [readonly]="readonly"
                [value]="hex || ''"
                placeholder="no color"
                (blur)="handleHexInputBlur()"
                (input)="handleHexValueChange(hexInput.value)"
            />
            <kendo-numerictextbox
                [disabled]="disabled"
                [readonly]="readonly"
                [min]="0"
                [max]="255"
                placeholder="R"
                [(value)]="rgba.r"
                [autoCorrect]="true"
                [spinners]="false"
                [format]="'n'"
                [decimals]="0"
                (blur)="handleRgbaInputBlur()"
                (valueChange)="handleRgbaValueChange()"
            >
            </kendo-numerictextbox>
            <kendo-numerictextbox
                [disabled]="disabled"
                [readonly]="readonly"
                [min]="0"
                [max]="255"
                placeholder="G"
                [(value)]="rgba.g"
                [autoCorrect]="true"
                [spinners]="false"
                [format]="'n'"
                [decimals]="0"
                (blur)="handleRgbaInputBlur()"
                (valueChange)="handleRgbaValueChange()"
            >
            </kendo-numerictextbox>
            <kendo-numerictextbox
                [disabled]="disabled"
                [readonly]="readonly"
                [min]="0"
                [max]="255"
                placeholder="B"
                [(value)]="rgba.b"
                [autoCorrect]="true"
                [spinners]="false"
                [format]="'n'"
                [decimals]="0"
                (blur)="handleRgbaInputBlur()"
                (valueChange)="handleRgbaValueChange()"
            >
            </kendo-numerictextbox>
            <kendo-numerictextbox
                *ngIf="opacity"
                [disabled]="disabled"
                [readonly]="readonly"
                [min]="0"
                [max]="1"
                placeholder="A"
                [(value)]="rgba.a"
                [autoCorrect]="true"
                [spinners]="false"
                [step]="0.01"
                [format]="'n2'"
                [decimals]="2"
                (blur)="handleRgbaInputBlur()"
                (valueChange)="handleRgbaValueChange()"
            >
            </kendo-numerictextbox>
        </div>
        <div class="k-hbox k-gradient-values">
            <div class="k-hex-value">hex</div>
            <div>r</div>
            <div>g</div>
            <div>b</div>
            <div *ngIf="opacity">a</div>
        </div>
    `
            },] },
];
/** @nocollapse */
ColorInputComponent.ctorParameters = () => [
    { type: ElementRef }
];
ColorInputComponent.propDecorators = {
    value: [{ type: Input }],
    opacity: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    valueChange: [{ type: Output }],
    colorInputClass: [{ type: HostBinding, args: ['class.k-colorinputs',] }]
};
