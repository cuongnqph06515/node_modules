import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsFromComponentGenerated } from '../series-defaults/labels.from.component.generated';
/**
 * The `from` label configuration of the Chart series.
 */
var SeriesDefaultsLabelsFromComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsFromComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsFromComponent;
}(SeriesDefaultsLabelsFromComponentGenerated));
export { SeriesDefaultsLabelsFromComponent };
