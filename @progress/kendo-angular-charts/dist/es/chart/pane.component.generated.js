import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
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
        background: [{ type: Input }],
        border: [{ type: Input }],
        clip: [{ type: Input }],
        height: [{ type: Input }],
        margin: [{ type: Input }],
        name: [{ type: Input }],
        padding: [{ type: Input }],
        title: [{ type: Input }]
    };
    return PaneComponentGenerated;
}(CollectionItemComponent));
export { PaneComponentGenerated };
