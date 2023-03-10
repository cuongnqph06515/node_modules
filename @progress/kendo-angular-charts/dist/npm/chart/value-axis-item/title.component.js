"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var title_component_generated_1 = require("../value-axis-item/title.component.generated");
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
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return ValueAxisTitleComponent;
}(title_component_generated_1.ValueAxisTitleComponentGenerated));
exports.ValueAxisTitleComponent = ValueAxisTitleComponent;
