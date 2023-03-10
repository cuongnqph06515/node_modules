import { Component, ViewChildren, QueryList, Input } from '@angular/core';
import { CrosshairTooltipComponent } from './crosshair-tooltip.component';
const AXES = ["categoryAxis", "valueAxis", "xAxis", "yAxis"];
/**
 * @hidden
 */
export class CrosshairTooltipsContainerComponent {
    constructor() {
        this.tooltipKeys = [];
        this.tooltipsMap = {};
    }
    show(e) {
        const tooltipComponents = this.crossahirTooltipComponents.toArray();
        const axisName = e.axisName;
        const axisIndex = e.axisIndex;
        for (let idx = 0; idx < tooltipComponents.length; idx++) {
            if (tooltipComponents[idx].key === axisName + axisIndex) {
                tooltipComponents[idx].show(e);
                break;
            }
        }
    }
    hide() {
        const tooltipComponents = this.crossahirTooltipComponents.toArray();
        for (let idx = 0; idx < tooltipComponents.length; idx++) {
            tooltipComponents[idx].hide();
        }
    }
    get active() {
        return this.tooltipKeys.length > 0;
    }
    createCrosshairTooltips(options) {
        const newMap = this.mapTooltips(options);
        const map = this.tooltipsMap;
        for (let key in map) {
            if (!newMap[key]) {
                this.removeTooltip(key);
                delete map[key];
            }
        }
        for (let key in newMap) {
            if (!map[key]) {
                map[key] = newMap[key];
                this.tooltipKeys.push(key);
            }
        }
    }
    removeTooltip(key) {
        const keys = this.tooltipKeys;
        for (let idx = 0; idx < keys.length; idx++) {
            if (keys[idx] === key) {
                keys.splice(idx, 1);
                break;
            }
        }
    }
    mapTooltips(options) {
        const map = {};
        for (let idx = 0; idx < AXES.length; idx++) {
            const tooltips = this.axesCrosshairTooltipOptions(options, AXES[idx]);
            for (let tooltipIdx = 0; tooltipIdx < tooltips.length; tooltipIdx++) {
                const tooltip = tooltips[tooltipIdx];
                map[tooltip.name + tooltip.index] = tooltip;
            }
        }
        return map;
    }
    axesCrosshairTooltipOptions(options, name) {
        const result = [];
        if (options[name]) {
            const axes = [].concat(options[name]);
            for (let idx = 0; idx < axes.length; idx++) {
                const tooltip = (axes[idx].crosshair || {}).tooltip;
                if (tooltip && tooltip.visible) {
                    result.push({
                        index: idx,
                        name: name
                    });
                }
            }
        }
        return result;
    }
}
CrosshairTooltipsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chart-crosshair-tooltips-container',
                template: `
        <kendo-chart-crosshair-tooltip *ngFor="let key of tooltipKeys" [key]="key" [popupSettings]="popupSettings">
        </kendo-chart-crosshair-tooltip>
    `
            },] },
];
CrosshairTooltipsContainerComponent.propDecorators = {
    popupSettings: [{ type: Input }],
    crossahirTooltipComponents: [{ type: ViewChildren, args: [CrosshairTooltipComponent,] }]
};
