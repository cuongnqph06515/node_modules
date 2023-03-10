/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:component-selector */
import { Component, Inject, Input, Optional, QueryList, ViewChildren, HostBinding, TemplateRef } from '@angular/core';
import { RTL } from '@progress/kendo-angular-l10n';
import { calculateTicksCount, calculateValueFromTick } from './sliders-util';
/**
 * @hidden
 */
class SliderTick {
    constructor(value) {
        this.value = value;
        this.classes = {
            'k-tick': true
        };
    }
}
/**
 * @hidden
 */
export class SliderTicksComponent {
    constructor(rtl) {
        this.rtl = rtl;
        this.wrapperClasses = 'k-reset k-slider-items';
        this.ticks = [];
    }
    ngOnChanges(_) {
        this.createTicks();
    }
    createTicks() {
        const count = calculateTicksCount(this.min, this.max, this.step);
        const largeStep = this.largeStep;
        const tickValueProps = {
            max: this.max,
            min: this.min,
            smallStep: this.step
        };
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(new SliderTick(calculateValueFromTick(i, tickValueProps)));
            if (largeStep && i % largeStep === 0) {
                result[i].large = true;
                result[i].classes['k-tick-large'] = true;
            }
        }
        if (this.rtl || this.vertical) {
            result = result.reverse();
        }
        if (result.length > 0) {
            Object.assign(result[0].classes, this.endTickClasses(true));
            Object.assign(result[result.length - 1].classes, this.endTickClasses(false));
        }
        this.ticks = result;
    }
    endTickClasses(first) {
        return {
            'k-first': (first && !this.vertical) || (!first && this.vertical),
            'k-last': (!first && !this.vertical) || (first && this.vertical)
        };
    }
}
SliderTicksComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoSliderTicks]',
                template: `
    <li #tickElement *ngFor="let tick of ticks;"
        [ngClass]="tick.classes"
        title="{{ tickTitle(tick.value) }}"
        role="presentation"
     >
         <ng-container [ngSwitch]="tick.large">
            <span class="k-label" *ngSwitchCase="true">
                <ng-container [ngTemplateOutlet]="labelTemplate || defaultLabel" [ngTemplateOutletContext]="tick">
                </ng-container>
            </span>
            <ng-container *ngSwitchCase="false">&nbsp;</ng-container>
         </ng-container>
     </li>

     <ng-template #defaultLabel let-value="value">
        {{ tickTitle(value) }}
     </ng-template>
  `
            },] },
];
/** @nocollapse */
SliderTicksComponent.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
SliderTicksComponent.propDecorators = {
    wrapperClasses: [{ type: HostBinding, args: ['class',] }],
    tickTitle: [{ type: Input }],
    vertical: [{ type: Input }],
    step: [{ type: Input }],
    largeStep: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    labelTemplate: [{ type: Input }],
    tickElements: [{ type: ViewChildren, args: ['tickElement',] }]
};
