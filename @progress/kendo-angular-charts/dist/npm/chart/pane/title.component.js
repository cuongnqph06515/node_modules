"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var title_component_generated_1 = require("../pane/title.component.generated");
/**
 * The configuration of the Chart pane title.
 */
var PanesTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanesTitleComponent, _super);
    // Place custom properties here
    function PanesTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PanesTitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PanesTitleComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return PanesTitleComponent;
}(title_component_generated_1.PanesTitleComponentGenerated));
exports.PanesTitleComponent = PanesTitleComponent;
