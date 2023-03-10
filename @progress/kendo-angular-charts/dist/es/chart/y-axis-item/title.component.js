import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisTitleComponentGenerated } from '../y-axis-item/title.component.generated';
/**
 * The title configuration of the Scatter Chart Y axis.
 */
var YAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisTitleComponent, _super);
    // Place custom properties here
    function YAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisTitleComponent;
}(YAxisTitleComponentGenerated));
export { YAxisTitleComponent };
