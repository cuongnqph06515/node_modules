/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Renderer2 as Renderer, Output, Optional, NgZone } from '@angular/core';
import { KendoButtonService } from './button.service';
import { isDocumentAvailable, isChanged, hasObservers, Keys } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { filter } from 'rxjs/operators';
const SPAN_TAG_NAME = 'SPAN';
/**
 * Represents the Kendo UI Button component for Angular.
 */
export class ButtonDirective {
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
    { type: Renderer },
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
