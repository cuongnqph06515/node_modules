"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var collection_service_1 = require("../common/collection.service");
var configuration_service_1 = require("../common/configuration.service");
var category_axis_item_component_generated_1 = require("./category-axis-item.component.generated");
/**
 * The configuration component for a category axis ([see example]({% slug axes_chart_charts %})).
 */
var CategoryAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisItemComponent, _super);
    function CategoryAxisItemComponent(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService, intl, localeId) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    CategoryAxisItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [configuration_service_1.ConfigurationService],
                    selector: 'kendo-chart-category-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisItemComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService },
        { type: collection_service_1.CollectionService },
        { type: kendo_angular_intl_1.IntlService },
        { type: String, decorators: [{ type: core_1.Inject, args: [core_1.LOCALE_ID,] }] }
    ]; };
    return CategoryAxisItemComponent;
}(category_axis_item_component_generated_1.CategoryAxisItemComponentGenerated));
exports.CategoryAxisItemComponent = CategoryAxisItemComponent;
