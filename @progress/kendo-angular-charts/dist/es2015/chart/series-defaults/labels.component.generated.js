import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};
