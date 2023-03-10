import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class PlotAreaComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('plotArea', configurationService);
        this.configurationService = configurationService;
    }
}
PlotAreaComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    margin: [{ type: Input }],
    opacity: [{ type: Input }],
    padding: [{ type: Input }]
};
