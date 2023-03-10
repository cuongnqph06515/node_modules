/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ButtonDirective } from '../button/button.directive';
import { EventEmitter, QueryList, OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit, ElementRef, SimpleChanges } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ButtonGroupSelection } from '../button/selection-settings';
import { KendoButtonService } from '../button/button.service';
import { ButtonLook } from '../button-look';
import { PreventableEvent } from '../preventable-event';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
export declare class ButtonGroupComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit {
    private service;
    private element;
    /**
     * By default, the ButtonGroup is enabled.
     * To disable the whole group of buttons, set its `disabled` attribute to `true`.
     *
     * To disable a specific button, set its own `disabled` attribute to `true`
     * and leave the `disabled` attribute of the ButtonGroup undefined.
     * If you define the `disabled` attribute of the ButtonGroup, it will take
     * precedence over the `disabled` attributes of the underlying buttons and they will be ignored.
     *
     * For more information on how to configure the Button, refer to
     * its [API documentation]({% slug api_buttons_buttondirective %}).
     */
    disabled: boolean;
    /**
     * By default, the selection mode of the ButtonGroup is set to `multiple`.
     */
    selection: ButtonGroupSelection;
    /**
     * Sets the width of the ButtonGroup.
     * If the width of the ButtonGroup is set:
     * - The buttons resize automatically to fill the full width of the group wrapper.
     * - The buttons acquire the same width.
     */
    width: string;
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
    look: ButtonLook;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Fires every time keyboard navigation occurs.
     */
    navigate: EventEmitter<PreventableEvent>;
    buttons: QueryList<ButtonDirective>;
    private _tabIndex;
    private currentTabIndex;
    private direction;
    private subscription;
    private localizationChangeSubscription;
    readonly wrapperClass: boolean;
    readonly disabledClass: boolean;
    readonly stretchedClass: boolean;
    readonly isFlat: boolean;
    readonly isBare: boolean;
    readonly isOutline: boolean;
    readonly getRole: string;
    readonly dir: string;
    readonly ariaDisabled: boolean;
    readonly wrapperWidth: string;
    readonly wrapperTabIndex: number;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    onFocus(): void;
    /**
     * @hidden
     */
    focusout(event: any): void;
    constructor(service: KendoButtonService, localization: LocalizationService, element: ElementRef);
    ngOnInit(): void;
    ngOnChanges(change: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    protected navigateFocus(event: any): void;
    protected deactivate(buttons: Array<ButtonDirective>): void;
    protected activate(buttons: Array<ButtonDirective>): void;
    protected defocus(buttons: Array<ButtonDirective>): void;
    protected focus(buttons: Array<ButtonDirective>): void;
    private verifySettings;
    private isSelectionSingle;
}
