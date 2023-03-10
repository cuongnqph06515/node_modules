import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { SeriesItemComponentGenerated } from './series-item.component.generated';
import { SeriesTooltipComponent } from './series-item/tooltip.component';
const toggle = (flag) => flag === undefined ? false : !flag;
const ɵ0 = toggle;
/**
 * The configuration component for a series item.
 */
export class SeriesItemComponent extends SeriesItemComponentGenerated {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
    /**
     * Toggles the series visibility and updates the parent Chart
     * without animated transitions.
     */
    toggleVisibility() {
        this.options.visible = toggle(this.options.visible);
        this.notify();
    }
    /**
     * Toggles the visibility of a point with the given index.
     * Applicable for the Pie, Donut, and Funnel series.
     *
     * @param pointIndex - The zero-based index of the point to toggle.
     */
    togglePointVisibility(pointIndex) {
        const pv = this.options.pointVisibility = this.options.pointVisibility || {};
        pv[pointIndex] = toggle(pv[pointIndex]);
        this.notify();
    }
    get seriesTooltipTemplateRef() {
        if (this.seriesTooltip) {
            return this.seriesTooltip.seriesTooltipTemplateRef;
        }
    }
}
SeriesItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-series-item',
                template: ''
            },] },
];
/** @nocollapse */
SeriesItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
SeriesItemComponent.propDecorators = {
    seriesTooltip: [{ type: ContentChild, args: [SeriesTooltipComponent,] }]
};
export { ɵ0 };
