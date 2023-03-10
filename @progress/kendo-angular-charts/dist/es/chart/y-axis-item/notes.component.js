import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesComponentGenerated } from '../y-axis-item/notes.component.generated';
/**
 * The configuration of the Y axis notes
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisNotesComponent, _super);
    // Place custom properties here
    function YAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesComponent;
}(YAxisNotesComponentGenerated));
export { YAxisNotesComponent };
