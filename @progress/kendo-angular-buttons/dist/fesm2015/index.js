/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent, merge } from 'rxjs';
import { Keys, guid, hasObservers, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';

/**
 * @hidden
 */
class KendoButtonService {
    constructor() {
        this.buttonLookChange = new BehaviorSubject('default');
        this.buttonClicked = new Subject();
        this.buttonClicked$ = this.buttonClicked.asObservable();
    }
    click(button) {
        this.buttonClicked.next(button);
    }
    setButtonLook(look) {
        this.buttonLookChange.next(look);
    }
}
KendoButtonService.decorators = [
    { type: Injectable },
];

const SPAN_TAG_NAME = 'SPAN';
/**
 * Represents the Kendo UI Button component for Angular.
 */
class ButtonDirective {
    constructor(element, renderer, service, localization, ngZone) {
        this.service = service;
        this.ngZone = ngZone;
        /**
         * Provides visual styling that indicates if the Button is active.
         * By default, `toggleable` is set to `false`.
         */
        this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary.
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([more information and examples]({% slug appearance_button %})).
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * @hidden
         */
        this.role = 'button';
        /**
         * Fires each time the selected state of a toggleable button is changed.
         *
         * The event argument is the new selected state (boolean).
         */
        this.selectedChange = new EventEmitter();
        this.isDisabled = false;
        this.isIcon = false;
        this.isIconClass = false;
        this._focused = false;
        this.domEvents = [];
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = localization.changes
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
        this.element = element.nativeElement;
        this.renderer = renderer;
    }
    /**
     * Backwards-compatible alias
     *
     * @hidden
     */
    get togglable() {
        return this.toggleable;
    }
    /**
     * @hidden
     */
    set togglable(value) {
        this.toggleable = value;
    }
    /**
     * Sets the selected state of the Button.
     */
    get selected() {
        return this._selected || false;
    }
    set selected(value) {
        this._selected = value;
    }
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    set icon(icon) {
        if (icon) {
            this.iconSetter(icon, () => {
                this.isIcon = true;
                const classes = 'k-icon k-i-' + icon;
                this.addIcon(classes);
            });
        }
        else {
            this.isIcon = false;
            this.updateIconNode();
        }
    }
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    set iconClass(iconClassName) {
        if (iconClassName) {
            this.iconSetter(iconClassName, () => {
                this.isIconClass = true;
                this.addIcon(iconClassName);
            });
        }
        else {
            this.isIconClass = false;
            this.updateIconNode();
        }
    }
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    set imageUrl(imageUrl) {
        if (imageUrl) {
            this.iconSetter(imageUrl, this.addImgIcon.bind(this));
        }
        else {
            this.removeImageNode();
        }
    }
    /**
     * If set to `true`, it disables the Button.
     */
    set disabled(disabled) {
        this.isDisabled = disabled;
        this.renderer.setProperty(this.element, 'disabled', disabled);
    }
    set isFocused(isFocused) {
        this.toggleClass('k-state-focused', isFocused);
        this._focused = isFocused;
    }
    get isFocused() {
        return this._focused;
    }
    get classButton() {
        return true;
    }
    get classDisabled() {
        return this.isDisabled;
    }
    get classPrimary() {
        return this.primary;
    }
    get isFlat() {
        return this.look === 'flat';
    }
    get isBare() {
        return this.look === 'bare';
    }
    get isOutline() {
        return this.look === 'outline';
    }
    get classActive() {
        return this.selected;
    }
    get getDirection() {
        return this.direction;
    }
    /**
     * @hidden
     */
    onFocus() {
        this.isFocused = true;
    }
    /**
     * @hidden
     */
    onBlur() {
        this.isFocused = false;
    }
    ngOnInit() {
        const isSpan = this.element.tagName === SPAN_TAG_NAME;
        if (this.service) {
            this.buttonLookChangeSubscription = this.service.buttonLookChange
                .pipe(filter((look) => look !== 'default'))
                .subscribe((look) => this.look = look);
        }
        if (!this.element.hasAttribute('role') && this.togglable) {
            this.toggleAriaCheckbox(this.toggleable);
        }
        if (this.role) {
            this.setAttribute('role', this.role);
        }
        this.ngZone.runOutsideAngular(() => {
            this.domEvents.push(this.renderer.listen(this.element, 'click', this._onButtonClick.bind(this)));
            this.domEvents.push(this.renderer.listen(this.element, 'keydown', (event) => {
                if (isSpan && (event.keyCode === Keys.Space || event.keyCode === Keys.Enter)) {
                    this._onButtonClick();
                }
            }));
        });
    }
    ngOnChanges(change) {
        if (isChanged('togglable', change) || isChanged('toggleable', change)) {
            this.toggleAriaCheckbox(this.toggleable);
        }
    }
    ngAfterViewChecked() {
        this.setIconTextClasses();
    }
    ngOnDestroy() {
        this.imageNode = null;
        this.iconNode = null;
        this.renderer = null;
        this.localizationChangeSubscription.unsubscribe();
        if (this.service && this.buttonLookChangeSubscription) {
            this.buttonLookChangeSubscription.unsubscribe();
        }
        clearTimeout(this.deferTimeout);
        this.domEvents.forEach(unbindHandler => unbindHandler());
    }
    /**
     * Focuses the Button component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.element.focus();
            this.isFocused = true;
        }
    }
    /**
     * Blurs the Button component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.element.blur();
            this.isFocused = false;
        }
    }
    /**
     * @hidden
     */
    setAttribute(attribute, value) {
        this.renderer.setAttribute(this.element, attribute, value);
    }
    /**
     * @hidden
     */
    removeAttribute(attribute) {
        this.renderer.removeAttribute(this.element, attribute);
    }
    /**
     * @hidden
     *
     * Internal setter that triggers selectedChange
     */
    setSelected(value) {
        const changed = this.selected !== value;
        this.selected = value;
        this.setAttribute('aria-checked', this.selected.toString());
        this.toggleClass('k-state-active', this.selected);
        if (changed && hasObservers(this.selectedChange)) {
            this.ngZone.run(() => {
                this.selectedChange.emit(value);
            });
        }
    }
    toggleAriaCheckbox(shouldSet) {
        if (!isDocumentAvailable()) {
            return;
        }
        if (shouldSet) {
            this.role = 'checkbox';
            this.setAttribute('role', this.role);
            this.setAttribute('aria-checked', this.selected.toString());
        }
        else {
            this.role = 'button';
            this.setAttribute('role', this.role);
            this.removeAttribute('aria-checked');
        }
    }
    hasText() {
        if (isDocumentAvailable()) {
            return String(this.element.textContent).trim().length > 0;
        }
        else {
            return false;
        }
    }
    addImgIcon(imageUrl) {
        let renderer = this.renderer;
        if (this.imageNode) {
            renderer.setProperty(this.imageNode, 'src', imageUrl);
        }
        else if (isDocumentAvailable()) {
            this.imageNode = renderer.createElement('img');
            renderer.setProperty(this.imageNode, 'src', imageUrl);
            renderer.setProperty(this.imageNode, 'className', 'k-image');
            renderer.setAttribute(this.imageNode, 'role', 'presentation');
            this.prependChild(this.imageNode);
        }
    }
    addIcon(classNames) {
        let renderer = this.renderer;
        if (this.iconNode) {
            renderer.setProperty(this.iconNode, 'className', classNames);
        }
        else if (isDocumentAvailable()) {
            this.iconNode = renderer.createElement('span');
            renderer.setProperty(this.iconNode, 'className', classNames);
            renderer.setAttribute(this.iconNode, 'role', 'presentation');
            this.prependChild(this.iconNode);
        }
    }
    prependChild(node) {
        this.defer(() => {
            if (this.renderer && node !== this.element.firstChild) {
                this.renderer.insertBefore(this.element, node, this.element.firstChild);
            }
        });
    }
    defer(callback) {
        this.ngZone.runOutsideAngular(() => {
            this.deferTimeout = setTimeout(callback, 0);
        });
    }
    iconSetter(icon, insertIcon) {
        if (icon) {
            insertIcon(icon);
        }
        this.setIconTextClasses();
    }
    removeImageNode() {
        if (this.imageNode && this.renderer.parentNode(this.imageNode)) {
            this.renderer.removeChild(this.element, this.imageNode);
            this.imageNode = null;
        }
    }
    removeIconNode() {
        if (this.iconNode && this.renderer.parentNode(this.iconNode)) {
            this.renderer.removeChild(this.element, this.iconNode);
            this.iconNode = null;
        }
    }
    updateIconNode() {
        if (!this.isIcon && !this.isIconClass) {
            this.removeIconNode();
        }
    }
    setIconTextClasses() {
        const hasIcon = this.isIcon || this.isIconClass || this.imageNode;
        const hasText = this.hasText();
        this.toggleClass('k-button-icon', hasIcon && !hasText);
        this.toggleClass('k-button-icontext', hasIcon && hasText);
    }
    toggleClass(className, add) {
        if (add) {
            this.renderer.addClass(this.element, className);
        }
        else {
            this.renderer.removeClass(this.element, className);
        }
    }
    _onButtonClick() {
        if (!this.disabled && this.service) {
            this.ngZone.run(() => {
                this.service.click(this);
            });
        }
        if (this.togglable && !this.service) {
            this.setSelected(!this.selected);
        }
    }
}
ButtonDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoButton',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.button'
                    }
                ],
                selector: 'button[kendoButton], span[kendoButton]' // tslint:disable-line
            },] },
];
/** @nocollapse */
ButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: KendoButtonService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
ButtonDirective.propDecorators = {
    toggleable: [{ type: Input }],
    togglable: [{ type: Input }],
    primary: [{ type: Input }],
    look: [{ type: Input }],
    selected: [{ type: Input }],
    tabIndex: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    role: [{ type: Input }],
    selectedChange: [{ type: Output }],
    classButton: [{ type: HostBinding, args: ['class.k-button',] }],
    classDisabled: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    classPrimary: [{ type: HostBinding, args: ['class.k-primary',] }],
    isFlat: [{ type: HostBinding, args: ['class.k-flat',] }],
    isBare: [{ type: HostBinding, args: ['class.k-bare',] }],
    isOutline: [{ type: HostBinding, args: ['class.k-outline',] }],
    classActive: [{ type: HostBinding, args: ['attr.ariaPressed',] }, { type: HostBinding, args: ['class.k-state-active',] }],
    getDirection: [{ type: HostBinding, args: ['attr.dir',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }]
};

/* tslint:disable:no-null-keyword */
/* tslint:disable:no-bitwise */
const resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
const tick = (f) => (resolvedPromise.then(f));

/**
 * @hidden
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * @hidden
 */
const ariaChecked = 'aria-checked';
/**
 * @hidden
 */
const tabindex = 'tabindex';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
class ButtonGroupComponent {
    constructor(service, localization, element) {
        this.service = service;
        this.element = element;
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options
         * ([more information and examples]({% slug styling_buttongroup %})).
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Fires every time keyboard navigation occurs.
         */
        this.navigate = new EventEmitter();
        this._tabIndex = 0;
        this.currentTabIndex = 0;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
    }
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    set tabIndex(value) {
        this._tabIndex = value;
        this.currentTabIndex = value;
    }
    get tabIndex() {
        return this._tabIndex;
    }
    get wrapperClass() {
        return true;
    }
    get disabledClass() {
        return this.disabled;
    }
    get stretchedClass() {
        return !!this.width;
    }
    get isFlat() {
        return this.look === 'flat';
    }
    get isBare() {
        return this.look === 'bare';
    }
    get isOutline() {
        return this.look === 'outline';
    }
    get getRole() {
        return this.isSelectionSingle() ? 'radiogroup' : 'group';
    }
    get dir() {
        return this.direction;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get wrapperWidth() {
        return this.width;
    }
    get wrapperTabIndex() {
        return this.disabled ? undefined : this.currentTabIndex;
    }
    /**
     * @hidden
     */
    keydown(event) {
        if (!this.disabled) {
            this.navigateFocus(event);
        }
    }
    /**
     * @hidden
     */
    onFocus() {
        this.currentTabIndex = -1;
        const focusedIndex = this.buttons.toArray().findIndex(current => current.element.tabIndex !== -1);
        const index = focusedIndex === -1 ? 0 : focusedIndex;
        this.focus(this.buttons.filter((_current, i) => {
            return i === index;
        }));
    }
    /**
     * @hidden
     */
    focusout(event) {
        if (event.relatedTarget && event.relatedTarget.parentNode !== this.element.nativeElement) {
            this.defocus(this.buttons.toArray());
            this.currentTabIndex = this.tabIndex;
        }
    }
    ngOnInit() {
        this.service.setButtonLook(this.look);
        this.subscription = this.service.buttonClicked$.subscribe((button) => {
            let newSelectionValue;
            if (this.isSelectionSingle()) {
                newSelectionValue = true;
                this.deactivate(this.buttons.filter(current => current !== button));
            }
            else {
                this.defocus(this.buttons.toArray());
                newSelectionValue = !button.selected;
            }
            if (button.togglable) {
                button.setSelected(newSelectionValue);
                button.setAttribute(ariaChecked, newSelectionValue.toString());
            }
            button.setAttribute(tabindex, "0");
        });
    }
    ngOnChanges(change) {
        if (isChanged('disabled', change)) {
            this.buttons.forEach((button) => {
                if (isPresent(this.disabled)) {
                    button.disabled = this.disabled;
                }
            });
        }
    }
    ngAfterContentInit() {
        const isRadioGroup = this.isSelectionSingle();
        const buttonsRole = isRadioGroup ? 'radio' : 'checkbox';
        this.buttons.forEach((button) => {
            if (button.togglable) {
                button.setAttribute(ariaChecked, button.selected.toString());
                button.setAttribute('role', buttonsRole);
            }
            if (button.selected) {
                button.setAttribute(tabindex, "0");
            }
            else {
                button.setAttribute(tabindex, "-1");
            }
        });
    }
    ngAfterViewChecked() {
        if (this.buttons.length) {
            this.buttons.first.renderer.addClass(this.buttons.first.element, 'k-group-start');
            this.buttons.last.renderer.addClass(this.buttons.last.element, 'k-group-end');
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.localizationChangeSubscription.unsubscribe();
    }
    ngAfterContentChecked() {
        this.verifySettings();
    }
    navigateFocus(event) {
        let focusedIndex = this.buttons.toArray().findIndex(current => current.element.tabIndex !== -1);
        const firstIndex = 0;
        const lastIndex = this.buttons.length - 1;
        const eventArgs = new PreventableEvent();
        if (event.keyCode === Keys.ArrowRight && focusedIndex < lastIndex) {
            this.navigate.emit(eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                this.defocus(this.buttons.toArray());
                this.focus(this.buttons.filter((_current, index) => {
                    return index === focusedIndex + 1;
                }));
            }
        }
        if (event.keyCode === Keys.ArrowLeft && focusedIndex > firstIndex) {
            this.navigate.emit(eventArgs);
            if (!eventArgs.isDefaultPrevented()) {
                this.defocus(this.buttons.toArray());
                this.focus(this.buttons.filter((_current, index) => {
                    return index === focusedIndex - 1;
                }));
            }
        }
    }
    deactivate(buttons) {
        buttons.forEach((button) => {
            button.setSelected(false);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "-1");
        });
    }
    activate(buttons) {
        buttons.forEach((button) => {
            button.setSelected(true);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    }
    defocus(buttons) {
        buttons.forEach((button) => {
            button.setAttribute(tabindex, "-1");
        });
    }
    focus(buttons) {
        buttons.forEach((button) => {
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    }
    verifySettings() {
        if (isDevMode()) {
            if (this.isSelectionSingle() && this.buttons.filter(button => button.selected).length > 1) {
                throw new Error('Having multiple selected buttons with single selection mode is not supported');
            }
        }
    }
    isSelectionSingle() {
        return this.selection === 'single';
    }
}
ButtonGroupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoButtonGroup',
                providers: [
                    KendoButtonService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.buttongroup'
                    }
                ],
                selector: 'kendo-buttongroup',
                template: `
        <ng-content select="[kendoButton]"></ng-content>
    `
            },] },
];
/** @nocollapse */
ButtonGroupComponent.ctorParameters = () => [
    { type: KendoButtonService },
    { type: LocalizationService },
    { type: ElementRef }
];
ButtonGroupComponent.propDecorators = {
    disabled: [{ type: Input, args: ['disabled',] }],
    selection: [{ type: Input, args: ['selection',] }],
    width: [{ type: Input, args: ['width',] }],
    look: [{ type: Input }],
    tabIndex: [{ type: Input }],
    navigate: [{ type: Output }],
    buttons: [{ type: ContentChildren, args: [ButtonDirective,] }],
    wrapperClass: [{ type: HostBinding, args: ['class.k-button-group',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    stretchedClass: [{ type: HostBinding, args: ['class.k-button-group-stretched',] }],
    isFlat: [{ type: HostBinding, args: ['class.k-button-group-flat',] }],
    isBare: [{ type: HostBinding, args: ['class.k-button-group-bare',] }],
    isOutline: [{ type: HostBinding, args: ['class.k-button-group-outline',] }],
    getRole: [{ type: HostBinding, args: ['attr.role',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disalbed',] }],
    wrapperWidth: [{ type: HostBinding, args: ['style.width',] }],
    wrapperTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    focusout: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmodules'] }})
 * definition for the Button directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonModule } from '@progress/kendo-angular-buttons';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ButtonModule], // import Button module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class ButtonModule {
}
ButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ButtonDirective],
                exports: [ButtonDirective]
            },] },
];

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ButtonGroupComponent`&mdash;The ButtonGroupComponent component class.
 */
class ButtonGroupModule {
}
ButtonGroupModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ButtonGroupComponent],
                exports: [ButtonGroupComponent],
                imports: [CommonModule, ButtonModule]
            },] },
];

/* tslint:disable:directive-selector-name */
/**
 * Used for rendering the list item content.
 *
 * To define the item template, nest a `<ng-template>` tag with the `kendo<ComponentName>ItemTemplate` directive inside the component tag.
 *
 * For the DropDownButton, use the `kendoDropDownButtonItemTemplate` directive.
 * For the SplitButton, use the `kendoSplitButtonItemTemplate` directive.
 *
 * The template context is set to the current component. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="listItems">
 *    <ng-template kendoSplitButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-splitbutton>
 *  <kendo-dropdownbutton [data]="listItems">
 *    <ng-template kendoDropDownButtonItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </ng-template>
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<any> = [{
 *      text: 'item1',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item2',
 *      icon: 'refresh',
 *      disabled: false,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }]
 * }
 * ```
 *
 * For more examples, refer to the article on the [DropDownList templates]({% slug overview_ddl %}#templates).
 */
class ButtonItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ButtonItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropDownButtonItemTemplate],[kendoSplitButtonItemTemplate]'
            },] },
];
/** @nocollapse */
ButtonItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @hidden
 */
