import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesHighlightComponentGenerated } from '../series-item/highlight.component.generated';
/**
 * The Chart series highlighting configuration options.
 */
var SeriesHighlightComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesHighlightComponent, _super);
    function SeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesHighlightComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesHighlightComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesHighlightComponent;
}(SeriesHighlightComponentGenerated));
export { SeriesHighlightComponent };
