"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var SeriesDefaultsTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsTooltipComponentGenerated, _super);
    function SeriesDefaultsTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsTooltipComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return SeriesDefaultsTooltipComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesDefaultsTooltipComponentGenerated = SeriesDefaultsTooltipComponentGenerated;
