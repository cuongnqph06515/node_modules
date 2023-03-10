import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesIconComponentGenerated } from '../category-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
var CategoryAxisNotesIconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesIconComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesIconComponent;
}(CategoryAxisNotesIconComponentGenerated));
export { CategoryAxisNotesIconComponent };
