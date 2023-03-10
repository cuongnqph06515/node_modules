"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var title_component_generated_1 = require("../x-axis-item/title.component.generated");
/**
 * The title configuration of the Scatter Chart X axis.
 */
var XAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisTitleComponent, _super);
    // Place custom properties here
    function XAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisTitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return XAxisTitleComponent;
}(title_component_generated_1.XAxisTitleComponentGenerated));
exports.XAxisTitleComponent = XAxisTitleComponent;
