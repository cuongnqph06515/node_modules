import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};
