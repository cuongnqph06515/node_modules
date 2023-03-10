"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var LegendInactiveItemsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendInactiveItemsComponentGenerated, _super);
    function LegendInactiveItemsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.inactiveItems', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendInactiveItemsComponentGenerated.propDecorators = {
        labels: [{ type: core_1.Input }]
    };
    return LegendInactiveItemsComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.LegendInactiveItemsComponentGenerated = LegendInactiveItemsComponentGenerated;
