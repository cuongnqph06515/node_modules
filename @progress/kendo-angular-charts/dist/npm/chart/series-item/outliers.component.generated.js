"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var SeriesOutliersComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesOutliersComponentGenerated, _super);
    function SeriesOutliersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'outliers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesOutliersComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        size: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }]
    };
    return SeriesOutliersComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesOutliersComponentGenerated = SeriesOutliersComponentGenerated;
