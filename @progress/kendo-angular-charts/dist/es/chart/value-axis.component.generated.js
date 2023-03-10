import * as tslib_1 from "tslib";
import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { ValueAxisItemComponent } from './value-axis-item.component';
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
        children: [{ type: ContentChildren, args: [ValueAxisItemComponent,] }]
    };
    return ValueAxisComponentGenerated;
}(CollectionComponent));
export { ValueAxisComponentGenerated };
