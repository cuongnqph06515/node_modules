"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_component_1 = require("../common/collection.component");
var pane_component_1 = require("./pane.component");
/**
 * @hidden
 */
var PanesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(PanesComponentGenerated, _super);
    function PanesComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'panes', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    PanesComponentGenerated.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [pane_component_1.PaneComponent,] }]
    };
    return PanesComponentGenerated;
}(collection_component_1.CollectionComponent));
exports.PanesComponentGenerated = PanesComponentGenerated;
