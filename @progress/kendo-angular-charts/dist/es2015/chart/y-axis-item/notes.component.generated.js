import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class YAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};
