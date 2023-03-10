import * as tslib_1 from "tslib";
import { PreventableEvent } from '../events/preventable-event';
/**
 * The arguments for the `pdfExport` event.
 */
var PDFExportEvent = /** @class */ (function (_super) {
    tslib_1.__extends(PDFExportEvent, _super);
    function PDFExportEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PDFExportEvent;
}(PreventableEvent));
export { PDFExportEvent };
