var proxy = function (a, b) { return function (e) { return b(a(e)); }; };

var bind = function (el, event, callback) { return el.addEventListener && el.addEventListener(event, callback); };

var unbind = function (el, event, callback) { return el && el.removeEventListener && el.removeEventListener(event, callback); };

var noop = function () { /* empty */ };

var preventDefault = function (e) { return e.preventDefault(); };

var touchRegExp = /touch/;

// 300ms is the usual mouse interval;
// // However, an underpowered mobile device under a heavy load may queue mouse events for a longer period.
var IGNORE_MOUSE_TIMEOUT = 2000;

function normalizeEvent(e) {
    if (e.type.match(touchRegExp)) {
        return {
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            clientX: e.changedTouches[0].clientX,
            clientY: e.changedTouches[0].clientY,
            type: e.type,
            originalEvent: e,
            isTouch: true
        };
    }

    return {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        type: e.type,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        originalEvent: e
    };
}

export var Draggable = function Draggable(ref) {
    var this$1 = this;
    var press = ref.press; if ( press === void 0 ) press = noop;
    var drag = ref.drag; if ( drag === void 0 ) drag = noop;
    var release = ref.release; if ( release === void 0 ) release = noop;
    var mouseOnly = ref.mouseOnly; if ( mouseOnly === void 0 ) mouseOnly = false;

    this._pressHandler = proxy(normalizeEvent, press);
    this._dragHandler = proxy(normalizeEvent, drag);
    this._releaseHandler = proxy(normalizeEvent, release);
    this._ignoreMouse = false;
    this._mouseOnly = mouseOnly;

    this._touchstart = function (e) {
        if (e.touches.length === 1) {
            this$1._pressHandler(e);
        }
    };

    this._touchmove = function (e) {
        if (e.touches.length === 1) {
            this$1._dragHandler(e);
        }
    };

    this._touchend = function (e) {
        // the last finger has been lifted, and the user is not doing gesture.
        // there might be a better way to handle this.
        if (e.touches.length === 0 && e.changedTouches.length === 1) {
            this$1._releaseHandler(e);
            this$1._ignoreMouse = true;
            setTimeout(this$1._restoreMouse, IGNORE_MOUSE_TIMEOUT);
        }
    };

    this._restoreMouse = function () {
        this$1._ignoreMouse = false;
    };

    this._mousedown = function (e) {
        var which = e.which;

        if ((which && which > 1) || this$1._ignoreMouse) {
            return;
        }

        bind(document, "mousemove", this$1._mousemove);
        bind(document, "mouseup", this$1._mouseup);
        this$1._pressHandler(e);
    };

    this._mousemove = function (e) {
        this$1._dragHandler(e);
    };

    this._mouseup = function (e) {
        unbind(document, "mousemove", this$1._mousemove);
        unbind(document, "mouseup", this$1._mouseup);
        this$1._releaseHandler(e);
    };

    this._pointerdown = function (e) {
        if (e.isPrimary && e.button === 0) {
            bind(document, "pointermove", this$1._pointermove);
            bind(document, "pointerup", this$1._pointerup);
            bind(document, "pointercancel", this$1._pointerup);
            bind(document, "contextmenu", preventDefault);

            this$1._pressHandler(e);
        }
    };

    this._pointermove = function (e) {
        if (e.isPrimary) {
            this$1._dragHandler(e);
        }
    };

    this._pointerup = function (e) {
        if (e.isPrimary) {
            unbind(document, "pointermove", this$1._pointermove);
            unbind(document, "pointerup", this$1._pointerup);
            unbind(document, "pointercancel", this$1._pointerup);
            unbind(document, "contextmenu", preventDefault);

            this$1._releaseHandler(e);
        }
    };
};

Draggable.supportPointerEvent = function supportPointerEvent () {
    return (typeof window !== 'undefined') && window.PointerEvent;
};

Draggable.prototype.bindTo = function bindTo (element) {
    if (element === this._element) {
        return;
    }

    if (this._element) {
        this._unbindFromCurrent();
    }

    this._element = element;
    this._bindToCurrent();
};

Draggable.prototype._bindToCurrent = function _bindToCurrent () {
    var element = this._element;

    if (this._usePointers()) {
        bind(element, "pointerdown", this._pointerdown);
        return;
    }

    bind(element, "mousedown", this._mousedown);

    if (!this._mouseOnly) {
        bind(element, "touchstart", this._touchstart);
        bind(element, "touchmove", this._touchmove);
        bind(element, "touchend", this._touchend);
    }
};

Draggable.prototype._unbindFromCurrent = function _unbindFromCurrent () {
    var element = this._element;

    if (this._usePointers()) {
        unbind(element, "pointerdown", this._pointerdown);
        unbind(document, "pointermove", this._pointermove);
        unbind(document, "pointerup", this._pointerup);
        unbind(document, "contextmenu", preventDefault);
        unbind(document, "pointercancel", this._pointerup);
        return;
    }

    unbind(element, "mousedown", this._mousedown);

    if (!this._mouseOnly) {
        unbind(element, "touchstart", this._touchstart);
        unbind(element, "touchmove", this._touchmove);
        unbind(element, "touchend", this._touchend);
    }
};

Draggable.prototype._usePointers = function _usePointers () {
    return !this._mouseOnly && Draggable.supportPointerEvent();
};

Draggable.prototype.destroy = function destroy () {
    this._unbindFromCurrent();
    this._element = null;
};

// Re-export as "default" field to address a bug
// where the ES Module is imported by CommonJS code.
//
// See https://github.com/telerik/kendo-angular/issues/1314
Draggable.default = Draggable;

// Rollup won't output exports['default'] otherwise
export default Draggable;

