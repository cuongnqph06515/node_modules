import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class YAxisLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    culture: [{ type: Input }],
    dateFormats: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};
