import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisNotesLabelComponentGenerated } from '../value-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
var ValueAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisNotesLabelComponent, _super);
    // Place custom properties here
    function ValueAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisNotesLabelComponent;
}(ValueAxisNotesLabelComponentGenerated));
export { ValueAxisNotesLabelComponent };
