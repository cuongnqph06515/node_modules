import * as tslib_1 from "tslib";
import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { CategoryAxisItemComponent } from './category-axis-item.component';
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
        children: [{ type: ContentChildren, args: [CategoryAxisItemComponent,] }]
    };
    return CategoryAxisComponentGenerated;
}(CollectionComponent));
export { CategoryAxisComponentGenerated };
