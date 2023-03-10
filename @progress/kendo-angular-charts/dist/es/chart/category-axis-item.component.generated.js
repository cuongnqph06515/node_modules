import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
import { WeekStartDay } from '../common/property-types';
/**
 * @hidden
 */
var CategoryAxisItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisItemComponentGenerated, _super);
    function CategoryAxisItemComponentGenerated(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
        return _this;
    }
    CategoryAxisItemComponentGenerated.propDecorators = {
        autoBaseUnitSteps: [{ type: Input }],
        axisCrossingValue: [{ type: Input }],
        background: [{ type: Input }],
        baseUnit: [{ type: Input }],
        baseUnitStep: [{ type: Input }],
        categories: [{ type: Input }],
        color: [{ type: Input }],
        justified: [{ type: Input }],
        line: [{ type: Input }],
        majorGridLines: [{ type: Input }],
        majorTicks: [{ type: Input }],
        max: [{ type: Input }],
        maxDateGroups: [{ type: Input }],
        maxDivisions: [{ type: Input }],
        min: [{ type: Input }],
        minorGridLines: [{ type: Input }],
        minorTicks: [{ type: Input }],
        name: [{ type: Input }],
        pane: [{ type: Input }],
        plotBands: [{ type: Input }],
        reverse: [{ type: Input }],
        roundToBaseUnit: [{ type: Input }],
        startAngle: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }],
        weekStartDay: [{ type: Input }],
        crosshair: [{ type: Input }],
        labels: [{ type: Input }],
        notes: [{ type: Input }],
        select: [{ type: Input }],
        title: [{ type: Input }]
    };
    return CategoryAxisItemComponentGenerated;
}(CollectionItemComponent));
export { CategoryAxisItemComponentGenerated };
