import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
/**
 * @hidden
 */
export class PaneComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PaneComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    clip: [{ type: Input }],
    height: [{ type: Input }],
    margin: [{ type: Input }],
    name: [{ type: Input }],
    padding: [{ type: Input }],
    title: [{ type: Input }]
};
