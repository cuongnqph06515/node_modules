import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollectionService } from '../../common/collection.service';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesItemComponent } from '../../chart/series-item.component';
/**
 * The configuration component of a navigator series item
 * ([see example]({% slug navigator_stockchart_charts %})).
 */
export class NavigatorSeriesItemComponent extends SeriesItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
NavigatorSeriesItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-navigator-series-item',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
