import * as tslib_1 from "tslib";
import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { SeriesItemComponent } from './series-item.component';
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
        children: [{ type: ContentChildren, args: [SeriesItemComponent,] }]
    };
    return SeriesComponentGenerated;
}(CollectionComponent));
export { SeriesComponentGenerated };
