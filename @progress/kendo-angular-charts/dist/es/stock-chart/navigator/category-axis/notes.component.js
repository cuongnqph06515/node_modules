import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesComponent } from '../../../chart/category-axis-item/notes.component';
/**
 * The configuration of the category axis notes.
 */
var NavigatorCategoryAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisNotesComponent, _super);
    function NavigatorCategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesComponent;
}(CategoryAxisNotesComponent));
export { NavigatorCategoryAxisNotesComponent };
