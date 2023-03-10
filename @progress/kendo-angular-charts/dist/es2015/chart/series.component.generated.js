import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { SeriesItemComponent } from './series-item.component';
/**
 * @hidden
 */
export class SeriesComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('series', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
SeriesComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [SeriesItemComponent,] }]
};
