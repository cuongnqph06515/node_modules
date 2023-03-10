import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsComponentGenerated.propDecorators = {
    align: [{ type: Input }],
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    distance: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};
