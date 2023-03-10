import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { XAxisItemComponent } from './x-axis-item.component';
/**
 * @hidden
 */
export class XAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('xAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
XAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [XAxisItemComponent,] }]
};
