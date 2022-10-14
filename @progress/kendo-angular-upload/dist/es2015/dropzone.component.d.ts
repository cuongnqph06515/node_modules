/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2 } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DropZoneBase } from './dropzone-base';
/**
 * Represents the [Kendo UI UploadDropZone component for Angular]({% slug overview_upload %}).
 */
export declare class UploadDropZoneComponent extends DropZoneBase {
    private localization;
    hostClass: boolean;
    readonly dirAttribute: string;
    /**
     * Defines the id of the component.
     * It is used to associate it with an existing Upload or FileSelect component.
     */
    zoneId: string;
    /**
     * Defines the name for an existing icon in a Kendo UI theme.
     * The icon is rendered inside the DropZone by a `span.k-icon` element.
     */
    icon: string;
    /**
     * Defines a CSS class or multiple classes separated by spaces,
     * which are applied to a span element.
     * Allows the usage of custom icons.
     */
    iconClass: string;
    private direction;
    private localizationChangeSubscription;
    constructor(element: ElementRef, renderer: Renderer2, localization: LocalizationService);
    /**
     * @hidden
     */
    textFor(key: string): string;
    /**
     * @hidden
     */
    readonly iconClasses: string;
    ngOnDestroy(): void;
}
