import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsComponentGenerated.propDecorators = {
    border: [{ type: Input }],
    gap: [{ type: Input }],
    overlay: [{ type: Input }],
    spacing: [{ type: Input }],
    stack: [{ type: Input }],
    type: [{ type: Input }],
    visual: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    tooltip: [{ type: Input }]
};
