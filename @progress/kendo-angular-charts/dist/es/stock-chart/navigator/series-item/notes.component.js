import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesNotesComponent } from '../../../chart/series-item/notes.component';
/**
 * The notes configuration of the StockChart navigator series.
 */
var NavigatorSeriesNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesNotesComponent, _super);
    function NavigatorSeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesNotesComponent;
}(SeriesNotesComponent));
export { NavigatorSeriesNotesComponent };
