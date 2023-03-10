"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var AxisDefaultsLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsLabelsComponentGenerated, _super);
    function AxisDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsLabelsComponentGenerated.propDecorators = {
        content: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        mirror: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }]
    };
    return AxisDefaultsLabelsComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.AxisDefaultsLabelsComponentGenerated = AxisDefaultsLabelsComponentGenerated;
