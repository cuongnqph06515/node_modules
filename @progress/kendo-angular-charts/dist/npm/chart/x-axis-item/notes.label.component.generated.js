"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var XAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesLabelComponentGenerated, _super);
    function XAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesLabelComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        content: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return XAxisNotesLabelComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.XAxisNotesLabelComponentGenerated = XAxisNotesLabelComponentGenerated;
