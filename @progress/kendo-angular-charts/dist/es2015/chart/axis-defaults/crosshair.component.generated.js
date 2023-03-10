import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class AxisDefaultsCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    dashType: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};
