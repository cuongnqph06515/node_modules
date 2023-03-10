"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var prefix_configuration_service_1 = require("../../common/prefix-configuration.service");
var pane_component_generated_1 = require("../../chart/pane.component.generated");
/**
 * The configuration component of the navigator pane
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
var NavigatorPaneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorPaneComponent, _super);
    function NavigatorPaneComponent(configurationService) {
        var _this = _super.call(this, configurationService, null) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorPaneComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: prefix_configuration_service_1.PREFIX, useValue: 'navigator.pane' }, { provide: configuration_service_1.ConfigurationService, useClass: prefix_configuration_service_1.PrefixConfigurationService }],
                    selector: 'kendo-chart-navigator-pane',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorPaneComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorPaneComponent;
}(pane_component_generated_1.PaneComponentGenerated));
exports.NavigatorPaneComponent = NavigatorPaneComponent;
