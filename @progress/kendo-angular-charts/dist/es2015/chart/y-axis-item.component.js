import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { YAxisItemComponentGenerated } from './y-axis-item.component.generated';
/**
 * The configuration component for the Y axis
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
export class YAxisItemComponent extends YAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-y-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
YAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
