import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisNotesIconComponentGenerated, _super);
    function YAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return YAxisNotesIconComponentGenerated;
}(SettingsComponent));
export { YAxisNotesIconComponentGenerated };
