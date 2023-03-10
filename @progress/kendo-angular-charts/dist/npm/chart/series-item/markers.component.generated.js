"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var SeriesMarkersComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesMarkersComponentGenerated, _super);
    function SeriesMarkersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'markers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesMarkersComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        size: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }],
        from: [{ type: core_1.Input }],
        to: [{ type: core_1.Input }]
    };
    return SeriesMarkersComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesMarkersComponentGenerated = SeriesMarkersComponentGenerated;
