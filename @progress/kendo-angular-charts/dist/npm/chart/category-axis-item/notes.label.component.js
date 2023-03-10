"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_label_component_generated_1 = require("../category-axis-item/notes.label.component.generated");
/**
 * The label of the notes.
 */
var CategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesLabelComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return CategoryAxisNotesLabelComponent;
}(notes_label_component_generated_1.CategoryAxisNotesLabelComponentGenerated));
exports.CategoryAxisNotesLabelComponent = CategoryAxisNotesLabelComponent;
