/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SimpleChanges, ElementRef, EventEmitter, Renderer2 as Renderer, OnDestroy, NgZone } from '@angular/core';
import { KendoButtonService } from './button.service';
import { ButtonLook } from '../button-look';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the Kendo UI Button component for Angular.
 */
export declare class ButtonDirective implements OnDestroy {
    private service;
    private ngZone;
    /**
     * Provides visual styling that indicates if the Button is active.
     * By default, `toggleable` is set to `false`.
     */
    toggleable: boolean;
    /**
     * Backwards-compatible alias
     *
     * @hidden
     */
    /**
    * @hidden
    */
    togglable: boolean;
    /**
     * Adds visual weight to the Button and makes it primary.
     */
    primary: boolean;
    /**
     * Changes the visual appearance by using alternative styling options
     * ([more information and examples]({% slug appearance_button %})).
     *
     * The available values are:
     * * `flat`
     * * `outline`
     */
    look: ButtonLook;
    /**
     * Sets the selected state of the Button.
     */
    selected: boolean;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    icon: string;
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    iconClass: string;
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    imageUrl: string;
    /**
     * If set to `true`, it disables the Button.
     */
    disabled: boolean;
    /**
     * @hidden
     */
    role: string;
    /**
     * Fires each time the selected state of a toggleable button is changed.
     *
     * The event argument is the new selected state (boolean).
     */
    selectedChange: EventEmitter<any>;
    element: HTMLElement;
    renderer: Renderer;
    isDisabled: boolean;
    isIcon: boolean;
    isIconClass: boolean;
    imageNode: HTMLImageElement;
    iconNode: HTMLElement;
    private localizationChangeSubscription;
    private buttonLookChangeSubscription;
    private _focused;
    private direction;
    private _selected;
    private deferTimeout;
    private domEvents;
    isFocused: boolean;
    readonly classButton: boolean;
    readonly classDisabled: boolean;
    readonly classPrimary: boolean;
    readonly isFlat: boolean;
    readonly isBare: boolean;
    readonly isOutline: boolean;
    readonly classActive: boolean;
    readonly getDirection: string;
    /**
     * @hidden
     */
    onFocus(): void;
    /**
     * @hidden
     */
    onBlur(): void;
    constructor(element: ElementRef, renderer: Renderer, service: KendoButtonService, localization: LocalizationService, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * Focuses the Button component.
     */
    focus(): void;
    /**
     * Blurs the Button component.
     */
    blur(): void;
    /**
     * @hidden
     */
    setAttribute(attribute: string, value: string): void;
    /**
     * @hidden
     */
    removeAttribute(attribute: string): void;
    /**
     * @hidden
     *
     * Internal setter that triggers selectedChange
     */
    setSelected(value: boolean): void;
    private toggleAriaCheckbox;
    private hasText;
    private addImgIcon;
    private addIcon;
    private prependChild;
    private defer;
    private iconSetter;
    private removeImageNode;
    private removeIconNode;
    private updateIconNode;
    private setIconTextClasses;
    private toggleClass;
    private _onButtonClick;
}
