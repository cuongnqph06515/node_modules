import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var CategoryAxisNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisNotesComponentGenerated, _super);
    function CategoryAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return CategoryAxisNotesComponentGenerated;
}(SettingsComponent));
export { CategoryAxisNotesComponentGenerated };
