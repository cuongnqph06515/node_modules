import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class XAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};
