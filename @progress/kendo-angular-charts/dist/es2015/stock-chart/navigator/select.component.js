import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * Specifies the initially selected range.
 * If no range is specified, the full range of values is rendered.
 */
export class NavigatorSelectComponent extends SettingsComponent {
    constructor(configurationService) {
        super('select', configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
NavigatorSelectComponent.propDecorators = {
    from: [{ type: Input }],
    to: [{ type: Input }],
    mousewheel: [{ type: Input }]
};
