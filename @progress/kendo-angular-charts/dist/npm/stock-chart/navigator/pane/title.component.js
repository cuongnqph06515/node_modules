"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var title_component_1 = require("../../../chart/pane/title.component");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorPaneTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorPaneTitleComponent;
}(title_component_1.PanesTitleComponent));
exports.NavigatorPaneTitleComponent = NavigatorPaneTitleComponent;
