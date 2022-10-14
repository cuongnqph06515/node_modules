/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `success` event. The `success` event fires when
 * the selected files are successfully uploaded or removed.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (success)="successEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    successEventHandler(e: SuccessEvent) {
 *      console.log('The ' + e.operation + ' was successful!');
 *    }
 *  }
 * ```
 */
var SuccessEvent = /** @class */ (function (_super) {
    tslib_1.__extends(SuccessEvent, _super);
    /**
     * Constructs the event arguments for the `success` event.
     * @param files - The list of the files that were uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    function SuccessEvent(files, operation, response) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.operation = operation;
        _this.response = response;
        return _this;
    }
    return SuccessEvent;
}(PreventableEvent));
export { SuccessEvent };
