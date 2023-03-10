import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisNotesComponentGenerated } from '../x-axis-item/notes.component.generated';
/**
 * The configuration of the X-axis notes.
 * For an example on the basic usage of the XAxisNotesComponent,
 * refer to the [demo on the XAxisComponent]({% slug api_charts_xaxiscomponent %})
 * or to the documentation about the
 * [axis notes]({% slug notes_chart_charts %}#toc-axis-notes).
 */
var XAxisNotesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesComponent, _super);
    // Place custom properties here
    function XAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisNotesComponent;
}(XAxisNotesComponentGenerated));
export { XAxisNotesComponent };
