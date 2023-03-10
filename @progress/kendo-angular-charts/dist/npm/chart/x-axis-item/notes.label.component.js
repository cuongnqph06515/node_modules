"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_label_component_generated_1 = require("../x-axis-item/notes.label.component.generated");
/**
 * The label of the notes.
 */
var XAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesLabelComponent, _super);
    // Place custom properties here
    function XAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return XAxisNotesLabelComponent;
}(notes_label_component_generated_1.XAxisNotesLabelComponentGenerated));
exports.XAxisNotesLabelComponent = XAxisNotesLabelComponent;
