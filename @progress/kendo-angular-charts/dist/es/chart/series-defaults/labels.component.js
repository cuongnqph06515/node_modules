import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsComponentGenerated } from '../series-defaults/labels.component.generated';
/**
 * The configuration of the Chart series label.
 */
var SeriesDefaultsLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsComponent;
}(SeriesDefaultsLabelsComponentGenerated));
export { SeriesDefaultsLabelsComponent };
