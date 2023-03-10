"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_item_component_1 = require("../common/collection-item.component");
/**
 * @hidden
 */
var PaneComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(PaneComponentGenerated, _super);
    function PaneComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    PaneComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        clip: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }]
    };
    return PaneComponentGenerated;
}(collection_item_component_1.CollectionItemComponent));
exports.PaneComponentGenerated = PaneComponentGenerated;
