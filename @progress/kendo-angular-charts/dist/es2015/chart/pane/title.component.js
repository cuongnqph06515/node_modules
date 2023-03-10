import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { PanesTitleComponentGenerated } from '../pane/title.component.generated';
/**
 * The configuration of the Chart pane title.
 */
export class PanesTitleComponent extends PanesTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
PanesTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-pane-title',
                template: ''
            },] },
];
/** @nocollapse */
PanesTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
