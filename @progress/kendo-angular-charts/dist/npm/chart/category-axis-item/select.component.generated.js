"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var CategoryAxisSelectComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisSelectComponentGenerated, _super);
    function CategoryAxisSelectComponentGenerated(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisSelectComponentGenerated.propDecorators = {
        from: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        mousewheel: [{ type: core_1.Input }],
        to: [{ type: core_1.Input }]
    };
    return CategoryAxisSelectComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.CategoryAxisSelectComponentGenerated = CategoryAxisSelectComponentGenerated;
