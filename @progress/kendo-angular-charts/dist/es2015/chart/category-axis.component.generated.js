import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { CategoryAxisItemComponent } from './category-axis-item.component';
/**
 * @hidden
 */
export class CategoryAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('categoryAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
CategoryAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [CategoryAxisItemComponent,] }]
};
