/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Arguments for the `error` event. The `error` event fires when
 * an `upload` or `remove` operation fails.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (error)="errorEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    errorEventHandler(e: ErrorEvent) {
 *      console.log('An error occurred');
 *    }
 *  }
 * ```
 */
var ErrorEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `error` event.
     *
     * @param files - The list of the files that failed to be uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    function ErrorEvent(files, operation, response) {
        this.files = files;
        this.operation = operation;
        this.response = response;
    }
    return ErrorEvent;
}());
export { ErrorEvent };
