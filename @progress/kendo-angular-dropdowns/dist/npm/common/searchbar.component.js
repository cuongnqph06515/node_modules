/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:member-ordering */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var util_1 = require("./util");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(localization, renderer) {
        this.localization = localization;
        this.valueChange = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onNavigate = new core_1.EventEmitter();
        this.searchBarClass = true;
        this._userInput = "";
        this._previousValue = "";
        this._placeholder = "";
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.renderer = renderer;
    }
    Object.defineProperty(SearchBarComponent.prototype, "userInput", {
        get: function () {
            return this._userInput;
        },
        set: function (userInput) {
            this._userInput = userInput || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "value", {
        get: function () {
            return this.input.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (text) {
            this._placeholder = text || '';
            this.setInputSize();
        },
        enumerable: true,
        configurable: true
    });
    SearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
    };
    SearchBarComponent.prototype.ngOnChanges = function (changes) {
        var previousUserInput;
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
            var caretIndex = this.input.nativeElement.selectionStart;
            var caretAtEnd = previousUserInput.length === caretIndex;
            this.writeInputValue(this.suggestedText ? util_1.combineStr(this.userInput, this.suggestedText) : this.userInput);
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
    };
    SearchBarComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    SearchBarComponent.prototype.writeInputValue = function (text) {
        if (kendo_angular_common_1.isDocumentAvailable()) {
            this.renderer.setProperty(this.input.nativeElement, 'value', text);
        }
    };
    SearchBarComponent.prototype.setInputSelection = function (start, end) {
        if (kendo_angular_common_1.isDocumentAvailable() && this.input.nativeElement === document.activeElement) {
            try {
                this.input.nativeElement.setSelectionRange(start, end);
            }
            catch (e) {
                //Make sure that the element is in the DOM before you invoke its methods
            }
        }
    };
    SearchBarComponent.prototype.handleInput = function (event) {
        var value = event.target.value;
        if (value !== this.userInput) {
            this._previousValue = value;
            this.valueChange.emit(value);
        }
    };
    SearchBarComponent.prototype.handleFocus = function (event) {
        this.onFocus.emit(event);
    };
    SearchBarComponent.prototype.handleBlur = function (event) {
        this.onBlur.emit(event);
    };
    SearchBarComponent.prototype.handleKeydown = function (event) {
        var keyCode = event.keyCode;
        var keys = [kendo_angular_common_2.Keys.ArrowUp, kendo_angular_common_2.Keys.ArrowDown, kendo_angular_common_2.Keys.ArrowLeft, kendo_angular_common_2.Keys.ArrowRight, kendo_angular_common_2.Keys.Enter,
            kendo_angular_common_2.Keys.Escape, kendo_angular_common_2.Keys.Delete, kendo_angular_common_2.Keys.Backspace, kendo_angular_common_2.Keys.Home, kendo_angular_common_2.Keys.End];
        if (keys.indexOf(keyCode) > -1) {
            this.onNavigate.emit(event);
        }
    };
    SearchBarComponent.prototype.focus = function () {
        if (kendo_angular_common_1.isDocumentAvailable()) {
            this.input.nativeElement.focus();
        }
    };
    SearchBarComponent.prototype.blur = function () {
        if (kendo_angular_common_1.isDocumentAvailable()) {
            this.input.nativeElement.blur();
        }
    };
    SearchBarComponent.prototype.setInputSize = function () {
        var lengthOf = function (x) { return x ? x.length : 0; };
        var input = this.input.nativeElement;
        var placeholderLength = lengthOf(this.placeholder);
        var textLength = lengthOf(this.value);
        var size = Math.max(placeholderLength, textLength, 1);
        this.renderer.setAttribute(input, 'size', size.toString());
    };
    SearchBarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-searchbar',
                    template: "\n        <input #input\n            autocomplete=\"off\"\n            [id]=\"id\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [placeholder]=\"placeholder\"\n            [class]=\"'k-input'\"\n            (input)=\"handleInput($event)\"\n            (keydown)=\"handleKeydown($event)\"\n            [kendoEventsOutsideAngular]=\"{\n                focus: handleFocus,\n                blur: handleBlur\n            }\"\n            [scope]=\"this\"\n            [attr.tabIndex]=\"tabIndex\"\n            [attr.dir]=\"direction\"\n            [attr.role]=\"role\"\n            [attr.aria-disabled]=\"disabled\"\n            [attr.aria-readonly]=\"readonly\"\n            aria-haspopup=\"listbox\"\n            [attr.aria-expanded]=\"popupOpen\"\n            [attr.aria-owns]=\"listId\"\n            [attr.aria-describedby]=\"tagListId\"\n            [attr.aria-activedescendant]=\"activeDescendant\"\n            [attr.aria-label]=\"noDataLabel\"\n        />\n   "
                },] },
    ];
    /** @nocollapse */
    SearchBarComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.Renderer2 }
    ]; };
    SearchBarComponent.propDecorators = {
        id: [{ type: core_1.Input }],
        listId: [{ type: core_1.Input }],
        tagListId: [{ type: core_1.Input }],
        activeDescendant: [{ type: core_1.Input }],
        noDataLabel: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        popupOpen: [{ type: core_1.Input }],
        role: [{ type: core_1.Input }],
        userInput: [{ type: core_1.Input }],
        suggestedText: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        onBlur: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output }],
        onClick: [{ type: core_1.Output }],
        onNavigate: [{ type: core_1.Output }],
        input: [{ type: core_1.ViewChild, args: ['input', { static: true },] }],
        searchBarClass: [{ type: core_1.HostBinding, args: ['class.k-searchbar',] }],
        placeholder: [{ type: core_1.Input }]
    };
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
