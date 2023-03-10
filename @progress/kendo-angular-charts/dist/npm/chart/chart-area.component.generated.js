"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var ChartAreaComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ChartAreaComponentGenerated, _super);
    function ChartAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'chartArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ChartAreaComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }]
    };
    return ChartAreaComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.ChartAreaComponentGenerated = ChartAreaComponentGenerated;
