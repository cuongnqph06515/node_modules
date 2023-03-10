/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Used to customize the rendering of the files in the list ([see example]({% slug templates_upload %})).
 */
var FileTemplateDirective = /** @class */ (function () {
    function FileTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FileTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoUploadFileTemplate], [kendoFileSelectFileTemplate]' // tslint:disable-line:directive-selector-prefix
                },] },
    ];
    /** @nocollapse */
    FileTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return FileTemplateDirective;
}());
exports.FileTemplateDirective = FileTemplateDirective;
