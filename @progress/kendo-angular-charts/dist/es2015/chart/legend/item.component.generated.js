import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class LegendItemComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend.item', configurationService);
        this.configurationService = configurationService;
    }
}
LegendItemComponentGenerated.propDecorators = {
    cursor: [{ type: Input }],
    visual: [{ type: Input }]
};
