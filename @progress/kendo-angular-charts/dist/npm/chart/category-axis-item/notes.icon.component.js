"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_icon_component_generated_1 = require("../category-axis-item/notes.icon.component.generated");
/**
 * The icon of the notes.
 */
var CategoryAxisNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesIconComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesIconComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesIconComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return CategoryAxisNotesIconComponent;
}(notes_icon_component_generated_1.CategoryAxisNotesIconComponentGenerated));
exports.CategoryAxisNotesIconComponent = CategoryAxisNotesIconComponent;
