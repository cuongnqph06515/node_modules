/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { UploadComponent } from './upload.component';
import { FileSelectComponent } from './fileselect.component';
/**
 * @hidden
 */
export declare class DropZoneService {
    addComponent(component: UploadComponent | FileSelectComponent, zoneId: string): void;
    getComponents(zoneId: string): Array<UploadComponent | FileSelectComponent>;
    private has;
}
