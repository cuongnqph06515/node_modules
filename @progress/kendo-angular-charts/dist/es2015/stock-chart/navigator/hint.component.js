import { Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * The default options of the navigator hint
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
export class NavigatorHintComponent extends SettingsComponent {
    constructor(configurationService) {
        super('hint', configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorHintComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-hint',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorHintComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
NavigatorHintComponent.propDecorators = {
    content: [{ type: Input }],
    format: [{ type: Input }],
    visible: [{ type: Input }]
};
