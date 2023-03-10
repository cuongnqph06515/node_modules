import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesComponentGenerated } from '../category-axis-item/notes.component.generated';
/**
 * The configuration of the category axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
var CategoryAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesComponent;
}(CategoryAxisNotesComponentGenerated));
export { CategoryAxisNotesComponent };
