"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_event_1 = require("./create-event");
var drag_end_event_1 = require("./drag-end-event");
var drag_event_1 = require("./drag-event");
var drag_start_event_1 = require("./drag-start-event");
var event_click_event_1 = require("./event-click-event");
var event_keydown_event_1 = require("./event-keydown-event");
var remove_event_1 = require("./remove-event");
var resize_end_event_1 = require("./resize-end-event");
var resize_event_1 = require("./resize-event");
var resize_start_event_1 = require("./resize-start-event");
var slot_click_event_1 = require("./slot-click-event");
/**
 * @hidden
 *
 * Maps the name of the event to the argument type of the event.
 */
exports.VIEW_EVENT_MAP = {
    slotClick: slot_click_event_1.SlotClickEvent,
    slotDblClick: slot_click_event_1.SlotClickEvent,
    eventClick: event_click_event_1.EventClickEvent,
    eventDblClick: event_click_event_1.EventClickEvent,
    eventKeydown: event_keydown_event_1.EventKeydownEvent,
    create: create_event_1.CreateEvent,
    remove: remove_event_1.RemoveEvent,
    resizeStart: resize_start_event_1.ResizeStartEvent,
    resize: resize_event_1.ResizeEvent,
    resizeEnd: resize_end_event_1.ResizeEndEvent,
    dragStart: drag_start_event_1.DragStartEvent,
    drag: drag_event_1.DragEvent,
    dragEnd: drag_end_event_1.DragEndEvent
};
