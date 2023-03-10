"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var series_item_component_1 = require("./series-item.component");
/**
 * @hidden
 */
var SeriesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesComponentGenerated, _super);
    function SeriesComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'series', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    SeriesComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [series_item_component_1.SeriesItemComponent,] }]
    };
    return SeriesComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.SeriesComponentGenerated = SeriesComponentGenerated;
