import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesErrorBarsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('errorBars', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesErrorBarsComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    endCaps: [{ type: Input }],
    line: [{ type: Input }],
    value: [{ type: Input }],
    visual: [{ type: Input }],
    xValue: [{ type: Input }],
    yValue: [{ type: Input }]
};