class ListComponent {
    constructor() {
        this.onItemClick = new EventEmitter();
        this.onItemBlur = new EventEmitter();
    }
    getText(dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    }
    getIconClasses(dataItem) {
        const icon = dataItem.icon ? 'k-icon k-i-' + dataItem.icon : undefined;
        const classes = {};
        classes[icon || dataItem.iconClass] = true;
        return classes;
    }
    onClick(index) {
        this.onItemClick.emit(index);
    }
    onBlur() {
        this.onItemBlur.emit();
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-button-list',
                template: `
        <ul class="k-list k-reset" unselectable="on">
            <li role="menuItem" unselectable="on" tabindex="-1"
                kendoButtonFocusable
                *ngFor="let dataItem of data; let index = index;"
                [index]="index"
                [ngClass]="{'k-item': true, 'k-state-disabled': dataItem.disabled}"
                (click)="onClick(index)"
                (blur)="onBlur()"
                [attr.aria-disabled]="dataItem.disabled ? true : false">
                <ng-template *ngIf="itemTemplate?.templateRef"
                    [templateContext]="{
                        templateRef: itemTemplate?.templateRef,
                        $implicit: dataItem
                    }">
                </ng-template>
                <ng-template [ngIf]="!itemTemplate?.templateRef">
                    <span
                        *ngIf="dataItem.icon || dataItem.iconClass"
                        [ngClass]="getIconClasses(dataItem)"
                    ></span>
                    <img
                        *ngIf="dataItem.imageUrl"
                        class="k-image"
                        [src]="dataItem.imageUrl"
                        alt=""
                    >
                    {{ getText(dataItem) }}
                </ng-template>
            </li>
        </ul>
      `
            },] },
];
ListComponent.propDecorators = {
    data: [{ type: Input }],
    textField: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    onItemClick: [{ type: Output }],
    onItemBlur: [{ type: Output }]
};

