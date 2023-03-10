import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class LegendInactiveItemsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend.inactiveItems', configurationService);
        this.configurationService = configurationService;
    }
}
LegendInactiveItemsComponentGenerated.propDecorators = {
    labels: [{ type: Input }]
};
