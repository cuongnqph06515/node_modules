"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the template for the TreeView nodes ([more information and example]({% slug nodetemplate_treeview %})).
 * The template helps to customize the content of the nodes. To define the node template, nest an `<ng-template>`
 * tag with the `kendoTreeViewNodeTemplate` directive inside a `<kendo-treeview>` tag. The template context is set
 * to the data item of the current node.
 *
 * @example
 * ```ts
 *
 *  import { Component } from '@angular/core';
 *  @Component({
 *      selector: 'my-app',
 *      template: `
 *      <kendo-treeview
 *          [nodes]="data"
 *          kendoTreeViewExpandable
 *
 *          kendoTreeViewHierarchyBinding
 *          childrenField="items">
 *        <ng-template kendoTreeViewNodeTemplate let-dataItem>
 *          <span [style.fontWeight]="dataItem.items ? 'bolder': 'normal' ">{{dataItem.text}}</span>
 *        </ng-template>
 *      </kendo-treeview>
 *    `
 *  })
 *  export class AppComponent {
 *      public data: any[] = [
 *          {
 *              text: "Inbox",
 *              items: [{ text: "Read Mail" }]
 *          },
 *          {
 *              text: "Drafts"
 *          },
 *          {
 *              text: "Search Folders",
 *              items: [
 *                  { text: "Categorized Mail" },
 *                  { text: "Large Mail" },
 *                  { text: "Unread Mail"}
 *              ]
 *          },
 *          { text: "Settings" }
 *      ];
 *  }
 *
 * ```
 */
var NodeTemplateDirective = /** @class */ (function () {
    function NodeTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NodeTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoTreeViewNodeTemplate]'
                },] },
    ];
    /** @nocollapse */
    NodeTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NodeTemplateDirective;
}());
exports.NodeTemplateDirective = NodeTemplateDirective;
