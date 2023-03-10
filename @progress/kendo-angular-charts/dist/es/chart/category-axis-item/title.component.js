import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisTitleComponentGenerated } from '../category-axis-item/title.component.generated';
/**
 * The configuration of the category axis title.
 */
var CategoryAxisTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisTitleComponent, _super);
    // Place custom properties here
    function CategoryAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisTitleComponent;
}(CategoryAxisTitleComponentGenerated));
export { CategoryAxisTitleComponent };
