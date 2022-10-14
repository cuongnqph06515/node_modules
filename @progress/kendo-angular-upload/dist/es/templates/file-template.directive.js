/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef } from '@angular/core';
/**
 * Used to customize the rendering of the files in the list ([see example]({% slug templates_upload %})).
 */
var FileTemplateDirective = /** @class */ (function () {
    function FileTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FileTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoUploadFileTemplate], [kendoFileSelectFileTemplate]' // tslint:disable-line:directive-selector-prefix
                },] },
    ];
    /** @nocollapse */
    FileTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return FileTemplateDirective;
}());
export { FileTemplateDirective };
