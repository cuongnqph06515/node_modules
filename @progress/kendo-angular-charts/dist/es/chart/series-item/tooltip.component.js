import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesTooltipComponentGenerated } from '../series-item/tooltip.component.generated';
/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
var SeriesTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesTooltipComponent, _super);
    function SeriesTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    Object.defineProperty(SeriesTooltipComponent.prototype, "seriesTooltipTemplateRef", {
        get: function () {
            return this.seriesTooltipTemplate;
        },
        enumerable: true,
        configurable: true
    });
    SeriesTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    SeriesTooltipComponent.propDecorators = {
        seriesTooltipTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return SeriesTooltipComponent;
}(SeriesTooltipComponentGenerated));
export { SeriesTooltipComponent };
