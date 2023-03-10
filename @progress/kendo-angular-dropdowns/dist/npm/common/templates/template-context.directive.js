/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var TemplateContextDirective = /** @class */ (function () {
    function TemplateContextDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplateContextDirective.prototype, "templateContext", {
        set: function (context) {
            if (this.insertedViewRef) {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
                this.insertedViewRef = undefined;
            }
            if (context.templateRef) {
                this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateContextDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[templateContext]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    TemplateContextDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef }
    ]; };
    TemplateContextDirective.propDecorators = {
        templateContext: [{ type: core_1.Input }]
    };
    return TemplateContextDirective;
}());
exports.TemplateContextDirective = TemplateContextDirective;
