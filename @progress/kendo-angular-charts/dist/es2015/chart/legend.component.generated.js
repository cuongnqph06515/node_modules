import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class LegendComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend', configurationService);
        this.configurationService = configurationService;
    }
}
LegendComponentGenerated.propDecorators = {
    align: [{ type: Input }],
    background: [{ type: Input }],
    border: [{ type: Input }],
    height: [{ type: Input }],
    labels: [{ type: Input }],
    margin: [{ type: Input }],
    offsetX: [{ type: Input }],
    offsetY: [{ type: Input }],
    orientation: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    reverse: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    markers: [{ type: Input }],
    spacing: [{ type: Input }],
    inactiveItems: [{ type: Input }],
    item: [{ type: Input }]
};
