import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class CategoryAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    dashType: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};
