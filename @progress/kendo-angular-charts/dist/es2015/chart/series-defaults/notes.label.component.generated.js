import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};
