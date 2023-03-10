import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisLabelsComponentGenerated } from '../y-axis-item/labels.component.generated';
/**
 * The axis labels configuration.
 */
var YAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisLabelsComponent, _super);
    // Place custom properties here
    function YAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisLabelsComponent;
}(YAxisLabelsComponentGenerated));
export { YAxisLabelsComponent };
