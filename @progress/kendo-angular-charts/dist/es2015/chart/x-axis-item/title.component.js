import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisTitleComponentGenerated } from '../x-axis-item/title.component.generated';
/**
 * The title configuration of the Scatter Chart X axis.
 */
export class XAxisTitleComponent extends XAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
XAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
