import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesLabelsToComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels.to', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsToComponentGenerated.propDecorators = {
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