/**
 * @hidden
 */
class FocusService {
    constructor() {
        this.onFocus = new EventEmitter();
    }
    isFocused(index) {
        return index === this.focused;
    }
    focus(index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    }
    resetFocus() {
        this.focused = -1;
    }
    get focused() {
        return this.focusedIndex;
    }
    set focused(index) {
        this.focusedIndex = index;
        this.onFocus.emit(index);
    }
}
FocusService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class FocusableDirective {
    constructor(focusService, elementRef) {
        this.focusService = focusService;
        this.element = elementRef.nativeElement;
        this.subscribeEvents();
    }
    get focusedClassName() {
        return this.focusService.isFocused(this.index);
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.unsubscribeEvents();
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe((index) => {
            if (this.index === index) {
                this.element.focus();
            }
        });
    }
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoButtonFocusable]'
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: FocusService },
    { type: ElementRef }
];
FocusableDirective.propDecorators = {
    index: [{ type: Input }],
    focusedClassName: [{ type: HostBinding, args: ['class.k-state-focused',] }]
};

/**
 * @hidden
 */
class TemplateContextDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    set templateContext(context) {
        if (this.insertedViewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
            this.insertedViewRef = undefined;
        }
        if (context.templateRef) {
            this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
        }
    }
}
TemplateContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[templateContext]' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TemplateContextDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TemplateContextDirective.propDecorators = {
    templateContext: [{ type: Input }]
};

