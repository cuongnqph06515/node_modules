"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var y_axis_item_component_1 = require("./y-axis-item.component");
/**
 * @hidden
 */
var YAxisComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisComponentGenerated, _super);
    function YAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'yAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    YAxisComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [y_axis_item_component_1.YAxisItemComponent,] }]
    };
    return YAxisComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.YAxisComponentGenerated = YAxisComponentGenerated;
