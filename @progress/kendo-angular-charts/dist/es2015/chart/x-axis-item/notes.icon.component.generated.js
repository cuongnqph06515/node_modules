import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class XAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};
