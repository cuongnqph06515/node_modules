"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var XAxisNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesComponentGenerated, _super);
    function XAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: core_1.Input }],
        line: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        label: [{ type: core_1.Input }]
    };
    return XAxisNotesComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.XAxisNotesComponentGenerated = XAxisNotesComponentGenerated;
