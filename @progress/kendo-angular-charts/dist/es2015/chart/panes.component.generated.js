import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { PaneComponent } from './pane.component';
/**
 * @hidden
 */
export class PanesComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('panes', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PanesComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [PaneComponent,] }]
};
