import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NavigationService } from './navigation/navigation.service';
import { SelectionService } from './selection/selection.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
        this.subscriptions = new Subscription(function () { });
        this.subscriptions.add(this.navigationService.moves
            .subscribe(this.updateItem.bind(this)));
        this.subscriptions.add(this.navigationService.selects
            .pipe(filter(function (index) { return index === _this.index; }))
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
        { type: Directive, args: [{ selector: '[kendoTreeViewItemContent]' },] },
    ];
    /** @nocollapse */
    TreeViewItemContentDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NavigationService },
        { type: SelectionService },
        { type: Renderer2 }
    ]; };
    TreeViewItemContentDirective.propDecorators = {
        dataItem: [{ type: Input }],
        index: [{ type: Input }],
        initialSelection: [{ type: Input }],
        isSelected: [{ type: Input }]
    };
    return TreeViewItemContentDirective;
}());
export { TreeViewItemContentDirective };
