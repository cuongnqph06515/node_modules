import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesLabelComponentGenerated } from '../series-defaults/notes.label.component.generated';
/**
 * The label of the notes.
 */
var SeriesDefaultsNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesLabelComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesLabelComponent;
}(SeriesDefaultsNotesLabelComponentGenerated));
export { SeriesDefaultsNotesLabelComponent };
