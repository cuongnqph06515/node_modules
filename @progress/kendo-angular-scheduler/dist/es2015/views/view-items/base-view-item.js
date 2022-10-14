import { Input, HostBinding, TemplateRef } from '@angular/core';
import { anyChanged } from '@progress/kendo-angular-common';
import { Subscription } from 'rxjs';
import { isRecurrence, isRecurrenceException, formatEventTime } from '../utils';
import { toLocalDate } from '@progress/kendo-date-math';
/**
 * @hidden
 */
export class BaseViewItem {
    constructor(slotService, localization, focusService, element, renderer) {
        this.slotService = slotService;
        this.localization = localization;
        this.focusService = focusService;
        this.element = element;
        this.renderer = renderer;
        this.className = true;
        this.subs = new Subscription();
    }
    get taskIndex() {
        return this.item.index;
    }
    get touchAction() {
        return this.editable && this.editable.drag !== false ? 'none' : null;
    }
    get eventTitle() {
        const startTime = toLocalDate(this.item.startTime);
        const endTime = toLocalDate(this.item.endTime);
        const time = formatEventTime(startTime, endTime, this.item.isAllDay);
        return `${time}, ${this.item.event.title}`;
    }
    get deleteMessage() {
        return this.localization.get('deleteTitle');
    }
    get resizable() {
        return this.editable && this.editable.resize !== false;
    }
    get removable() {
        return this.editable && this.editable.remove !== false;
    }
    get isRecurrence() {
        return isRecurrence(this.item);
    }
    get isRecurrenceException() {
        return isRecurrenceException(this.item);
    }
    get nativeElement() {
        if (this.element) {
            return this.element.nativeElement;
        }
    }
    setStyles(styles) {
        const element = this.nativeElement;
        if (element) {
            for (let name in styles) {
                if (styles.hasOwnProperty(name)) {
                    this.renderer.setStyle(element, name, styles[name]);
                }
            }
        }
    }
    toggle(visible) {
        this.setStyles({ display: visible ? 'block' : 'none' });
    }
    reflow() {
        const rect = this.rect;
        if (rect) {
            this.setStyles({
                left: !this.localization.rtl ? `${rect.left}px` : '',
                right: this.localization.rtl ? `${rect.left}px` : '',
                top: `${rect.top}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                display: 'block'
            });
        }
    }
    ngOnInit() {
        if (this.dragHint) {
            return;
        }
        this.subs.add(this.slotService.slotsChange.subscribe(() => {
            this.rect = null;
            this.setStyles({
                display: 'none',
                width: 0,
                left: 0
            });
            this.slotService.unregisterItem(this, this.resourceIndex, this.index);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
            }
        }));
    }
    ngOnChanges(changes) {
        if (this.dragHint) {
            return;
        }
        if (anyChanged(['resourceIndex', 'index'], changes)) {
            const { resourceIndex, index } = changes;
            const previousResourceIndex = resourceIndex ? resourceIndex.previousValue : this.resourceIndex;
            const previousIndex = index ? index.previousValue : this.index;
            this.slotService.unregisterItem(this, previousResourceIndex, previousIndex);
            if (this.resourceIndex >= 0) {
                this.slotService.registerItem(this);
                this.toggle(true);
            }
            else {
                this.toggle(false);
            }
        }
    }
    ngOnDestroy() {
        if (this.dragHint) {
            return;
        }
        this.slotService.unregisterItem(this);
        this.subs.unsubscribe();
    }
}
BaseViewItem.propDecorators = {
    item: [{ type: Input }],
    resourceIndex: [{ type: Input }],
    index: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    editable: [{ type: Input }],
    dragHint: [{ type: Input }],
    resources: [{ type: Input }],
    className: [{ type: HostBinding, args: ['class.k-event',] }],
    taskIndex: [{ type: HostBinding, args: ['attr.data-task-index',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
};
