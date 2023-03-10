import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
export class AxisDefaultsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    narrowRange: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    startAngle: [{ type: Input }],
    visible: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    title: [{ type: Input }]
};
