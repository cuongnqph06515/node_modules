import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ExpandStateService } from './expand-state.service';
import { IndexBuilderService } from './index-builder.service';
import { TreeViewLookupService } from './treeview-lookup.service';
import { NavigationService } from './navigation/navigation.service';
import { NodeChildrenService } from './node-children.service';
import { isPresent, isArray } from './utils';
import { getter } from './accessor';
import { LoadingNotificationService } from './loading-notification.service';
import { EMPTY, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataChangeNotificationService } from './data-change-notification.service';
/**
 * @hidden
 */
var TreeViewGroupComponent = /** @class */ (function () {
    function TreeViewGroupComponent(expandService, loadingService, indexBuilder, treeViewLookupService, navigationService, nodeChildrenService, dataChangeNotification) {
        this.expandService = expandService;
        this.loadingService = loadingService;
        this.indexBuilder = indexBuilder;
        this.treeViewLookupService = treeViewLookupService;
        this.navigationService = navigationService;
        this.nodeChildrenService = nodeChildrenService;
        this.dataChangeNotification = dataChangeNotification;
        this.kGroupClass = true;
        this.textField = "";
        this._data = [];
        this.isChecked = function () { return 'none'; };
        this.isDisabled = function () { return false; };
        this.isExpanded = function () { return false; };
        this.isSelected = function () { return false; };
        this.children = function () { return of([]); };
        this.hasChildren = function () { return false; };
    }
    Object.defineProperty(TreeViewGroupComponent.prototype, "role", {
        get: function () { return 'group'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeViewGroupComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            var mappedChildren = this.mapToTreeItem(data);
            this.setNodeChildren(mappedChildren);
            this.emitChildrenLoaded(mappedChildren);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeViewGroupComponent.prototype, "hasTemplate", {
        get: function () {
            return isPresent(this.nodeTemplateRef);
        },
        enumerable: true,
        configurable: true
    });
    TreeViewGroupComponent.prototype.expandNode = function (index, dataItem, expand) {
        if (expand) {
            this.expandService.expand(index, dataItem);
        }
        else {
            this.expandService.collapse(index, dataItem);
        }
    };
    TreeViewGroupComponent.prototype.checkNode = function (index) {
        this.navigationService.checkIndex(index);
        this.navigationService.activateIndex(index);
    };
    TreeViewGroupComponent.prototype.nodeIndex = function (index) {
        return this.indexBuilder.nodeIndex(index.toString(), this.parentIndex);
    };
    TreeViewGroupComponent.prototype.nodeText = function (dataItem) {
        var textField = isArray(this.textField) ? this.textField[0] : this.textField;
        return getter(textField, true)(dataItem);
    };
    TreeViewGroupComponent.prototype.ngOnDestroy = function () {
        if (this.nodesSubscription) {
            this.nodesSubscription.unsubscribe();
        }
        if (this.dataChangeSubscription) {
            this.dataChangeSubscription.unsubscribe();
        }
    };
    TreeViewGroupComponent.prototype.ngOnInit = function () {
        this.subscribeToNodesChange();
        this.dataChangeSubscription = this.dataChangeNotification
            .changes
            .subscribe(this.subscribeToNodesChange.bind(this));
    };
    TreeViewGroupComponent.prototype.ngOnChanges = function (changes) {
        if (changes.parentIndex) {
            this.setNodeChildren(this.mapToTreeItem(this.data));
        }
    };
    TreeViewGroupComponent.prototype.fetchChildren = function (node, index) {
        var _this = this;
        return this.children(node)
            .pipe(catchError(function () {
            _this.loadingService.notifyLoaded(index);
            return EMPTY;
        }), tap(function () { return _this.loadingService.notifyLoaded(index); }));
    };
    Object.defineProperty(TreeViewGroupComponent.prototype, "nextFields", {
        get: function () {
            if (isArray(this.textField)) {
                return this.textField.length > 1 ? this.textField.slice(1) : this.textField;
            }
            return [this.textField];
        },
        enumerable: true,
        configurable: true
    });
    TreeViewGroupComponent.prototype.setNodeChildren = function (children) {
        this.treeViewLookupService.registerChildren(this.parentIndex, children);
    };
    TreeViewGroupComponent.prototype.mapToTreeItem = function (data) {
        var _this = this;
        if (!this.parentIndex) {
            return [];
        }
        return data.map(function (dataItem, idx) { return ({ dataItem: dataItem, index: _this.nodeIndex(idx) }); });
    };
    TreeViewGroupComponent.prototype.emitChildrenLoaded = function (children) {
        if (!this.parentIndex) {
            return;
        }
        this.nodeChildrenService.childrenLoaded({ dataItem: this.parentDataItem, index: this.parentIndex }, children);
    };
    TreeViewGroupComponent.prototype.subscribeToNodesChange = function () {
        var _this = this;
        if (this.nodesSubscription) {
            this.nodesSubscription.unsubscribe();
        }
        this.nodesSubscription = this.nodes(this.parentDataItem, this.parentIndex).subscribe(function (x) { _this.data = x; });
    };
    TreeViewGroupComponent.decorators = [
        { type: Component, args: [{
                    animations: [
                        trigger('toggle', [
                            transition('void => *', [
                                style({ height: 0 }),
                                animate('0.1s ease-in', style({ height: "*" }))
                            ]),
                            transition('* => void', [
                                style({ height: "*" }),
                                animate('0.1s ease-in', style({ height: 0 }))
                            ])
                        ])
                    ],
                    selector: '[kendoTreeViewGroup]',
                    template: "\n        <li\n            *ngFor=\"let node of data; let index = index\" class=\"k-item k-treeview-item\"\n            kendoTreeViewItem\n            [dataItem]=\"node\"\n            [index]=\"nodeIndex(index)\"\n            [parentDataItem]=\"parentDataItem\"\n            [parentIndex]=\"parentIndex\"\n            [isChecked]=\"isChecked(node, nodeIndex(index))\"\n            [isDisabled]=\"disabled || isDisabled(node, nodeIndex(index))\"\n            [isExpanded]=\"isExpanded(node, nodeIndex(index))\"\n            [isSelected]=\"isSelected(node, nodeIndex(index))\"\n            [attr.data-treeindex]=\"nodeIndex(index)\"\n        >\n            <div class=\"k-mid\">\n                <span\n                    class=\"k-icon\"\n                    [class.k-i-collapse]=\"isExpanded(node, nodeIndex(index))\"\n                    [class.k-i-expand]=\"!isExpanded(node, nodeIndex(index))\"\n                    [kendoTreeViewLoading]=\"nodeIndex(index)\"\n                    (click)=\"expandNode(nodeIndex(index), node, !isExpanded(node, nodeIndex(index)))\"\n                    *ngIf=\"expandIcons && hasChildren(node)\"\n                    >\n                </span>\n                <kendo-checkbox\n                    *ngIf=\"checkboxes\"\n                    [node]=\"node\"\n                    [index]=\"nodeIndex(index)\"\n                    [isChecked]=\"isChecked\"\n                    (checkStateChange)=\"checkNode(nodeIndex(index))\"\n                    tabindex=\"-1\"\n                ></kendo-checkbox>\n                <span kendoTreeViewItemContent\n                    [attr.data-treeindex]=\"nodeIndex(index)\"\n                    [dataItem]=\"node\"\n                    [index]=\"nodeIndex(index)\"\n                    [initialSelection]=\"isSelected(node, nodeIndex(index))\"\n                    [isSelected]=\"isSelected\"\n                    class=\"k-in\"\n                >\n                    <ng-container [ngSwitch]=\"hasTemplate\">\n                        <ng-container *ngSwitchCase=\"true\">\n                            <ng-template\n                                [ngTemplateOutlet]=\"nodeTemplateRef\" [ngTemplateOutletContext]=\"{$implicit: node, index: nodeIndex(index)}\"\n                                >\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngSwitchDefault>\n                            {{nodeText(node)}}\n                        </ng-container>\n                    </ng-container>\n                </span>\n            </div>\n            <ul\n                *ngIf=\"isExpanded(node, nodeIndex(index)) && hasChildren(node)\"\n                kendoTreeViewGroup\n                role=\"group\"\n                [nodes]=\"fetchChildren\"\n                [checkboxes]=\"checkboxes\"\n                [expandIcons]=\"expandIcons\"\n                [children]=\"children\"\n                [hasChildren]=\"hasChildren\"\n                [isChecked]=\"isChecked\"\n                [isDisabled]=\"isDisabled\"\n                [disabled]=\"disabled || isDisabled(node, nodeIndex(index))\"\n                [isExpanded]=\"isExpanded\"\n                [isSelected]=\"isSelected\"\n                [nodeTemplateRef]=\"nodeTemplateRef\"\n                [parentIndex]=\"nodeIndex(index)\"\n                [parentDataItem]=\"node\"\n                [textField]=\"nextFields\"\n                [@toggle]=\"true\"\n                >\n            </ul>\n        </li>\n    "
                },] },
    ];
    /** @nocollapse */
    TreeViewGroupComponent.ctorParameters = function () { return [
        { type: ExpandStateService },
        { type: LoadingNotificationService },
        { type: IndexBuilderService },
        { type: TreeViewLookupService },
        { type: NavigationService },
        { type: NodeChildrenService },
        { type: DataChangeNotificationService }
    ]; };
    TreeViewGroupComponent.propDecorators = {
        kGroupClass: [{ type: HostBinding, args: ["class.k-group",] }],
        role: [{ type: HostBinding, args: ["attr.role",] }],
        checkboxes: [{ type: Input }],
        expandIcons: [{ type: Input }],
        disabled: [{ type: Input }],
        nodes: [{ type: Input }],
        textField: [{ type: Input }],
        parentDataItem: [{ type: Input }],
        parentIndex: [{ type: Input }],
        nodeTemplateRef: [{ type: Input }],
        isChecked: [{ type: Input }],
        isDisabled: [{ type: Input }],
        isExpanded: [{ type: Input }],
        isSelected: [{ type: Input }],
        children: [{ type: Input }],
        hasChildren: [{ type: Input }]
    };
    return TreeViewGroupComponent;
}());
export { TreeViewGroupComponent };
