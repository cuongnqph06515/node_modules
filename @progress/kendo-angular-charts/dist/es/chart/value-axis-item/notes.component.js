import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisNotesComponentGenerated } from '../value-axis-item/notes.component.generated';
/**
 * The configuration of the value axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
var ValueAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisNotesComponent, _super);
    // Place custom properties here
    function ValueAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisNotesComponent;
}(ValueAxisNotesComponentGenerated));
export { ValueAxisNotesComponent };
