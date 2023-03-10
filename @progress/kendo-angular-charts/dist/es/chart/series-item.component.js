import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { SeriesItemComponentGenerated } from './series-item.component.generated';
import { SeriesTooltipComponent } from './series-item/tooltip.component';
var toggle = function (flag) { return flag === undefined ? false : !flag; };
var ɵ0 = toggle;
/**
 * The configuration component for a series item.
 */
var SeriesItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesItemComponent, _super);
    function SeriesItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    /**
     * Toggles the series visibility and updates the parent Chart
     * without animated transitions.
     */
    SeriesItemComponent.prototype.toggleVisibility = function () {
        this.options.visible = toggle(this.options.visible);
        this.notify();
    };
    /**
     * Toggles the visibility of a point with the given index.
     * Applicable for the Pie, Donut, and Funnel series.
     *
     * @param pointIndex - The zero-based index of the point to toggle.
     */
    SeriesItemComponent.prototype.togglePointVisibility = function (pointIndex) {
        var pv = this.options.pointVisibility = this.options.pointVisibility || {};
        pv[pointIndex] = toggle(pv[pointIndex]);
        this.notify();
    };
    Object.defineProperty(SeriesItemComponent.prototype, "seriesTooltipTemplateRef", {
        get: function () {
            if (this.seriesTooltip) {
                return this.seriesTooltip.seriesTooltipTemplateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    SeriesItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ConfigurationService],
                    selector: 'kendo-chart-series-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    SeriesItemComponent.propDecorators = {
        seriesTooltip: [{ type: ContentChild, args: [SeriesTooltipComponent,] }]
    };
    return SeriesItemComponent;
}(SeriesItemComponentGenerated));
export { SeriesItemComponent };
export { ɵ0 };
