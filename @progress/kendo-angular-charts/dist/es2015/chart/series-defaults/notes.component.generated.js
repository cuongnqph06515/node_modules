import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesComponentGenerated.propDecorators = {
    line: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};
