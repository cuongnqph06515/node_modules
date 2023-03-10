"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var SeriesErrorBarsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesErrorBarsComponentGenerated, _super);
    function SeriesErrorBarsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'errorBars', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesErrorBarsComponentGenerated.propDecorators = {
        color: [{ type: core_1.Input }],
        endCaps: [{ type: core_1.Input }],
        line: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }],
        xValue: [{ type: core_1.Input }],
        yValue: [{ type: core_1.Input }]
    };
    return SeriesErrorBarsComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesErrorBarsComponentGenerated = SeriesErrorBarsComponentGenerated;
