"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var notes_label_component_1 = require("../../../chart/series-item/notes.label.component");
/**
 * The label of the notes.
 */
var NavigatorSeriesNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorSeriesNotesLabelComponent, _super);
    function NavigatorSeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorSeriesNotesLabelComponent;
}(notes_label_component_1.SeriesNotesLabelComponent));
exports.NavigatorSeriesNotesLabelComponent = NavigatorSeriesNotesLabelComponent;
