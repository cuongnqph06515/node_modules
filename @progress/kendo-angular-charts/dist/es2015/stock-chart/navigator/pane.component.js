import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { PrefixConfigurationService, PREFIX } from '../../common/prefix-configuration.service';
import { PaneComponentGenerated } from '../../chart/pane.component.generated';
/**
 * The configuration component of the navigator pane
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
export class NavigatorPaneComponent extends PaneComponentGenerated {
    constructor(configurationService) {
        super(configurationService, null);
        this.configurationService = configurationService;
    }
}
NavigatorPaneComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: PREFIX, useValue: 'navigator.pane' }, { provide: ConfigurationService, useClass: PrefixConfigurationService }],
                selector: 'kendo-chart-navigator-pane',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorPaneComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
