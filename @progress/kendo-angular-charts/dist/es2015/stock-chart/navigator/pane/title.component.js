import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { PanesTitleComponent } from '../../../chart/pane/title.component';
/**
 * The title configuration of the StockChart navigator pane.
 */
export class NavigatorPaneTitleComponent extends PanesTitleComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorPaneTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-pane-title',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorPaneTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
