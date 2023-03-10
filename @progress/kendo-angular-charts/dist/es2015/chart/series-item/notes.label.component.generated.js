import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesLabelComponentGenerated.propDecorators = {
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
