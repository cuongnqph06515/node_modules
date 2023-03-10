import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class ZoomableComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('zoomable', configurationService);
        this.configurationService = configurationService;
    }
}
ZoomableComponentGenerated.propDecorators = {
    mousewheel: [{ type: Input }],
    selection: [{ type: Input }]
};
