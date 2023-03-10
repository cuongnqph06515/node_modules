import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
import { WeekStartDay } from '../common/property-types';
/**
 * @hidden
 */
var XAxisItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisItemComponentGenerated, _super);
    function XAxisItemComponentGenerated(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
        return _this;
    }
    XAxisItemComponentGenerated.propDecorators = {
        axisCrossingValue: [{ type: Input }],
        background: [{ type: Input }],
        baseUnit: [{ type: Input }],
        color: [{ type: Input }],
        line: [{ type: Input }],
        majorGridLines: [{ type: Input }],
        majorTicks: [{ type: Input }],
        majorUnit: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        minorGridLines: [{ type: Input }],
        minorTicks: [{ type: Input }],
        minorUnit: [{ type: Input }],
        name: [{ type: Input }],
        narrowRange: [{ type: Input }],
        pane: [{ type: Input }],
        plotBands: [{ type: Input }],
        reverse: [{ type: Input }],
        startAngle: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }],
        weekStartDay: [{ type: Input }],
        crosshair: [{ type: Input }],
        labels: [{ type: Input }],
        notes: [{ type: Input }],
        title: [{ type: Input }]
    };
    return XAxisItemComponentGenerated;
}(CollectionItemComponent));
export { XAxisItemComponentGenerated };
