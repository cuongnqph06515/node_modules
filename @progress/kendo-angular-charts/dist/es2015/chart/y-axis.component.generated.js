import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { YAxisItemComponent } from './y-axis-item.component';
/**
 * @hidden
 */
export class YAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('yAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [YAxisItemComponent,] }]
};
