import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesComponentGenerated } from '../series-defaults/notes.component.generated';
/**
 * The configuration of the [`seriesDefaults`]({% slug api_charts_seriesdefaultscomponent %}) notes.
 */
var SeriesDefaultsNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesComponent;
}(SeriesDefaultsNotesComponentGenerated));
export { SeriesDefaultsNotesComponent };
