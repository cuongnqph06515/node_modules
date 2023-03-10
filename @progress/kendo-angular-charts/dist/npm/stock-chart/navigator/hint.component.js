"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var settings_component_1 = require("../../common/settings.component");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-hint',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorHintComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    NavigatorHintComponent.propDecorators = {
        content: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }]
    };
    return NavigatorHintComponent;
}(settings_component_1.SettingsComponent));
exports.NavigatorHintComponent = NavigatorHintComponent;
