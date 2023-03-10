import * as tslib_1 from "tslib";
import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { XAxisItemComponent } from './x-axis-item.component';
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
        children: [{ type: ContentChildren, args: [XAxisItemComponent,] }]
    };
    return XAxisComponentGenerated;
}(CollectionComponent));
export { XAxisComponentGenerated };
