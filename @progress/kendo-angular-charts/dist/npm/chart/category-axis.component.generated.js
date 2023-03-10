"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var category_axis_item_component_1 = require("./category-axis-item.component");
/**
 * @hidden
 */
var CategoryAxisComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisComponentGenerated, _super);
    function CategoryAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'categoryAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    CategoryAxisComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [category_axis_item_component_1.CategoryAxisItemComponent,] }]
    };
    return CategoryAxisComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.CategoryAxisComponentGenerated = CategoryAxisComponentGenerated;
