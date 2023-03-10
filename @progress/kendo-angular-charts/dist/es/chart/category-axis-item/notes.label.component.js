import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesLabelComponentGenerated } from '../category-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
var CategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesLabelComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesLabelComponent;
}(CategoryAxisNotesLabelComponentGenerated));
export { CategoryAxisNotesLabelComponent };
