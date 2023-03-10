import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesIconComponentGenerated } from '../series-defaults/notes.icon.component.generated';
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesIconComponent;
}(SeriesDefaultsNotesIconComponentGenerated));
export { SeriesDefaultsNotesIconComponent };
