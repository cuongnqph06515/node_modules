import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var ValueAxisNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisNotesComponentGenerated, _super);
    function ValueAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return ValueAxisNotesComponentGenerated;
}(SettingsComponent));
export { ValueAxisNotesComponentGenerated };
