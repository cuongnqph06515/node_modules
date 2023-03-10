import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisLabelsComponentGenerated } from '../y-axis-item/labels.component.generated';
/**
 * The axis labels configuration.
 */
export class YAxisLabelsComponent extends YAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
YAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