const EXPORTED_DIRECTIVES = [
    ListComponent,
    FocusableDirective,
    ButtonItemTemplateDirective,
    TemplateContextDirective
];
/**
 * @hidden
 */
class ListModule {
}
ListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [EXPORTED_DIRECTIVES],
                exports: [EXPORTED_DIRECTIVES],
                imports: [CommonModule]
            },] },
];

/**
 * @hidden
 */
var KeyEvents;
(function (KeyEvents) {
    KeyEvents[KeyEvents["keydown"] = 0] = "keydown";
    KeyEvents[KeyEvents["keypress"] = 1] = "keypress";
    KeyEvents[KeyEvents["keyup"] = 2] = "keyup";
})(KeyEvents || (KeyEvents = {}));

/**
 * @hidden
 */
var NavigationAction;
(function (NavigationAction) {
    NavigationAction[NavigationAction["Undefined"] = 0] = "Undefined";
    NavigationAction[NavigationAction["Open"] = 1] = "Open";
    NavigationAction[NavigationAction["Close"] = 2] = "Close";
    NavigationAction[NavigationAction["Enter"] = 3] = "Enter";
    NavigationAction[NavigationAction["EnterPress"] = 4] = "EnterPress";
    NavigationAction[NavigationAction["EnterUp"] = 5] = "EnterUp";
    NavigationAction[NavigationAction["Tab"] = 6] = "Tab";
    NavigationAction[NavigationAction["Esc"] = 7] = "Esc";
    NavigationAction[NavigationAction["Navigate"] = 8] = "Navigate";
})(NavigationAction || (NavigationAction = {}));

