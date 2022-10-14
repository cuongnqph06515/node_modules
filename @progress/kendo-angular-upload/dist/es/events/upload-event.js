/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `upload` event. The `upload` event fires when one or more files are about
 * to be uploaded. If you cancel the event, the upload is prevented. You can add headers to the request.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (upload)="uploadEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    uploadEventHandler(e: UploadEvent) {
 *      e.headers = e.headers.append('X-Foo', 'Bar');
 *    }
 *  }
 * ```
 */
var UploadEvent = /** @class */ (function (_super) {
    tslib_1.__extends(UploadEvent, _super);
    /**
     * Constructs the event arguments for the `upload` event.
     * @param files - The list of the files that will be uploaded.
     * @param headers - The headers of the request.
     */
    function UploadEvent(files, headers) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.headers = headers;
        return _this;
    }
    return UploadEvent;
}(PreventableEvent));
export { UploadEvent };
