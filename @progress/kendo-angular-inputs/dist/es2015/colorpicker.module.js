/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DraggableModule } from '@progress/kendo-angular-common';
import { SliderModule } from './slider.module';
import { NumericTextBoxModule } from './numerictextbox.module';
import { ColorPickerComponent } from './colorpicker/colorpicker.component';
import { ColorPaletteComponent } from './colorpicker/color-palette.component';
import { ColorGradientComponent } from './colorpicker/color-gradient.component';
import { ColorInputComponent } from './colorpicker/color-input.component';
import { FocusOnDomReadyDirective } from './colorpicker/focus-on-dom-ready.directive';
const PUBLIC_DIRECTIVES = [
    ColorPickerComponent,
    ColorPaletteComponent,
    ColorGradientComponent
];
const INTERNAL_DIRECTIVES = [
    ColorInputComponent,
    FocusOnDomReadyDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ColorPicker.
 */
export class ColorPickerModule {
}
ColorPickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PUBLIC_DIRECTIVES,
                    INTERNAL_DIRECTIVES
                ],
                exports: [PUBLIC_DIRECTIVES],
                imports: [
                    SliderModule,
                    NumericTextBoxModule,
                    CommonModule,
                    PopupModule,
                    DraggableModule
                ]
            },] },
];
