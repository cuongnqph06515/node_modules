import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesIconComponentGenerated } from '../y-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
var YAxisNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisNotesIconComponent, _super);
    // Place custom properties here
    function YAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesIconComponent;
}(YAxisNotesIconComponentGenerated));
export { YAxisNotesIconComponent };
