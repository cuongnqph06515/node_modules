const closest = (element, selector) => {
    if (element.closest) {
        return element.closest(selector);
    }
    const matches = Element.prototype.matches ?
        (el, sel) => el.matches(sel)
        : (el, sel) => el.msMatchesSelector(sel);
    let node = element;
    while (node) {
        if (matches(node, selector)) {
            return node;
        }
        node = node.parentElement;
    }
};
const createRipple = doc => {
    const ripple = doc.createElement('div');
    ripple.className = 'k-ripple';
    const blob = doc.createElement('div');
    blob.className = 'k-ripple-blob';
    ripple.appendChild(blob);
    return [ripple, blob];
};
const once = (element, eventName, fn) => {
    const listener = () => {
        fn();
        element.removeEventListener(eventName, listener, false);
    };
    const remove = () => element.addEventListener(eventName, listener, false);
    remove();
    return { remove };
};
const activate = (containerSelector, options) => e => {
    const target = e.target;
    const doc = target.document || target.ownerDocument;
    let container;
    if (options.container) {
        container = options.container(target);
    }
    else {
        container = closest(target, containerSelector);
    }
    if (!container) {
        return;
    }
    // focus event of ripple container triggers double-focus
    const doubleFocus = /focus/i.test(e.type) && container.classList.contains("k-ripple-target");
    if (doubleFocus) {
        return;
    }
    if (!target.classList.contains('k-checkbox') && !target.classList.contains('k-radio')) {
        // suppress focus when animating ripples
        container.classList.add("k-ripple-target");
        const [ripple, blob] = createRipple(doc);
        const state = {
            animated: false,
            released: false,
            blob,
            container,
            ripple
        };
        const eventType = {
            'focusin': 'focusout',
            'keydown': 'keyup',
            'mousedown': 'mouseup',
            'pointerdown': 'pointerup',
            'touchdown': 'touchup',
            'animationstart': 'animationend'
        }[e.type];
        once(e.currentTarget, eventType, () => release(state));
        container.appendChild(ripple);
        // recalc to allow the effect to animate
        window.getComputedStyle(ripple).getPropertyValue('opacity');
        const rect = container.getBoundingClientRect();
        let left = 0;
        let top = 0;
        if ((/mouse|pointer|touch/).test(e.type)) {
            left = e.clientX - rect.left;
            top = e.clientY - rect.top;
        }
        else {
            left = rect.width / 2;
            top = rect.height / 2;
        }
        // coordinates of the farthest corner
        const xMax = left < rect.width / 2 ? rect.width : 0;
        const yMax = top < rect.height / 2 ? rect.height : 0;
        // distance to the farthest corner
        const dx = left - xMax;
        const dy = top - yMax;
        // blob size is twice the blob radius
        const size = 2 * Math.sqrt(dx * dx + dy * dy);
        const duration = 500;
        blob.style.width = blob.style.height = `${size}px`;
        // force reflow for Safari 11 to align ripple blob
        if (blob.offsetWidth < 0) {
            throw new Error("Inconceivable!");
        }
        blob.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        transform: translate(-50%, -50%) scale(1);
        left: ${left}px;
        top: ${top}px;
    `;
        setTimeout(() => finishAnimation(state), duration);
    }
    else {
        e.target.classList.remove('k-ripple-focus');
        if (e.type !== 'animationend') {
            e.target.classList.add('k-ripple-focus');
        }
    }
};
const finishAnimation = (state) => {
    state.animated = true;
    deactivate(state);
};
const release = (state) => {
    state.released = true;
    deactivate(state);
};
const deactivate = (state) => {
    // deactivation happens when both
    // - the activation event has been released (release)
    // - the ripple has finished animating (finishAnimation)
    if (!state.released || !state.animated) {
        return;
    }
    const { blob, ripple, container } = state;
    if (container) {
        once(container, 'blur', () => container.classList.remove("k-ripple-target"));
    }
    if (blob) {
        once(blob, 'transitionend', () => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        });
        blob.style.transition = 'opacity 200ms linear';
        blob.style.opacity = '0';
    }
};
/**
 * @hidden
 */
export const register = (root, elements) => {
    const flatten = arr => [].concat.apply([], arr);
    const handlers = flatten(elements.map((item) => {
        const defaultOptions = {
            events: ['mousedown', 'touchdown'],
            global: false
        };
        const { selector, options = defaultOptions } = item;
        const activator = activate(selector, options);
        const events = options.events || defaultOptions.events;
        const container = options.global ? document.body : root;
        events.forEach(evt => container.addEventListener(evt, activator, false));
        return { events, options, activator };
    }));
    return () => {
        if (!root) {
            return;
        }
        const removeListener = ({ events, options, activator }) => {
            const container = options.global ? document.body : root;
            events.forEach(evt => container.removeEventListener(evt, activator, false));
        };
        handlers.forEach(removeListener);
        root = null;
    };
};
