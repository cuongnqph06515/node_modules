/**
 * Represents the available check modes of the TreeView
 * ([see example]({% slug checkboxes_treeview %})).
 *
 * {% meta height:300 %}
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <div class="k-form-field">
 *             <span>Mode</span>
 *             <input type="radio" name="checkMode" id="singleCheck" value="single" class="k-radio"
 *                 [(ngModel)]="checkMode" />
 *             <label class="k-radio-label" for="singleCheck">Single</label>
 *             <input type="radio" name="checkMode" id="multipleCheck" value="multiple" class="k-radio"
 *                 [(ngModel)]="checkMode" />
 *             <label class="k-radio-label" for="multipleCheck">Multiple</label>
 *        </div>
 *        <kendo-treeview
 *          [nodes]="data"
 *          kendoTreeViewExpandable
 *          [kendoTreeViewCheckable]="{ mode: checkMode }"
 *
 *          kendoTreeViewHierarchyBinding
 *          [childrenField]="'items'"
 *          [textField]="'text'"
 *        >
 *        </kendo-treeview>
 *    `
 * })
 *
 * class AppComponent {
 *   public checkMode: any = 'single';
 *
 *   public data: any[] = [
 *   {
 *     text: "Furniture", items: [
 *       { text: "Tables & Chairs" },
 *       { text: "Sofas" },
 *       {
 *         text: "Occasional Furniture", items: [{
 *           text: "Decor", items: [
 *             { text: "Bed Linen" },
 *             { text: "Curtains & Blinds" },
 *             { text: "Carpets" }
 *           ]
 *         }]
 *       }
 *     ]
 *   }
 *   ];
 * }
 *
 * ```
 * {% endmeta %}
 */
export declare type CheckMode = "single" | "multiple";
