import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsComponentGenerated, _super);
    function AxisDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return AxisDefaultsComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsComponentGenerated };
