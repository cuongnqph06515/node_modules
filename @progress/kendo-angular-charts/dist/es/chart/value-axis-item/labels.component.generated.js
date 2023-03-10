import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var ValueAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisLabelsComponentGenerated, _super);
    function ValueAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisLabelsComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
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
    return ValueAxisLabelsComponentGenerated;
}(SettingsComponent));
export { ValueAxisLabelsComponentGenerated };
