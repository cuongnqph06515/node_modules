import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var XAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesIconComponentGenerated, _super);
    function XAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return XAxisNotesIconComponentGenerated;
}(SettingsComponent));
export { XAxisNotesIconComponentGenerated };
