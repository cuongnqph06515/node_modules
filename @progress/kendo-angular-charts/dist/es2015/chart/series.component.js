import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { CollectionService } from '../common/collection.service';
import { TooltipTemplateService } from '../common/tooltip-template.service';
import { SeriesComponentGenerated } from './series.component.generated';
/**
 * A collection of one or more series items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
export class SeriesComponent extends SeriesComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService, tooltipTemplateService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.tooltipTemplateService = tooltipTemplateService;
    }
    ngAfterContentChecked() {
        this.readTooltipTemplates();
    }
    readTooltipTemplates() {
        const templates = this.children.map((item) => item.seriesTooltipTemplateRef);
        this.tooltipTemplateService.setSeriesTemplates(templates);
    }
}
SeriesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-series',
                template: ''
            },] },
];
/** @nocollapse */
SeriesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: TooltipTemplateService }
];
