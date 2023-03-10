"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var ValueAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisNotesIconComponentGenerated, _super);
    function ValueAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        size: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return ValueAxisNotesIconComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.ValueAxisNotesIconComponentGenerated = ValueAxisNotesIconComponentGenerated;
