import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class XAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};
