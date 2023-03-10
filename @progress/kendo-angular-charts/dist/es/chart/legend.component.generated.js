import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var LegendComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendComponentGenerated, _super);
    function LegendComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return LegendComponentGenerated;
}(SettingsComponent));
export { LegendComponentGenerated };
