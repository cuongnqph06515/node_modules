import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
/**
 * @hidden
 */
export class ValueAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisItemComponentGenerated.propDecorators = {
    axisCrossingValue: [{ type: Input }],
    background: [{ type: Input }],
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
    type: [{ type: Input }],
    visible: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    title: [{ type: Input }]
};
