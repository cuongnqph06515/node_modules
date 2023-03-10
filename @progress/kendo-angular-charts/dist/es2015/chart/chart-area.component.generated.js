import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class ChartAreaComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('chartArea', configurationService);
        this.configurationService = configurationService;
    }
}
ChartAreaComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    height: [{ type: Input }],
    margin: [{ type: Input }],
    opacity: [{ type: Input }],
    width: [{ type: Input }]
};
