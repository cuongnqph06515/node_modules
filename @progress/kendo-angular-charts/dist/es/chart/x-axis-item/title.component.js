import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisTitleComponentGenerated } from '../x-axis-item/title.component.generated';
/**
 * The title configuration of the Scatter Chart X axis.
 */
var XAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisTitleComponent, _super);
    // Place custom properties here
    function XAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisTitleComponent;
}(XAxisTitleComponentGenerated));
export { XAxisTitleComponent };
