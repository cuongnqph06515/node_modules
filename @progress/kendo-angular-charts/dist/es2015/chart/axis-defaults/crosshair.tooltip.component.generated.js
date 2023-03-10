import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class AxisDefaultsCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};
