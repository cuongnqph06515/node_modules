"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var CategoryAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisCrosshairTooltipComponentGenerated, _super);
    function CategoryAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisCrosshairTooltipComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return CategoryAxisCrosshairTooltipComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.CategoryAxisCrosshairTooltipComponentGenerated = CategoryAxisCrosshairTooltipComponentGenerated;
