import { Component, ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../base-components';
import { LinearRangeComponent } from './range.component';
import { CollectionChangesService, ConfigurationService } from '../services';
/**
 * A collection of one or more LinearGauge scale ranges
 * ([more information and example]({% slug scaleranghes_lineargauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-lineargauge>
 *             <kendo-lineargauge-scale>
 *                 <kendo-lineargauge-scale-ranges>
 *                     <kendo-lineargauge-scale-range *ngFor="let range of ranges"
 *                         [from]="range.from" [to]="range.to" [color]="range.color">
 *                     </kendo-lineargauge-scale-range>
 *                 </kendo-lineargauge-scale-ranges>
 *             </kendo-lineargauge-scale>
 *         </kendo-lineargauge>
 *     `
 * })
 * export class AppComponent {
 *     public ranges: any[] = [{
 *         from: 0,
 *         to: 15,
 *         color: '#ffd246'
 *     }, {
 *         from: 15,
 *         to: 30,
 *         color: '#28b4c8'
 *     }, {
 *         from: 30,
 *         to: 50,
 *         color: '#78d237'
 *     }];
 * }
 *
 * ```
 */
export class LinearRangesComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('scale.ranges', configurationService, collectionChangesService);
    }
}
LinearRangesComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-lineargauge-scale-ranges',
                template: ''
            },] },
];
/** @nocollapse */
LinearRangesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
LinearRangesComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [LinearRangeComponent,] }]
};
