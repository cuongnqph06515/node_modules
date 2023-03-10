import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { ValueAxisItemComponent } from './value-axis-item.component';
/**
 * @hidden
 */
export class ValueAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('valueAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [ValueAxisItemComponent,] }]
};
