"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_icon_component_generated_1 = require("../series-defaults/notes.icon.component.generated");
/**
 * The icon of the notes.
 */
var SeriesDefaultsNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesIconComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesIconComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesIconComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesDefaultsNotesIconComponent;
}(notes_icon_component_generated_1.SeriesDefaultsNotesIconComponentGenerated));
exports.SeriesDefaultsNotesIconComponent = SeriesDefaultsNotesIconComponent;
