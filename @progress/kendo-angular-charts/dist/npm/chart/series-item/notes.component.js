"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_component_generated_1 = require("../series-item/notes.component.generated");
/**
 * The series notes configuration
 * ([see example]({% slug notes_chart_charts %})).
 */
var SeriesNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesComponent, _super);
    // Place custom properties here
    function SeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesNotesComponent;
}(notes_component_generated_1.SeriesNotesComponentGenerated));
exports.SeriesNotesComponent = SeriesNotesComponent;
