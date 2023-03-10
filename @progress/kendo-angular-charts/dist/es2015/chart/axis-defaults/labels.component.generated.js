import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class AxisDefaultsLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.labels', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsLabelsComponentGenerated.propDecorators = {
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};
