/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `clear` event. The `clear` event fires when
 * the **Clear** button is clicked. At this point, the selected files are about to be cleared.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [autoUpload]="false"
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (clear)="clearEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    clearEventHandler(e: ClearEvent) {
 *      console.log('Clearing the file upload');
 *    }
 *  }
 * ```
 */
var ClearEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ClearEvent, _super);
    /**
     * Constructs the event arguments for the `clear` event.
     */
    function ClearEvent() {
        return _super.call(this) || this;
    }
    return ClearEvent;
}(PreventableEvent));
export { ClearEvent };
