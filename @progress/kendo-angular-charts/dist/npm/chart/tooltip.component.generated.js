"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var TooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipComponentGenerated, _super);
    function TooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    TooltipComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        shared: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return TooltipComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.TooltipComponentGenerated = TooltipComponentGenerated;
