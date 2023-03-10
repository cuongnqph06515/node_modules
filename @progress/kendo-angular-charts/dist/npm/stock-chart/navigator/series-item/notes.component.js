"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var notes_component_1 = require("../../../chart/series-item/notes.component");
/**
 * The notes configuration of the StockChart navigator series.
 */
var NavigatorSeriesNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesNotesComponent, _super);
    function NavigatorSeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesNotesComponent;
}(notes_component_1.SeriesNotesComponent));
exports.NavigatorSeriesNotesComponent = NavigatorSeriesNotesComponent;
