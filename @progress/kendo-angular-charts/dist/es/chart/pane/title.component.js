import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { PanesTitleComponentGenerated } from '../pane/title.component.generated';
/**
 * The configuration of the Chart pane title.
 */
var PanesTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanesTitleComponent, _super);
    // Place custom properties here
    function PanesTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PanesTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PanesTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return PanesTitleComponent;
}(PanesTitleComponentGenerated));
export { PanesTitleComponent };
