"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var LegendItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendItemComponentGenerated, _super);
    function LegendItemComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.item', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendItemComponentGenerated.propDecorators = {
        cursor: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }]
    };
    return LegendItemComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.LegendItemComponentGenerated = LegendItemComponentGenerated;
