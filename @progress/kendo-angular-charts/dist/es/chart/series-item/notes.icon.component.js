import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesNotesIconComponentGenerated } from '../series-item/notes.icon.component.generated';
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesIconComponent;
}(SeriesNotesIconComponentGenerated));
export { SeriesNotesIconComponent };
