import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesLabelsFromComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels.from', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsFromComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    visible: [{ type: Input }]
};
