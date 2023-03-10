"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var value_axis_item_component_1 = require("./value-axis-item.component");
/**
 * @hidden
 */
var ValueAxisComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisComponentGenerated, _super);
    function ValueAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'valueAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    ValueAxisComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [value_axis_item_component_1.ValueAxisItemComponent,] }]
    };
    return ValueAxisComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.ValueAxisComponentGenerated = ValueAxisComponentGenerated;
