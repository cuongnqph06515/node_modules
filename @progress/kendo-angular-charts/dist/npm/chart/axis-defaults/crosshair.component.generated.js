"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var AxisDefaultsCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsCrosshairComponentGenerated, _super);
    function AxisDefaultsCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsCrosshairComponentGenerated.propDecorators = {
        color: [{ type: core_1.Input }],
        dashType: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        tooltip: [{ type: core_1.Input }]
    };
    return AxisDefaultsCrosshairComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.AxisDefaultsCrosshairComponentGenerated = AxisDefaultsCrosshairComponentGenerated;
