import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class CategoryAxisNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesLabelComponentGenerated.propDecorators = {
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
