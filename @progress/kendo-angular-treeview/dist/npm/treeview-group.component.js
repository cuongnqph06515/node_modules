"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var expand_state_service_1 = require("./expand-state.service");
var index_builder_service_1 = require("./index-builder.service");
var treeview_lookup_service_1 = require("./treeview-lookup.service");
var navigation_service_1 = require("./navigation/navigation.service");
var node_children_service_1 = require("./node-children.service");
var utils_1 = require("./utils");
var accessor_1 = require("./accessor");
var loading_notification_service_1 = require("./loading-notification.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var data_change_notification_service_1 = require("./data-change-notification.service");
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
        this.children = function () { return rxjs_1.of([]); };
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
            return utils_1.isPresent(this.nodeTemplateRef);
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
        var textField = utils_1.isArray(this.textField) ? this.textField[0] : this.textField;
        return accessor_1.getter(textField, true)(dataItem);
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
            .pipe(operators_1.catchError(function () {
            _this.loadingService.notifyLoaded(index);
            return rxjs_1.EMPTY;
        }), operators_1.tap(function () { return _this.loadingService.notifyLoaded(index); }));
    };
    Object.defineProperty(TreeViewGroupComponent.prototype, "nextFields", {
        get: function () {
            if (utils_1.isArray(this.textField)) {
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
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('toggle', [
                            animations_1.transition('void => *', [
                                animations_1.style({ height: 0 }),
                                animations_1.animate('0.1s ease-in', animations_1.style({ height: "*" }))
                            ]),
                            animations_1.transition('* => void', [
                                animations_1.style({ height: "*" }),
                                animations_1.animate('0.1s ease-in', animations_1.style({ height: 0 }))
                            ])
                        ])
                    ],
                    selector: '[kendoTreeViewGroup]',
                    template: "\n        <li\n            *ngFor=\"let node of data; let index = index\" class=\"k-item k-treeview-item\"\n            kendoTreeViewItem\n            [dataItem]=\"node\"\n            [index]=\"nodeIndex(index)\"\n            [parentDataItem]=\"parentDataItem\"\n            [parentIndex]=\"parentIndex\"\n            [isChecked]=\"isChecked(node, nodeIndex(index))\"\n            [isDisabled]=\"disabled || isDisabled(node, nodeIndex(index))\"\n            [isExpanded]=\"isExpanded(node, nodeIndex(index))\"\n            [isSelected]=\"isSelected(node, nodeIndex(index))\"\n            [attr.data-treeindex]=\"nodeIndex(index)\"\n        >\n            <div class=\"k-mid\">\n                <span\n                    class=\"k-icon\"\n                    [class.k-i-collapse]=\"isExpanded(node, nodeIndex(index))\"\n                    [class.k-i-expand]=\"!isExpanded(node, nodeIndex(index))\"\n                    [kendoTreeViewLoading]=\"nodeIndex(index)\"\n                    (click)=\"expandNode(nodeIndex(index), node, !isExpanded(node, nodeIndex(index)))\"\n                    *ngIf=\"expandIcons && hasChildren(node)\"\n                    >\n                </span>\n                <kendo-checkbox\n                    *ngIf=\"checkboxes\"\n                    [node]=\"node\"\n                    [index]=\"nodeIndex(index)\"\n                    [isChecked]=\"isChecked\"\n                    (checkStateChange)=\"checkNode(nodeIndex(index))\"\n                    tabindex=\"-1\"\n                ></kendo-checkbox>\n                <span kendoTreeViewItemContent\n                    [attr.data-treeindex]=\"nodeIndex(index)\"\n                    [dataItem]=\"node\"\n                    [index]=\"nodeIndex(index)\"\n                    [initialSelection]=\"isSelected(node, nodeIndex(index))\"\n                    [isSelected]=\"isSelected\"\n                    class=\"k-in\"\n                >\n                    <ng-container [ngSwitch]=\"hasTemplate\">\n                        <ng-container *ngSwitchCase=\"true\">\n                            <ng-template\n                                [ngTemplateOutlet]=\"nodeTemplateRef\" [ngTemplateOutletContext]=\"{$implicit: node, index: nodeIndex(index)}\"\n                                >\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngSwitchDefault>\n                            {{nodeText(node)}}\n                        </ng-container>\n                    </ng-container>\n                </span>\n            </div>\n            <ul\n                *ngIf=\"isExpanded(node, nodeIndex(index)) && hasChildren(node)\"\n                kendoTreeViewGroup\n                role=\"group\"\n                [nodes]=\"fetchChildren\"\n                [checkboxes]=\"checkboxes\"\n                [expandIcons]=\"expandIcons\"\n                [children]=\"children\"\n                [hasChildren]=\"hasChildren\"\n                [isChecked]=\"isChecked\"\n                [isDisabled]=\"isDisabled\"\n                [disabled]=\"disabled || isDisabled(node, nodeIndex(index))\"\n                [isExpanded]=\"isExpanded\"\n                [isSelected]=\"isSelected\"\n                [nodeTemplateRef]=\"nodeTemplateRef\"\n                [parentIndex]=\"nodeIndex(index)\"\n                [parentDataItem]=\"node\"\n                [textField]=\"nextFields\"\n                [@toggle]=\"true\"\n                >\n            </ul>\n        </li>\n    "
                },] },
    ];
    /** @nocollapse */
    TreeViewGroupComponent.ctorParameters = function () { return [
        { type: expand_state_service_1.ExpandStateService },
        { type: loading_notification_service_1.LoadingNotificationService },
        { type: index_builder_service_1.IndexBuilderService },
        { type: treeview_lookup_service_1.TreeViewLookupService },
        { type: navigation_service_1.NavigationService },
        { type: node_children_service_1.NodeChildrenService },
        { type: data_change_notification_service_1.DataChangeNotificationService }
    ]; };
    TreeViewGroupComponent.propDecorators = {
        kGroupClass: [{ type: core_1.HostBinding, args: ["class.k-group",] }],
        role: [{ type: core_1.HostBinding, args: ["attr.role",] }],
        checkboxes: [{ type: core_1.Input }],
        expandIcons: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        nodes: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        parentDataItem: [{ type: core_1.Input }],
        parentIndex: [{ type: core_1.Input }],
        nodeTemplateRef: [{ type: core_1.Input }],
        isChecked: [{ type: core_1.Input }],
        isDisabled: [{ type: core_1.Input }],
        isExpanded: [{ type: core_1.Input }],
        isSelected: [{ type: core_1.Input }],
        children: [{ type: core_1.Input }],
        hasChildren: [{ type: core_1.Input }]
    };
    return TreeViewGroupComponent;
}());
exports.TreeViewGroupComponent = TreeViewGroupComponent;
