/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:member-ordering */
import { Component, Renderer2, Input, Output, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { Keys } from '@progress/kendo-angular-common';
import { combineStr } from './util';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class SearchBarComponent {
    constructor(localization, renderer) {
        this.localization = localization;
        this.valueChange = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onNavigate = new EventEmitter();
        this.searchBarClass = true;
        this._userInput = "";
        this._previousValue = "";
        this._placeholder = "";
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.renderer = renderer;
    }
    get userInput() {
        return this._userInput;
    }
    set userInput(userInput) {
        this._userInput = userInput || "";
    }
    get value() {
        return this.input.nativeElement.value;
    }
    set placeholder(text) {
        this._placeholder = text || '';
        this.setInputSize();
    }
    get placeholder() {
        return this._placeholder;
    }
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
    }
    ngOnChanges(changes) {
        let previousUserInput;
        if (this.input && (changes.userInput || changes.suggestedText)) {
            if (changes.userInput && changes.userInput.previousValue) {
                if (this._previousValue === changes.userInput.previousValue) {
                    previousUserInput = this._previousValue;
                }
                else {
                    previousUserInput = changes.userInput.currentValue || "";
                }
            }
            else {
                previousUserInput = this._previousValue;
            }
            const caretIndex = this.input.nativeElement.selectionStart;
            const caretAtEnd = previousUserInput.length === caretIndex;
            this.writeInputValue(this.suggestedText ? combineStr(this.userInput, this.suggestedText) : this.userInput);
            if (this.suggestedText) {
                this.setInputSelection(this.userInput.length, this.suggestedText.length);
            }
            else if (caretAtEnd) {
                this.setInputSelection(this.userInput.length, this.userInput.length);
            }
            else {
                this.setInputSelection(caretIndex, caretIndex);
            }
            this._previousValue = this.userInput;
        }
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    writeInputValue(text) {
        if (isDocumentAvailable()) {
            this.renderer.setProperty(this.input.nativeElement, 'value', text);
        }
    }
    setInputSelection(start, end) {
        if (isDocumentAvailable() && this.input.nativeElement === document.activeElement) {
            try {
                this.input.nativeElement.setSelectionRange(start, end);
            }
            catch (e) {
                //Make sure that the element is in the DOM before you invoke its methods
            }
        }
    }
    handleInput(event) {
        const value = event.target.value;
        if (value !== this.userInput) {
            this._previousValue = value;
            this.valueChange.emit(value);
        }
    }
    handleFocus(event) {
        this.onFocus.emit(event);
    }
    handleBlur(event) {
        this.onBlur.emit(event);
    }
    handleKeydown(event) {
        const keyCode = event.keyCode;
        const keys = [Keys.ArrowUp, Keys.ArrowDown, Keys.ArrowLeft, Keys.ArrowRight, Keys.Enter,
            Keys.Escape, Keys.Delete, Keys.Backspace, Keys.Home, Keys.End];
        if (keys.indexOf(keyCode) > -1) {
            this.onNavigate.emit(event);
        }
    }
    focus() {
        if (isDocumentAvailable()) {
            this.input.nativeElement.focus();
        }
    }
    blur() {
        if (isDocumentAvailable()) {
            this.input.nativeElement.blur();
        }
    }
    setInputSize() {
        const lengthOf = x => x ? x.length : 0;
        const input = this.input.nativeElement;
        const placeholderLength = lengthOf(this.placeholder);
        const textLength = lengthOf(this.value);
        const size = Math.max(placeholderLength, textLength, 1);
        this.renderer.setAttribute(input, 'size', size.toString());
    }
}
SearchBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-searchbar',
                template: `
        <input #input
            autocomplete="off"
            [id]="id"
            [disabled]="disabled"
            [readonly]="readonly"
            [placeholder]="placeholder"
            [class]="'k-input'"
            (input)="handleInput($event)"
            (keydown)="handleKeydown($event)"
            [kendoEventsOutsideAngular]="{
                focus: handleFocus,
                blur: handleBlur
            }"
            [scope]="this"
            [attr.tabIndex]="tabIndex"
            [attr.dir]="direction"
            [attr.role]="role"
            [attr.aria-disabled]="disabled"
            [attr.aria-readonly]="readonly"
            aria-haspopup="listbox"
            [attr.aria-expanded]="popupOpen"
            [attr.aria-owns]="listId"
            [attr.aria-describedby]="tagListId"
            [attr.aria-activedescendant]="activeDescendant"
            [attr.aria-label]="noDataLabel"
        />
   `
            },] },
];
/** @nocollapse */
SearchBarComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: Renderer2 }
];
SearchBarComponent.propDecorators = {
    id: [{ type: Input }],
    listId: [{ type: Input }],
    tagListId: [{ type: Input }],
    activeDescendant: [{ type: Input }],
    noDataLabel: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    tabIndex: [{ type: Input }],
    popupOpen: [{ type: Input }],
    role: [{ type: Input }],
    userInput: [{ type: Input }],
    suggestedText: [{ type: Input }],
    valueChange: [{ type: Output }],
    onBlur: [{ type: Output }],
    onFocus: [{ type: Output }],
    onClick: [{ type: Output }],
    onNavigate: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input', { static: true },] }],
    searchBarClass: [{ type: HostBinding, args: ['class.k-searchbar',] }],
    placeholder: [{ type: Input }]
};
