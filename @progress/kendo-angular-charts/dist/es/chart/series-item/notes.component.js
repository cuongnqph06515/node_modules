import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesNotesComponentGenerated } from '../series-item/notes.component.generated';
/**
 * The series notes configuration
 * ([see example]({% slug notes_chart_charts %})).
 */
var SeriesNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesComponent, _super);
    // Place custom properties here
    function SeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesComponent;
}(SeriesNotesComponentGenerated));
export { SeriesNotesComponent };
