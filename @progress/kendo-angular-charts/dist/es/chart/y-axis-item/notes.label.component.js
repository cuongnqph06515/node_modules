import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesLabelComponentGenerated } from '../y-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
var YAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisNotesLabelComponent, _super);
    // Place custom properties here
    function YAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesLabelComponent;
}(YAxisNotesLabelComponentGenerated));
export { YAxisNotesLabelComponent };
