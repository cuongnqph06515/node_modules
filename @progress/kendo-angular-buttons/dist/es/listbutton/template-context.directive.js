/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ViewContainerRef, Input } from '@angular/core';
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
        { type: Directive, args: [{
                    selector: '[templateContext]' // tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    TemplateContextDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TemplateContextDirective.propDecorators = {
        templateContext: [{ type: Input }]
    };
    return TemplateContextDirective;
}());
export { TemplateContextDirective };
