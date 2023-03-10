import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { ValueAxisItemComponentGenerated } from './value-axis-item.component.generated';
/**
 * The configuration component for a value axis.
 */
export class ValueAxisItemComponent extends ValueAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-value-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
