import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisTitleComponentGenerated } from '../value-axis-item/title.component.generated';
/**
 * The title configuration of the value axis.
 */
export class ValueAxisTitleComponent extends ValueAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
