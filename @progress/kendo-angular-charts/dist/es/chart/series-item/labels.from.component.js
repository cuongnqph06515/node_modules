import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsFromComponentGenerated } from '../series-item/labels.from.component.generated';
/**
 * The `from` label configuration of the Chart series.
 */
var SeriesLabelsFromComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsFromComponent, _super);
    // Place custom properties here
    function SeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsFromComponent;
}(SeriesLabelsFromComponentGenerated));
export { SeriesLabelsFromComponent };
