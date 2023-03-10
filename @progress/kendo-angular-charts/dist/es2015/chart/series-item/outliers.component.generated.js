import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesOutliersComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('outliers', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesOutliersComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }]
};
