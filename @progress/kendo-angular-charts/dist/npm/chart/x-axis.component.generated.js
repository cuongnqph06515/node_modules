"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var x_axis_item_component_1 = require("./x-axis-item.component");
/**
 * @hidden
 */
var XAxisComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisComponentGenerated, _super);
    function XAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'xAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    XAxisComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [x_axis_item_component_1.XAxisItemComponent,] }]
    };
    return XAxisComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.XAxisComponentGenerated = XAxisComponentGenerated;
