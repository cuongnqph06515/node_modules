import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesLabelComponent } from '../../../chart/category-axis-item/notes.label.component';
/**
 * The label of the notes.
 */
var NavigatorCategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisNotesLabelComponent, _super);
    function NavigatorCategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesLabelComponent;
}(CategoryAxisNotesLabelComponent));
export { NavigatorCategoryAxisNotesLabelComponent };