/* tslint:disable:deprecation */
/**
 * @hidden
 */
class ListButton {
    constructor(focusService, navigationService, wrapperRef, _zone, localization) {
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapperRef = wrapperRef;
        this._zone = _zone;
        this._open = false;
        this._disabled = false;
        this._active = false;
        this._popupSettings = { animate: true, popupClass: '' };
        this.listId = guid();
        this._isFocused = false;
        this.wrapperBlurred = new EventEmitter();
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapper = wrapperRef.nativeElement;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
        this.subscribeEvents();
    }
    get popupClasses() {
        var popupClasses = [
            'k-list-container',
            'k-reset',
            'k-group'
        ];
        if (this._popupSettings.popupClass) {
            popupClasses.push(this._popupSettings.popupClass);
        }
        return popupClasses.join(' ');
    }
    get openState() {
        return this._open;
    }
    set openState(open) {
        this._open = open;
    }
    /**
     * @hidden
     */
    togglePopupVisibility() {
        if (this._disabled) {
            return;
        }
        this.openState = !this.openState;
        if (!this.openState) {
            this.focusService.focus(-1);
        }
    }
    /**
     * @hidden
     */
    onItemClick(index) {
        this.emitItemClickHandler(index);
        setTimeout(() => { this.focusWrapper(); }, 1);
    }
    ngOnDestroy() {
        this.openState = false;
        this.unsubscribeEvents();
        clearTimeout(this.focusFirstTimeout);
        clearTimeout(this.blurTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.subscribeListItemFocusEvent();
        this.subscribeComponentBlurredEvent();
        this.subscribeNavigationEvents();
    }
    subscribeListItemFocusEvent() {
        this.focusSubscription = this.focusService.onFocus.subscribe(() => {
            this._isFocused = true;
        });
    }
    subscribeComponentBlurredEvent() {
        this._zone.runOutsideAngular(() => {
            this.documentClick = fromEvent(document, 'click').pipe(filter((event) => {
                return !this.wrapperContains(event.target);
            }));
            this.tabSubscription = this.navigationService.tab.pipe(filter(() => this._isFocused)).subscribe(this.handleTab.bind(this));
            this.componentBlurredSubscription = merge(this.documentClick, this.wrapperBlurred).pipe(filter(() => this._isFocused)).subscribe(() => this._zone.run(() => this.blurWrapper()));
        });
    }
    subscribeNavigationEvents() {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.focusService.focus.bind(this.focusService));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(() => {
            if (!this._disabled && !this._open) {
                this._active = true;
            }
        });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(() => {
            if (!this._open) {
                this._active = false;
            }
            this.enterHandler();
            this.focusWrapper();
        });
        this.openSubscription = this.navigationService.open.subscribe(() => {
            if (!this._open) {
                this.togglePopupVisibility();
                this.focusFirstItem();
            }
            else {
                this.focusWrapper();
            }
        });
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(() => this.focusWrapper());
    }
    enterHandler() { } // tslint:disable-line
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.unsubscribe(this.componentBlurredSubscription);
        this.unsubscribe(this.focusSubscription);
        this.unsubscribe(this.navigationSubscription);
        this.unsubscribe(this.enterPressSubscription);
        this.unsubscribe(this.enterUpSubscription);
        this.unsubscribe(this.openSubscription);
        this.unsubscribe(this.closeSubscription);
        this.unsubscribe(this.tabSubscription);
    }
    unsubscribe(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    keyDownHandler(event) {
        this.keyHandler(event);
    }
    /**
     * @hidden
     */
    keyPressHandler(event) {
        this.keyHandler(event, KeyEvents.keypress);
    }
    /**
     * @hidden
     */
    keyUpHandler(event) {
        this.keyHandler(event, KeyEvents.keyup);
    }
    /**
     * @hidden
     */
    keyHandler(event, keyEvent) {
        if (this._disabled) {
            return;
        }
        let focused = this.focusService.focused || 0;
        const eventData = event;
        const action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            keyEvent: keyEvent,
            max: this._data ? this._data.length - 1 : 0,
            min: 0
        });
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Tab &&
            (action !== NavigationAction.Enter || (action === NavigationAction.Enter && this._open))) {
            eventData.preventDefault();
        }
    }
    emitItemClickHandler(index) {
        const dataItem = this._data[index];
        if (this._itemClick) {
            this._itemClick.emit(dataItem);
        }
        if (dataItem && dataItem.click && !dataItem.disabled) {
            dataItem.click(dataItem);
        }
    }
    focusFirstItem() {
        if (this._data && isPresent(this._data[0])) {
            this.focusFirstTimeout = setTimeout(() => { this.focusService.focus(0); }, 1);
        }
    }
    focusWrapper() {
        if (this._open) {
            this.togglePopupVisibility();
            this.focusButton();
        }
    }
    /**
     * @hidden
     */
    blurHandler() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.blurTimeout = setTimeout(() => {
            if (!this.wrapperContains(document.activeElement)) {
                this.blurWrapper();
            }
        });
    }
    wrapperContains(element) {
        return this.wrapper === element || this.wrapper.contains(element);
    }
    blurWrapper() {
        if (this._open) {
            this.togglePopupVisibility();
        }
        this._isFocused = false;
        this._blur.emit();
    }
    focusButton() {
        if (this.button) {
            this.button.nativeElement.focus();
        }
    }
    handleTab() {
        this.focusButton();
        this.blurWrapper();
    }
}

/**
 * @hidden
 */
const NAVIGATION_CONFIG = new InjectionToken('navigation.config');

/**
 * @hidden
 */
