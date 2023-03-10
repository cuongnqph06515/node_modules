import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisNotesIconComponentGenerated } from '../x-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
var XAxisNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesIconComponent, _super);
    // Place custom properties here
    function XAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisNotesIconComponent;
}(XAxisNotesIconComponentGenerated));
export { XAxisNotesIconComponent };
