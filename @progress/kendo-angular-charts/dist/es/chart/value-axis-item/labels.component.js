import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisLabelsComponentGenerated } from '../value-axis-item/labels.component.generated';
/**
 * The axis labels configuration.
 */
var ValueAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisLabelsComponent, _super);
    // Place custom properties here
    function ValueAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisLabelsComponent;
}(ValueAxisLabelsComponentGenerated));
export { ValueAxisLabelsComponent };