class NavigationService {
    constructor(config) {
        this.navigate = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.enter = new EventEmitter();
        this.enterpress = new EventEmitter();
        this.enterup = new EventEmitter();
        this.tab = new EventEmitter();
        this.esc = new EventEmitter();
        this.useLeftRightArrows = config.useLeftRightArrows;
    }
    process(args) {
        const keyCode = args.keyCode;
        const keyEvent = args.keyEvent;
        let index;
        let action = NavigationAction.Undefined;
        if (keyEvent === KeyEvents.keypress) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterPress;
            }
        }
        else if (keyEvent === KeyEvents.keyup) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterUp;
            }
        }
        else {
            if (args.altKey && keyCode === Keys.ArrowDown) {
                action = NavigationAction.Open;
            }
            else if (args.altKey && keyCode === Keys.ArrowUp) {
                action = NavigationAction.Close;
            }
            else if (this.isEnter(keyCode)) {
                action = NavigationAction.Enter;
            }
            else if (keyCode === Keys.Escape) {
                action = NavigationAction.Esc;
            }
            else if (keyCode === Keys.Tab) {
                action = NavigationAction.Tab;
            }
            else if (keyCode === Keys.ArrowUp || (this.useLeftRightArrows && keyCode === Keys.ArrowLeft)) {
                index = this.next({
                    current: args.current,
                    start: args.max,
                    end: args.min,
                    step: -1
                });
                action = NavigationAction.Navigate;
            }
            else if (keyCode === Keys.ArrowDown || (this.useLeftRightArrows && keyCode === Keys.ArrowRight)) {
                index = this.next({
                    current: args.current,
                    start: args.min,
                    end: args.max,
                    step: 1
                });
                action = NavigationAction.Navigate;
            }
        }
        if (action !== NavigationAction.Undefined) {
            this[NavigationAction[action].toLowerCase()].emit(index);
        }
        return action;
    }
    isEnter(keyCode) {
        return keyCode === Keys.Enter || keyCode === Keys.Space;
    }
    next(args) {
        if (!isPresent(args.current)) {
            return args.start;
        }
        else {
            return args.current !== args.end ? args.current + args.step : args.end;
        }
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NAVIGATION_CONFIG,] }] }
];

/* tslint:disable:no-access-missing-member */
const NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
const ɵ0 = NAVIGATION_SETTINGS;
const NAVIGATION_SETTINGS_PROVIDER = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0
};
/**
 * Represents the Kendo UI SplitButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="data" [icon]="'paste'"
 *      (itemClick)="onSplitButtonItemClick($event)"
 *      (buttonClick)="onSplitButtonClick()">Paste</kendo-splitbutton>
 * `
 * })
 *
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'Keep Text Only',
 *       icon: 'paste-plain-text',
 *       click: () => { console.log('Keep Text Only click handler'); }
 *   }, {
 *       text: 'Paste as HTML',
 *       icon: 'paste-as-html'
 *   }, {
 *       text: 'Paste Markdown',
 *       icon: 'paste-markdown'
 *   }, {
 *       text: 'Set Default Paste'
 *   }];
 *
 *   public onSplitButtonClick(dataItem: any): void {
 *       console.log('Paste');
 *   }
 *
 *   public onSplitButtonItemClick(dataItem: any): void {
 *       if (dataItem) {
 *           console.log(dataItem.text);
 *       }
 *   }
 * }
 * ```
 */
