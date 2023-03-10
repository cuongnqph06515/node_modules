"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var navigation_service_1 = require("./navigation/navigation.service");
var selection_service_1 = require("./selection/selection.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * @hidden
 *
 * A directive which manages the expanded state of the TreeView.
 */
var TreeViewItemContentDirective = /** @class */ (function () {
    function TreeViewItemContentDirective(element, navigationService, selectionService, renderer) {
        var _this = this;
        this.element = element;
        this.navigationService = navigationService;
        this.selectionService = selectionService;
        this.renderer = renderer;
        this.initialSelection = false;
        this.subscriptions = new rxjs_1.Subscription(function () { });
        this.subscriptions.add(this.navigationService.moves
            .subscribe(this.updateItem.bind(this)));
        this.subscriptions.add(this.navigationService.selects
            .pipe(operators_1.filter(function (index) { return index === _this.index; }))
            .subscribe(function (index) {
            return _this.selectionService.select(index, _this.dataItem);
        }));
        this.subscriptions.add(this.selectionService.changes
            .subscribe(function () {
            _this.updateSelection(_this.isSelected(_this.dataItem, _this.index));
        }));
    }
    TreeViewItemContentDirective.prototype.ngOnChanges = function (changes) {
        if (changes.initialSelection) {
            this.updateSelection(this.initialSelection);
        }
    };
    TreeViewItemContentDirective.prototype.ngOnInit = function () {
        this.updateSelection(this.initialSelection);
    };
    TreeViewItemContentDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    TreeViewItemContentDirective.prototype.updateItem = function () {
        this.render(this.navigationService.isActive(this.index), 'k-state-focused');
    };
    TreeViewItemContentDirective.prototype.updateSelection = function (selected) {
        this.render(selected, 'k-state-selected');
    };
    TreeViewItemContentDirective.prototype.render = function (addClass, className) {
        var action = addClass ? 'addClass' : 'removeClass';
        this.renderer[action](this.element.nativeElement, className);
    };
    TreeViewItemContentDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[kendoTreeViewItemContent]' },] },
    ];
    /** @nocollapse */
    TreeViewItemContentDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: navigation_service_1.NavigationService },
        { type: selection_service_1.SelectionService },
        { type: core_1.Renderer2 }
    ]; };
    TreeViewItemContentDirective.propDecorators = {
        dataItem: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        initialSelection: [{ type: core_1.Input }],
        isSelected: [{ type: core_1.Input }]
    };
    return TreeViewItemContentDirective;
}());
exports.TreeViewItemContentDirective = TreeViewItemContentDirective;
