import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesMarkersComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('markers', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesMarkersComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};
