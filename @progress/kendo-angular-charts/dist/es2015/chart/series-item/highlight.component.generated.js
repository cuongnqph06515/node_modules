import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class SeriesHighlightComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('highlight', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesHighlightComponentGenerated.propDecorators = {
    border: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    markers: [{ type: Input }],
    opacity: [{ type: Input }],
    toggle: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};
