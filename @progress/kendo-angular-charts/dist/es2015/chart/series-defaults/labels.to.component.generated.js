import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsLabelsToComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels.to', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsToComponentGenerated.propDecorators = {
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
