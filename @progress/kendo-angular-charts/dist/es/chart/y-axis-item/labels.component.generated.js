import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisLabelsComponentGenerated, _super);
    function YAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisLabelsComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        culture: [{ type: Input }],
        dateFormats: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        mirror: [{ type: Input }],
        padding: [{ type: Input }],
        position: [{ type: Input }],
        rotation: [{ type: Input }],
        skip: [{ type: Input }],
        step: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return YAxisLabelsComponentGenerated;
}(SettingsComponent));
export { YAxisLabelsComponentGenerated };
