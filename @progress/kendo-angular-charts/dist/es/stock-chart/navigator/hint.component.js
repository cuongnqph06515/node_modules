import * as tslib_1 from "tslib";
import { Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
/**
 * The default options of the navigator hint
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
var NavigatorHintComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorHintComponent, _super);
    function NavigatorHintComponent(configurationService) {
        var _this = _super.call(this, 'hint', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorHintComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-hint',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorHintComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    NavigatorHintComponent.propDecorators = {
        content: [{ type: Input }],
        format: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return NavigatorHintComponent;
}(SettingsComponent));
export { NavigatorHintComponent };
