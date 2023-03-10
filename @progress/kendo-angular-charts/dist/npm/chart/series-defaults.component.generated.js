"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var SeriesDefaultsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsComponentGenerated, _super);
    function SeriesDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsComponentGenerated.propDecorators = {
        border: [{ type: core_1.Input }],
        gap: [{ type: core_1.Input }],
        overlay: [{ type: core_1.Input }],
        spacing: [{ type: core_1.Input }],
        stack: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }],
        labels: [{ type: core_1.Input }],
        notes: [{ type: core_1.Input }],
        tooltip: [{ type: core_1.Input }]
    };
    return SeriesDefaultsComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesDefaultsComponentGenerated = SeriesDefaultsComponentGenerated;
