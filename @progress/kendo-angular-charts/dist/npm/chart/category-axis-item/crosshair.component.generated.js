"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var CategoryAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisCrosshairComponentGenerated, _super);
    function CategoryAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: core_1.Input }],
        dashType: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        tooltip: [{ type: core_1.Input }]
    };
    return CategoryAxisCrosshairComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.CategoryAxisCrosshairComponentGenerated = CategoryAxisCrosshairComponentGenerated;
