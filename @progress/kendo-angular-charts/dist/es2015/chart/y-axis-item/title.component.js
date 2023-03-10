import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisTitleComponentGenerated } from '../y-axis-item/title.component.generated';
/**
 * The title configuration of the Scatter Chart Y axis.
 */
export class YAxisTitleComponent extends YAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
YAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
