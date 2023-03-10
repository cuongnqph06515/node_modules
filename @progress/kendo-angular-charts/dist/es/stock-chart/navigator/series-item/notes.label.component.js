import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesNotesLabelComponent } from '../../../chart/series-item/notes.label.component';
/**
 * The label of the notes.
 */
var NavigatorSeriesNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesNotesLabelComponent, _super);
    function NavigatorSeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesNotesLabelComponent;
}(SeriesNotesLabelComponent));
export { NavigatorSeriesNotesLabelComponent };
