import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesNotesLabelComponentGenerated } from '../series-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
var SeriesNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesLabelComponent, _super);
    // Place custom properties here
    function SeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesLabelComponent;
}(SeriesNotesLabelComponentGenerated));
export { SeriesNotesLabelComponent };
