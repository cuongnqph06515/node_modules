"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_service_1 = require("../common/collection.service");
var configuration_service_1 = require("../common/configuration.service");
var y_axis_item_component_generated_1 = require("./y-axis-item.component.generated");
/**
 * The configuration component for the Y axis
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisItemComponent, _super);
    // Place custom properties here
    function YAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    YAxisItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [configuration_service_1.ConfigurationService],
                    selector: 'kendo-chart-y-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisItemComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService },
        { type: collection_service_1.CollectionService }
    ]; };
    return YAxisItemComponent;
}(y_axis_item_component_generated_1.YAxisItemComponentGenerated));
exports.YAxisItemComponent = YAxisItemComponent;
