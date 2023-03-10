"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_icon_component_generated_1 = require("../series-item/notes.icon.component.generated");
/**
 * The icon of the notes.
 */
var SeriesNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesIconComponent, _super);
    // Place custom properties here
    function SeriesNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesIconComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesIconComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesNotesIconComponent;
}(notes_icon_component_generated_1.SeriesNotesIconComponentGenerated));
exports.SeriesNotesIconComponent = SeriesNotesIconComponent;
