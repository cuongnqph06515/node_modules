"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var ValueAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisCrosshairComponentGenerated, _super);
    function ValueAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        tooltip: [{ type: core_1.Input }]
    };
    return ValueAxisCrosshairComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.ValueAxisCrosshairComponentGenerated = ValueAxisCrosshairComponentGenerated;
