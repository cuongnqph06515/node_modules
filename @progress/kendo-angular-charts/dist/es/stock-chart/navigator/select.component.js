import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * Specifies the initially selected range.
 * If no range is specified, the full range of values is rendered.
 */
var NavigatorSelectComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSelectComponent, _super);
    function NavigatorSelectComponent(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSelectComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-select',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSelectComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    NavigatorSelectComponent.propDecorators = {
        from: [{ type: Input }],
        to: [{ type: Input }],
        mousewheel: [{ type: Input }]
    };
    return NavigatorSelectComponent;
}(SettingsComponent));
export { NavigatorSelectComponent };
