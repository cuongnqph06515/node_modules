import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { XAxisItemComponentGenerated } from './x-axis-item.component.generated';
/**
 * The configuration component for an X axis
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
export declare class XAxisItemComponent extends XAxisItemComponentGenerated {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    protected intl: IntlService;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService, intl: IntlService, localeId: string);
}
