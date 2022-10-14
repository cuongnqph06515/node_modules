/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arguments for the `pause` event. The `pause` event fires when the user
 * pauses a file that is currently uploading.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [chunkable]="true"
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (pause)="pauseEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    pauseEventHandler(ev: PauseEvent) {
 *      console.log('File paused');
 *    }
 *  }
 * ```
 *
 */
var PauseEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `pause` event.
     * @param file - The file that is going to be paused.
     */
    function PauseEvent(file) {
        this.file = file;
    }
    return PauseEvent;
}());
exports.PauseEvent = PauseEvent;
