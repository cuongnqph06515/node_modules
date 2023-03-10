import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesHighlightComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesHighlightComponentGenerated, _super);
    function SeriesHighlightComponentGenerated(configurationService) {
        var _this = _super.call(this, 'highlight', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesHighlightComponentGenerated.propDecorators = {
        border: [{ type: Input }],
        color: [{ type: Input }],
        line: [{ type: Input }],
        markers: [{ type: Input }],
        opacity: [{ type: Input }],
        toggle: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return SeriesHighlightComponentGenerated;
}(SettingsComponent));
export { SeriesHighlightComponentGenerated };