class SplitButtonComponent extends ListButton {
    constructor(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        super(focusService, navigationService, wrapperRef, zone, localization);
        this.popupService = popupService;
        this.elRef = elRef;
        /**
         * Sets the text of the SplitButton.
         */
        this.text = '';
        /**
         * Defines an icon to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.icon = '';
        /**
         * Defines an icon with a custom CSS class to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.iconClass = '';
        /**
         * Defines the location of an image to be displayed next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.imageUrl = '';
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons) that will
         * be rendered for the button which opens the popup.
         */
        this.arrowButtonIcon = 'arrow-s';
        /**
         * Fires each time the user clicks the main button.
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (buttonClick)="onSplitButtonClick()" [data]="data">
         *            Reply
         *        </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *    public onSplitButtonClick(): void {
         *      console.log('SplitButton click');
         *    }
         * }
         * ```
         *
         */
        this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks on the drop-down list. The event data contains the data item bound to the clicked list item.
         *
         * @example
         * ```ts
         * _@Component({
         *     selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (itemClick)="onSplitButtonItemClick($event)" [data]="data">
         *          Reply
         *      </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *   public onSplitButtonItemClick(dataItem?: string): void {
         *        if (dataItem) {
         *            console.log(dataItem);
         *       }
         *    }
         * }
         * ```
         *
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires each time the SplitButton gets focused.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the SplitButton gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        this.close = new EventEmitter();
        this.listId = guid();
        this.buttonText = '';
        this._itemClick = this.itemClick;
        this._blur = this.onBlur;
    }
    /**
     * When set to `true`, disables a SplitButton item
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    set disabled(value) {
        this._disabled = value;
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Sets the data of the SplitButton.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        if (!this._data) {
            this.data = [];
        }
        return this._data;
    }
    /**
     * @hidden
     */
    set openState(open) {
        if (this.disabled) {
            return;
        }
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        if (eventArgs.isDefaultPrevented()) {
            return;
        }
        this._toggle(open);
    }
    /**
     * @hidden
     */
    get openState() {
        return this._open;
    }
    /**
     * @hidden
     */
    get active() {
        return this._active;
    }
    /**
     * @hidden
     */
    get componentTabIndex() {
        return this.disabled ? (-1) : this.tabIndex;
    }
    set isFocused(value) {
        this._isFocused = value;
    }
    get isFocused() {
        return this._isFocused && !this._disabled;
    }
    get widgetClasses() {
        return true;
    }
    get dir() {
        return this.direction;
    }
    /**
     * @hidden
     */
    get ariaLabel() {
        return `${this.buttonText} splitbutton`;
    }
    /**
     * @hidden
     */
    onButtonFocus() {
        if (!this.isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    }
    /**
     * @hidden
     */
    onButtonClick() {
        this.buttonClick.emit();
    }
    /**
     * @hidden
     */
    keydown(event) {
        this.keyDownHandler(event);
    }
    /**
     * @hidden
     */
    keypress(event) {
        this.keyPressHandler(event);
    }
    /**
     * @hidden
     */
    keyup(event) {
        this.keyUpHandler(event);
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        this.updateButtonText();
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('text')) {
            this.updateButtonText();
        }
    }
    /**
     * @hidden
     */
    togglePopupVisibility() {
        super.togglePopupVisibility();
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    /**
     * @hidden
     */
    wrapperContains(element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    }
    /**
     * @hidden
     */
    get anchorAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * @hidden
     */
    get popupAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * Focuses the SplitButton component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    /**
     * Blurs the SplitButton component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroyPopup();
    }
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        if (this.disabled) {
            return;
        }
        tick(() => (this._toggle((open === undefined) ? !this._open : open)));
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.openState;
    }
    enterHandler() {
        if (this.disabled) {
            return;
        }
        if (this.openState) {
            let focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        else {
            this.buttonClick.emit();
        }
    }
    updateButtonText() {
        if (isDocumentAvailable()) {
            let innerText = this.wrapper.innerText.split('\n').join('').trim();
            //setTimout is needed because of `Expression has changed after it was checked.` error;
            setTimeout(() => { this.buttonText = innerText; }, 0);
        }
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.containerRef : appendTo;
    }
    _toggle(open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    createPopup() {
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.openState = false);
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
}
SplitButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSplitButton',
                providers: [
                    FocusService,
                    NavigationService,
                    NAVIGATION_SETTINGS_PROVIDER,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.splitbutton'
                    }
                ],
                selector: 'kendo-splitbutton',
                template: `
        <button kendoButton
            #button
            role="listbox"
            type="button"
            [look]="look"
            [tabindex]="componentTabIndex"
            [disabled]="disabled"
            [icon]="icon"
            [class.k-state-active]="active"
            [iconClass]="iconClass"
            [imageUrl]="imageUrl"
            [ngClass]="buttonClass"
            (focus)="onButtonFocus()"
            (click)="onButtonClick()"
            [attr.aria-disabled]="disabled"
            [attr.aria-expanded]="openState"
            [attr.aria-haspopup]="true"
            [attr.aria-owns]="listId"
            [attr.aria-label]="ariaLabel"
            >
            {{text}}<ng-content></ng-content>
        </button>
        <button kendoButton
            type="button"
            [disabled]="disabled"
            [icon]="arrowButtonIcon"
            [look]="look"
            [tabindex]="-1"
            [ngClass]="arrowButtonClass"
            (click)="togglePopupVisibility()">
        </button>
        <ng-template #popupTemplate>
            <kendo-button-list
                [id]="listId"
                [data]="data"
                [textField]="textField"
                [itemTemplate]="itemTemplate"
                (onItemBlur)="blurHandler()"
                (onItemClick)="onItemClick($event)"
                (keydown)="keyDownHandler($event)"
                (keypress)="keyPressHandler($event)"
                (keyup)="keyUpHandler($event)"
            >
            </kendo-button-list>
        </ng-template>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
SplitButtonComponent.ctorParameters = () => [
    { type: FocusService },
    { type: NavigationService },
    { type: ElementRef },
    { type: NgZone },
    { type: PopupService },
    { type: ElementRef },
    { type: LocalizationService }
];
SplitButtonComponent.propDecorators = {
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    look: [{ type: Input }],
    disabled: [{ type: Input }],
    popupSettings: [{ type: Input }],
    tabIndex: [{ type: Input }],
    textField: [{ type: Input }],
    data: [{ type: Input }],
    buttonClass: [{ type: Input }],
    arrowButtonClass: [{ type: Input }],
    arrowButtonIcon: [{ type: Input }],
    buttonClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
    button: [{ type: ViewChild, args: ['button',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    containerRef: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    isFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-split-button',] }, { type: HostBinding, args: ['class.k-button-group',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
    keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }]
};

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `SplitButtonComponent`&mdash;The SplitButtonComponent component class.
 */
class SplitButtonModule {
}
SplitButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SplitButtonComponent],
                exports: [SplitButtonComponent, ListModule],
                imports: [CommonModule, PopupModule, ButtonModule, ListModule]
            },] },
];

/* tslint:disable:no-access-missing-member */
const NAVIGATION_SETTINGS$1 = {
    useLeftRightArrows: true
};
const ɵ0$1 = NAVIGATION_SETTINGS$1;
const NAVIGATION_SETTINGS_PROVIDER$1 = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0$1
};
/**
 * Represents the Kendo UI DropDownButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownbutton [data]="data">
 *    User Settings
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'My Profile'
 *   }, {
 *       text: 'Friend Requests'
 *   }, {
 *       text: 'Account Settings'
 *   }, {
 *       text: 'Support'
 *   }, {
 *       text: 'Log Out'
 *   }];
 * }
 * ```
 */
