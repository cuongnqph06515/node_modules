/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `select` event. The `select` event fires when the user
 * selects a file or multiple files for upload. If you cancel the event, the selection is prevented.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (select)="selectEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    selectEventHandler(e: SelectEvent) {
 *      console.log('File selected');
 *    }
 *  }
 * ```
 */
var SelectEvent = /** @class */ (function (_super) {
    tslib_1.__extends(SelectEvent, _super);
    /**
     * Constructs the event arguments for the `select` event.
     * @param files - The list of the selected files.
     */
    function SelectEvent(files) {
        var _this = _super.call(this) || this;
        _this.files = files;
        return _this;
    }
    return SelectEvent;
}(PreventableEvent));
export { SelectEvent };
