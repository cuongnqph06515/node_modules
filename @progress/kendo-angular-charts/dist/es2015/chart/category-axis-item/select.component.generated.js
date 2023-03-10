import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class CategoryAxisSelectComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('select', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisSelectComponentGenerated.propDecorators = {
    from: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    mousewheel: [{ type: Input }],
    to: [{ type: Input }]
};
