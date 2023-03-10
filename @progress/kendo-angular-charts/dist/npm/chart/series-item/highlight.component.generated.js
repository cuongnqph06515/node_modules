"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
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
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        line: [{ type: core_1.Input }],
        markers: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        toggle: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }]
    };
    return SeriesHighlightComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.SeriesHighlightComponentGenerated = SeriesHighlightComponentGenerated;
