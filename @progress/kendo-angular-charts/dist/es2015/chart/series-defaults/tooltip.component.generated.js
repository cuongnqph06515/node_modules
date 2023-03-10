import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesDefaultsTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};
