import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesTooltipComponent } from '../../../chart/series-item/tooltip.component';
/**
 * The tooltip configuration of the StockChart navigator series.
 * The StockChart navigator series tooltip is displayed when the `navigator.series.tooltip.visible` option is set to `true`.
 */
export class NavigatorSeriesTooltipComponent extends SeriesTooltipComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
