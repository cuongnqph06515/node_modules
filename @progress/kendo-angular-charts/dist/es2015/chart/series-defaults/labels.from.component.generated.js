import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsLabelsFromComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels.from', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsFromComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};
