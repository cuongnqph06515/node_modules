import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisTitleComponentGenerated } from '../value-axis-item/title.component.generated';
/**
 * The title configuration of the value axis.
 */
var ValueAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisTitleComponent, _super);
    // Place custom properties here
    function ValueAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisTitleComponent;
}(ValueAxisTitleComponentGenerated));
export { ValueAxisTitleComponent };