class DropDownButtonComponent extends ListButton {
    constructor(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        super(focusService, navigationService, wrapperRef, zone, localization);
        this.popupService = popupService;
        this.elRef = elRef;
        /**
         * Defines the name of an existing icon in a Kendo UI theme.
         */
        this.icon = '';
        /**
         * Defines the list of CSS classes which are used for styling the Button with custom icons.
         */
        this.iconClass = '';
        /**
         * Defines a URL for styling the button with a custom image.
         */
        this.imageUrl = '';
        /**
         * Adds visual weight to the default button and makes it primary.
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the DropDownButton gets focused.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the DropDownButton gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        this.listId = guid();
        this._itemClick = this.itemClick;
        this._blur = this.onBlur;
    }
    /**
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Sets the disabled state of the DropDownButton.
     */
    set disabled(value) {
        if (value && this.openState) {
            this.openState = false;
        }
        this._disabled = value;
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Sets or gets the data of the DropDownButton.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        return this._data;
    }
    /**
     * @hidden
     */
    set openState(open) {
        if (this.disabled) {
            return;
        }
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        if (eventArgs.isDefaultPrevented()) {
            return;
        }
        this._toggle(open);
    }
    /**
     * @hidden
     */
    get openState() {
        return this._open;
    }
    /**
     * @hidden
     */
    get componentTabIndex() {
        return this.disabled ? (-1) : this.tabIndex;
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    get focused() {
        return this._isFocused && !this._disabled;
    }
    get widgetClasses() {
        return true;
    }
    get dir() {
        return this.direction;
    }
    /**
     * @hidden
     */
    get active() {
        return this._active;
    }
    /**
     * @hidden
     */
    keydown(event) {
        this.keyDownHandler(event);
    }
    /**
     * @hidden
     */
    keypress(event) {
        this.keyPressHandler(event);
    }
    /**
     * @hidden
     */
    keyup(event) {
        this.keyUpHandler(event);
    }
    /**
     * @hidden
     */
    mousedown(event) {
        if (this._disabled) {
            event.preventDefault();
        }
    }
    /**
     * @hidden
     */
    openPopup() {
        this.togglePopupVisibility();
    }
    /**
     * @hidden
     */
    get anchorAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * @hidden
     */
    get popupAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * Focuses the DropDownButton component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    /**
     * Blurs the DropDownButton component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroyPopup();
    }
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        if (this.disabled) {
            return;
        }
        tick(() => (this._toggle((open === undefined) ? !this._open : open)));
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.openState;
    }
    /**
     * @hidden
     */
    handleFocus() {
        if (!this._disabled && !this._isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    }
    /**
     * @hidden
     */
    wrapperContains(element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    }
    subscribeNavigationEvents() {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.onArrowKeyNavigate.bind(this));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(this.onNavigationEnterPress.bind(this));
        this.enterUpSubscription = this.navigationService.enterup.subscribe(this.onNavigationEnterUp.bind(this));
        this.openSubscription = this.navigationService.open.subscribe(this.onNavigationOpen.bind(this));
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(this.onNavigationClose.bind(this));
    }
    onNavigationEnterPress() {
        if (!this._disabled && !this.openState) {
            this._active = true;
        }
    }
    onNavigationEnterUp() {
        if (!this._disabled && !this.openState) {
            this._active = false;
        }
        if (this.openState) {
            let focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        this.togglePopupVisibility();
        if (!this.openState && isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    onNavigationOpen() {
        if (!this._disabled && !this.openState) {
            this.togglePopupVisibility();
        }
    }
    onNavigationClose() {
        if (this.openState) {
            this.togglePopupVisibility();
            if (isDocumentAvailable()) {
                this.button.nativeElement.focus();
            }
        }
    }
    onArrowKeyNavigate(index) {
        this.focusService.focus(index);
    }
    _toggle(open) {
        if (this._open === open) {
            return;
        }
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    createPopup() {
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.openState = false);
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
}
DropDownButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoDropDownButton',
                providers: [
                    FocusService,
                    NavigationService,
                    NAVIGATION_SETTINGS_PROVIDER$1,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.dropdownbutton'
                    }
                ],
                selector: 'kendo-dropdownbutton',
                template: `
        <button kendoButton #button
            role="menu"
            type="button"
            [tabindex]="componentTabIndex"
            [class.k-state-active]="active"
            [disabled]="disabled"
            [icon]="icon"
            [iconClass]="iconClass"
            [imageUrl]="imageUrl"
            [ngClass]="buttonClass"
            (click)="openPopup()"
            (focus)="handleFocus()"
            [attr.aria-disabled]="disabled"
            [attr.aria-expanded]="openState"
            [attr.aria-haspopup]="true"
            [attr.aria-owns]="listId"
            [look]="look"
            [primary]="primary"
            >
            <ng-content></ng-content>
        </button>
        <ng-template #popupTemplate>
            <kendo-button-list
                #buttonList
                [id]="listId"
                [data]="data"
                [textField]="textField"
                [itemTemplate]="itemTemplate"
                (onItemClick)="onItemClick($event)"
                (keydown)="keyDownHandler($event)"
                (keypress)="keyPressHandler($event)"
                (keyup)="keyUpHandler($event)"
            >
            </kendo-button-list>
        </ng-template>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
DropDownButtonComponent.ctorParameters = () => [
    { type: FocusService },
    { type: NavigationService },
    { type: ElementRef },
    { type: NgZone },
    { type: PopupService },
    { type: ElementRef },
    { type: LocalizationService }
];
DropDownButtonComponent.propDecorators = {
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    popupSettings: [{ type: Input }],
    textField: [{ type: Input }],
    disabled: [{ type: Input }],
    data: [{ type: Input }],
    primary: [{ type: Input }],
    look: [{ type: Input }],
    buttonClass: [{ type: Input }],
    tabIndex: [{ type: Input }],
    itemClick: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-dropdown-button',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
    button: [{ type: ViewChild, args: ['button',] }],
    buttonList: [{ type: ViewChild, args: ['buttonList',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
    keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};

/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownButtonComponent`&mdash;The DropDownButtonComponent component class.
 */
class DropDownButtonModule {
}
DropDownButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DropDownButtonComponent],
                exports: [DropDownButtonComponent, ListModule],
                imports: [CommonModule, PopupModule, ListModule, ButtonModule]
            },] },
];

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmodules'] }})
 * definition for the Buttons components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonsModule } from '@progress/kendo-angular-buttons';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ButtonsModule], // import Buttons module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class ButtonsModule {
}
ButtonsModule.decorators = [
    { type: NgModule, args: [{
                exports: [ButtonGroupModule, ButtonModule, SplitButtonModule, DropDownButtonModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { KendoButtonService, FocusService, FocusableDirective, ButtonItemTemplateDirective, ListButton, ListComponent, ListModule, TemplateContextDirective, NAVIGATION_CONFIG, NavigationService, ButtonDirective, ButtonDirective as Button, ButtonGroupComponent, ButtonGroupComponent as ButtonGroup, ButtonGroupModule, ButtonModule, ButtonsModule, SplitButtonComponent, SplitButtonComponent as SplitButton, SplitButtonModule, DropDownButtonComponent, DropDownButtonComponent as DropDownButton, DropDownButtonModule };
