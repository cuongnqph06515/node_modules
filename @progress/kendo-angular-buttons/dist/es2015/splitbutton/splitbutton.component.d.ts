/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, TemplateRef, EventEmitter, ViewContainerRef, AfterViewInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Align, PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { ListButton } from './../listbutton/list-button';
import { PopupSettings } from './../listbutton/popup-settings';
import { ButtonItemTemplateDirective } from './../listbutton/button-item-template.directive';
import { FocusService } from './../focusable/focus.service';
import { NavigationService } from './../navigation/navigation.service';
import { PreventableEvent } from '../preventable-event';
import { ButtonLook } from '../button-look';
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
export declare class SplitButtonComponent extends ListButton implements AfterViewInit, OnChanges {
    private popupService;
    private elRef;
    /**
     * Sets the text of the SplitButton.
     */
    text: string;
    /**
     * Defines an icon to be rendered next to the button text
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    icon: string;
    /**
     * Defines an icon with a custom CSS class to be rendered next to the button text
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    iconClass: string;
    /**
     * Defines the location of an image to be displayed next to the button text
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    imageUrl: string;
    /**
     * Changes the visual appearance by using alternative styling options.
     *
     * The available values are:
     * * `flat`
     * * `outline`
     */
    look: ButtonLook;
    /**
     * When set to `true`, disables a SplitButton item
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    disabled: boolean;
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Configures the text field of the button-list popup.
     */
    textField: string;
    /**
     * Sets the data of the SplitButton.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * The CSS classes that will be rendered on the main button.
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    buttonClass: any;
    /**
     * The CSS classes that will be rendered on the button which opens the popup.
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    arrowButtonClass: any;
    /**
     * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons) that will
     * be rendered for the button which opens the popup.
     */
    arrowButtonIcon: string;
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
    buttonClick: EventEmitter<any>;
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
    itemClick: EventEmitter<any>;
    /**
     * Fires each time the SplitButton gets focused.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the SplitButton gets blurred.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel the event, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel the event, the popup will remain open.
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * An item template that helps to customize the item content.
     */
    itemTemplate: ButtonItemTemplateDirective;
    button: ElementRef;
    popupTemplate: TemplateRef<any>;
    containerRef: ViewContainerRef;
    popupRef: PopupRef;
    /**
     * @hidden
     */
    /**
    * @hidden
    */
    openState: boolean;
    listId: string;
    /**
     * @hidden
     */
    readonly active: boolean;
    /**
     * @hidden
     */
    readonly componentTabIndex: number;
    private buttonText;
    isFocused: boolean;
    readonly widgetClasses: boolean;
    readonly dir: string;
    /**
     * @hidden
     */
    readonly ariaLabel: string;
    /**
     * @hidden
     */
    onButtonFocus(): void;
    /**
     * @hidden
     */
    onButtonClick(): void;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    keypress(event: any): void;
    /**
     * @hidden
     */
    keyup(event: any): void;
    /**
     * @hidden
     */
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @hidden
     */
    togglePopupVisibility(): void;
    /**
     * @hidden
     */
    wrapperContains(element: any): boolean;
    /**
     * @hidden
     */
    readonly anchorAlign: Align;
    /**
     * @hidden
     */
    readonly popupAlign: Align;
    /**
     * Focuses the SplitButton component.
     */
    focus(): void;
    /**
     * Blurs the SplitButton component.
     */
    blur(): void;
    constructor(focusService: FocusService, navigationService: NavigationService, wrapperRef: ElementRef, zone: NgZone, popupService: PopupService, elRef: ElementRef, localization: LocalizationService);
    ngOnDestroy(): void;
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open: boolean): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    protected enterHandler(): void;
    private updateButtonText;
    private readonly appendTo;
    private _toggle;
    private createPopup;
    private destroyPopup;
}
