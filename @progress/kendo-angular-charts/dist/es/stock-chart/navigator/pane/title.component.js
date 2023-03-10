import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { PanesTitleComponent } from '../../../chart/pane/title.component';
/**
 * The title configuration of the StockChart navigator pane.
 */
var NavigatorPaneTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorPaneTitleComponent, _super);
    function NavigatorPaneTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorPaneTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorPaneTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorPaneTitleComponent;
}(PanesTitleComponent));
export { NavigatorPaneTitleComponent };
