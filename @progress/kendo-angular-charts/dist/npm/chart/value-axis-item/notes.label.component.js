"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_label_component_generated_1 = require("../value-axis-item/notes.label.component.generated");
/**
 * The label of the notes.
 */
var ValueAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisNotesLabelComponent, _super);
    // Place custom properties here
    function ValueAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return ValueAxisNotesLabelComponent;
}(notes_label_component_generated_1.ValueAxisNotesLabelComponentGenerated));
exports.ValueAxisNotesLabelComponent = ValueAxisNotesLabelComponent;
