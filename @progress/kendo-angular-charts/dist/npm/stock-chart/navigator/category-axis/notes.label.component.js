"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var notes_label_component_1 = require("../../../chart/category-axis-item/notes.label.component");
/**
 * The label of the notes.
 */
var NavigatorCategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisNotesLabelComponent, _super);
    function NavigatorCategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesLabelComponent;
}(notes_label_component_1.CategoryAxisNotesLabelComponent));
exports.NavigatorCategoryAxisNotesLabelComponent = NavigatorCategoryAxisNotesLabelComponent;
