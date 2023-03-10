const getTouch = (domEvent) => {
    return {
        x: {
            location: domEvent.pageX
        },
        y: {
            location: domEvent.pageY
        }
    };
};
const ɵ0 = getTouch;
const eventArgs = (e, previousArgs) => {
    const pointers = e.pointers;
    const pointer = pointers[0];
    const xLocation = pointer.pageX;
    const yLocation = pointer.pageY;
    let distance = 0;
    if (pointers.length > 1) {
        const pointer1 = pointers[0];
        const pointer2 = pointers[1];
        distance = Math.sqrt(Math.pow(pointer1.pageX - pointer2.pageX, 2) + Math.pow(pointer1.pageY - pointer2.pageY, 2));
    }
    return {
        distance: distance,
        event: e.srcEvent,
        preventDefault: function () {
            e.preventDefault();
        },
        target: e.target,
        touches: pointers.map(getTouch),
        type: e.type,
        x: {
            delta: previousArgs ? xLocation - previousArgs.x.location : 0,
            initialDelta: e.deltaX,
            location: xLocation,
            startLocation: xLocation - e.deltaX
        },
        y: {
            delta: previousArgs ? yLocation - previousArgs.y.location : 0,
            initialDelta: e.deltaY,
            location: yLocation,
            startLocation: yLocation - e.deltaY
        }
    };
};
const ɵ1 = eventArgs;
function shouldBindGroup(groupNames, events) {
    for (let idx = 0; idx < groupNames.length; idx++) {
        if (events[groupNames[idx]]) {
            return true;
        }
    }
    return false;
}
const eventGroups = [{
        end: 'panend',
        move: 'panmove',
        start: 'panstart'
    }, {
        gesturechange: 'pinchmove',
        gestureend: 'pinchend',
        gesturestart: 'pinchstart'
    }, {
        press: 'press'
    }, {
        tap: 'tap'
    }];
/**
 * @hidden
 */
export class DomEvents {
    constructor(hammerInstance, events) {
        this.hammerInstance = hammerInstance;
        this.eventHandlers = {};
        this.tap = this.tap.bind(this);
        this.press = this.press.bind(this);
        this.panstart = this.panstart.bind(this);
        this.panmove = this.panmove.bind(this);
        this.panend = this.panend.bind(this);
        this.pinchstart = this.pinchstart.bind(this);
        this.pinchmove = this.pinchmove.bind(this);
        this.pinchend = this.pinchend.bind(this);
        if (events) {
            this.bind(events);
        }
    }
    tap(e) {
        this.trigger('tap', e);
    }
    press(e) {
        this.trigger('press', e);
    }
    panstart(e) {
        delete this.previous;
        this.previous = this.trigger('start', e);
    }
    panmove(e) {
        this.previous = this.trigger('move', e);
    }
    panend(e) {
        this.trigger('end', e);
        delete this.previous;
    }
    pinchstart(e) {
        this.trigger('gesturestart', e);
    }
    pinchmove(e) {
        this.trigger('gesturechange', e);
    }
    pinchend(e) {
        this.trigger('gestureend', e);
    }
    trigger(name, e) {
        const args = eventArgs(e, this.previous);
        if (this.eventHandlers[name]) {
            this.eventHandlers[name](args);
        }
        return args;
    }
    bind(events = {}) {
        this.unbind();
        this.eventHandlers = events;
        for (let idx = 0; idx < eventGroups.length; idx++) {
            const eventGroup = eventGroups[idx];
            const groupNames = Object.keys(eventGroup);
            if (shouldBindGroup(groupNames, events)) {
                for (let nameIdx = 0; nameIdx < groupNames.length; nameIdx++) {
                    const name = eventGroup[groupNames[nameIdx]];
                    this.hammerInstance.on(name, this[name]);
                }
            }
        }
    }
    unbind() {
        if (this.hammerInstance) {
            this.hammerInstance.off();
        }
        this.eventHandlers = {};
    }
    destroy() {
        if (this.hammerInstance) {
            this.hammerInstance.destroy();
            delete this.hammerInstance;
        }
        delete this.eventHandlers;
    }
    toggleDrag(enable) {
        this.toggle('pan', enable);
    }
    toggleZoom(enable) {
        this.toggle('pinch', enable);
    }
    toggle(recognizer, enable) {
        if (this.hammerInstance) {
            const instanceRecognizer = this.hammerInstance.get(recognizer);
            instanceRecognizer.set({
                enable: enable
            });
        }
    }
}
export { ɵ0, ɵ1 };
