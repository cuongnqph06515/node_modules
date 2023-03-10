import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};
