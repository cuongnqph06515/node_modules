import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
import { WeekStartDay } from '../common/property-types';
/**
 * @hidden
 */
export class CategoryAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
    }
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
