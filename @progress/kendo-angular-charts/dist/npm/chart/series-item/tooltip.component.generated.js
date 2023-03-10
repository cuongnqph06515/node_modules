"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var SeriesTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesTooltipComponentGenerated, _super);
    function SeriesTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesTooltipComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return SeriesTooltipComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesTooltipComponentGenerated = SeriesTooltipComponentGenerated;
