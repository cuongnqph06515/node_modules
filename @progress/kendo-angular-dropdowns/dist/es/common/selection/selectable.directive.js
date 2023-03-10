/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input, HostBinding, HostListener } from '@angular/core';
import { SelectionService } from './selection.service';
/**
 * @hidden
 */
var SelectableDirective = /** @class */ (function () {
    function SelectableDirective(selectionService) {
        // @HostBinding('attr.offset-index')
        // @Input() public offsetIndex: number;
        this.multipleSelection = false;
        this.selectionService = selectionService;
    }
    Object.defineProperty(SelectableDirective.prototype, "focusedClassName", {
        get: function () {
            return this.selectionService.isFocused(this.index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableDirective.prototype, "selectedClassName", {
        get: function () {
            return this.selectionService.isSelected(this.index);
        },
        enumerable: true,
        configurable: true
    });
    SelectableDirective.prototype.onClick = function (event) {
        event.stopPropagation();
        if (this.multipleSelection) {
            if (this.selectionService.isSelected(this.index)) {
                this.selectionService.unselect(this.index);
            }
            else {
                this.selectionService.add(this.index);
            }
        }
        else {
            this.selectionService.change(this.index);
        }
    };
    SelectableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownsSelectable]'
                },] },
    ];
    /** @nocollapse */
    SelectableDirective.ctorParameters = function () { return [
        { type: SelectionService }
    ]; };
    SelectableDirective.propDecorators = {
        index: [{ type: HostBinding, args: ['attr.index',] }, { type: Input }],
        height: [{ type: HostBinding, args: ['style.height.px',] }, { type: HostBinding, args: ['style.minHeight.px',] }, { type: Input }],
        multipleSelection: [{ type: Input }],
        focusedClassName: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        selectedClassName: [{ type: HostBinding, args: ['class.k-state-selected',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return SelectableDirective;
}());
export { SelectableDirective };
