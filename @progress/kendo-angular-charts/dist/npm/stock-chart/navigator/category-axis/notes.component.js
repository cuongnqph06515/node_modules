"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var notes_component_1 = require("../../../chart/category-axis-item/notes.component");
/**
 * The configuration of the category axis notes.
 */
var NavigatorCategoryAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisNotesComponent, _super);
    function NavigatorCategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesComponent;
}(notes_component_1.CategoryAxisNotesComponent));
exports.NavigatorCategoryAxisNotesComponent = NavigatorCategoryAxisNotesComponent;
