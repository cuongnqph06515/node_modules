"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var settings_component_1 = require("../../common/settings.component");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-select',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSelectComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    NavigatorSelectComponent.propDecorators = {
        from: [{ type: core_1.Input }],
        to: [{ type: core_1.Input }],
        mousewheel: [{ type: core_1.Input }]
    };
    return NavigatorSelectComponent;
}(settings_component_1.SettingsComponent));
exports.NavigatorSelectComponent = NavigatorSelectComponent;
