import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class AxisDefaultsTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.title', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsTitleComponentGenerated.propDecorators = {
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
