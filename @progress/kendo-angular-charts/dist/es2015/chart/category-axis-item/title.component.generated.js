import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class CategoryAxisTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};
