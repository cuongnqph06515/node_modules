/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `remove` event. The `remove` event fires when an uploaded
 * or selected file is about to be removed. If you cancel the event, the removal is prevented.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (remove)="removeEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    removeEventHandler(e: RemoveEvent) {
 *      console.log('Removing a file');
 *    }
 *  }
 * ```
 */
var RemoveEvent = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveEvent, _super);
    /**
     * Constructs the event arguments for the `remove` event.
     * @param files - The list of the files that will be removed.
     * @param headers - The headers of the request.
     */
    function RemoveEvent(files, headers) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.headers = headers;
        return _this;
    }
    return RemoveEvent;
}(PreventableEvent));
export { RemoveEvent };
