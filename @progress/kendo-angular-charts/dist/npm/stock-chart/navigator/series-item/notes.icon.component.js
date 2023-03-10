"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var notes_icon_component_1 = require("../../../chart/series-item/notes.icon.component");
/**
 * The icon of the notes.
 */
var NavigatorSeriesNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesNotesIconComponent, _super);
    function NavigatorSeriesNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesIconComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesIconComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesNotesIconComponent;
}(notes_icon_component_1.SeriesNotesIconComponent));
exports.NavigatorSeriesNotesIconComponent = NavigatorSeriesNotesIconComponent;
