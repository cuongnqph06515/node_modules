import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesExtremesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('extremes', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesExtremesComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }]
};
