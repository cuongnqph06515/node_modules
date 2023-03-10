import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class TooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
TooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    opacity: [{ type: Input }],
    padding: [{ type: Input }],
    shared: [{ type: Input }],
    visible: [{ type: Input }]
};
