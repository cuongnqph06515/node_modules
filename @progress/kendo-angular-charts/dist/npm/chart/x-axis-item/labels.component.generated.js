"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var XAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisLabelsComponentGenerated, _super);
    function XAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisLabelsComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        content: [{ type: core_1.Input }],
        culture: [{ type: core_1.Input }],
        dateFormats: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        mirror: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }]
    };
    return XAxisLabelsComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.XAxisLabelsComponentGenerated = XAxisLabelsComponentGenerated;
