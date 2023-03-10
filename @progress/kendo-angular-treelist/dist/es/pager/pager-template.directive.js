/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the pager template which helps to customize the pager appearance in the TreeList. To define a pager
 * template, nest an `<ng-template>` tag with the `kendoPagerTemplate` directive inside `<kendo-treelist>`.
 *
 * The template context provides the following fields:
 * * `currentPage`&mdash;The index of the displayed page.
 * * `pageSize`&mdash;The value of the current `pageSize`.
 * * `skip`&mdash;The current skip value.
 * * `total`&mdash;The total number of records.
 * * `totalPages`&mdash;The total number of available pages.
 *
 * {% meta height:470 %}
 * {% embed_file configuration/pager-template-all/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
 */
var PagerTemplateDirective = /** @class */ (function () {
    function PagerTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PagerTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPagerTemplate]'
                },] },
    ];
    /** @nocollapse */
    PagerTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PagerTemplateDirective;
}());
export { PagerTemplateDirective };
