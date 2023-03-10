/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Input, TemplateRef, ChangeDetectorRef, ViewChild, ViewContainerRef, ElementRef, Renderer2 } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { take } from 'rxjs/operators';
import { fadeAnimation, fadeCloseAnimation, slideAnimation, slideCloseAnimation } from './utils/animations';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 *
 */
export class NotificationComponent {
    constructor(cdr, element, renderer, builder, localizationService) {
        this.cdr = cdr;
        this.element = element;
        this.renderer = renderer;
        this.builder = builder;
        this.localizationService = localizationService;
        this.close = new EventEmitter();
        this.width = null;
        this.height = null;
        this.defaultHideAfter = 5000;
        this.animationEnd = new EventEmitter();
        this.rtl = false;
        this.dynamicRTLSubscription = localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
    }
    get containerClass() {
        return true;
    }
    get closeButtonTitle() {
        return this.closeTitle || this.localizationService.get('closeTitle');
    }
    notificationClasses() {
        return `${this.type ? this.typeClass() : ''}
            ${this.closable ? 'k-notification-closable' : ''}`;
    }
    ngOnInit() {
        clearTimeout(this.hideTimeout);
    }
    ngOnDestroy() {
        clearTimeout(this.hideTimeout);
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    ngAfterViewInit() {
        if (!this.closable && !this.animation) {
            this.setHideTimeout();
        }
        if (!this.closable && this.animation) {
            this.animationEnd.pipe(take(1))
                .subscribe(() => this.setHideTimeout());
        }
        if (this.animation) {
            this.animate(this.animation);
        }
    }
    typeClass() {
        return {
            'none': '',
            'success': 'k-notification-success',
            'warning': 'k-notification-warning',
            'error': 'k-notification-error',
            'info': 'k-notification-info'
        }[this.type.style];
    }
    typeIconClass() {
        return {
            'none': '',
            'success': 'k-i-success',
            'warning': 'k-i-warning',
            'error': 'k-i-error',
            'info': 'k-i-info'
        }[this.type.style];
    }
    onCloseClick() {
        clearTimeout(this.hideTimeout);
        this.hide();
    }
    hide(customComponent) {
        const elementHeight = getComputedStyle(this.element.nativeElement).height;
        if (this.animation && elementHeight) {
            this.animate(this.animation, true);
            this.animationEnd.subscribe(() => {
                this.emitClose(customComponent);
            });
            return;
        }
        this.emitClose(customComponent);
    }
    setHideTimeout() {
        const hideAfter = this.hideAfter || this.defaultHideAfter;
        this.hideTimeout = window.setTimeout(() => this.onCloseClick(), hideAfter);
    }
    emitClose(customComponent) {
        if (customComponent) {
            customComponent.destroy();
        }
        this.close.emit();
    }
    play(animation, animatedElement) {
        const factory = this.builder.build(animation);
        const element = this.element.nativeElement;
        this.renderer.addClass(element, 'k-notification-container-animating');
        let player = factory.create(animatedElement);
        player.onDone(() => {
            this.renderer.removeClass(element, 'k-notification-container-animating');
            this.animationEnd.emit();
            if (player) {
                player.destroy();
                player = null;
            }
        });
        player.play();
    }
    animate(animation, onclose) {
        const element = this.element.nativeElement;
        const duration = animation.duration;
        const height = element.offsetHeight;
        const generatedAnimation = animation.type === 'slide' ?
            this.slideAnimation(height, duration, onclose) :
            this.fadeAnimation(duration, onclose);
        this.play(generatedAnimation, element);
    }
    slideAnimation(height, duration, onclose) {
        return onclose ? slideCloseAnimation(height, duration) : slideAnimation(height, duration);
    }
    fadeAnimation(duration, onclose) {
        return onclose ? fadeCloseAnimation(duration) : fadeAnimation(duration);
    }
}
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-notification',
                template: `
    <ng-container kendoNotificationLocalizedMessages
        i18n-closeTitle="kendo.notification.closeTitle|The title of the close button"
        closeTitle="Close"
    >
    </ng-container>
    <div class="k-widget k-notification {{ notificationClasses() }}"
        [ngClass]="cssClass"
        [style.height.px]="height"
        [style.width.px]="width">
        <div class="k-notification-wrap">
            <span *ngIf="type && type.icon && type.style !== 'none'" class="k-icon" [ngClass]="typeIconClass()"></span>

            <div class="k-notification-content">
                <ng-template
                    [ngIf]="templateRef"
                    [ngTemplateOutlet]="templateRef">
                </ng-template>
                <ng-template
                    [ngIf]="templateString">
                    {{ templateString }}
                </ng-template>
                <ng-container #container></ng-container>
            </div>

            <a *ngIf="closable" class="k-icon k-i-close" [attr.title]="closeButtonTitle" (click)="onCloseClick()"></a>
        </div>
    </div>
  `,
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.notification'
                    }
                ]
            },] },
];
/** @nocollapse */
NotificationComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: AnimationBuilder },
    { type: LocalizationService }
];
NotificationComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef, static: true },] }],
    templateRef: [{ type: Input }],
    templateString: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    cssClass: [{ type: Input }],
    hideAfter: [{ type: Input }],
    closable: [{ type: Input }],
    type: [{ type: Input }],
    animation: [{ type: Input }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    containerClass: [{ type: HostBinding, args: ['class.k-notification-container',] }]
};
