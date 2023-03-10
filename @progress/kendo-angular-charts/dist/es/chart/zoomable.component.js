import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { ZoomableComponentGenerated } from './zoomable.component.generated';
/**
 * Specifies if the Chart can be zoomed.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-zoomable [mousewheel]="false"></kendo-chart-zoomable>
 * </kendo-chart>
 * ```
 */
var ZoomableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ZoomableComponent, _super);
    // Place custom properties here
    function ZoomableComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ZoomableComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-zoomable',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ZoomableComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ZoomableComponent;
}(ZoomableComponentGenerated));
export { ZoomableComponent };
