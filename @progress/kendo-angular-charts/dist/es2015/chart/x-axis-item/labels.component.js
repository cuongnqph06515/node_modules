import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisLabelsComponentGenerated } from '../x-axis-item/labels.component.generated';
/**
 * The axis labels configuration.
 */
export class XAxisLabelsComponent extends XAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
XAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
