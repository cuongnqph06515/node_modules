import { getBoundaries, isModifierEnabled } from '../utils';
export function preventOverflow(data) {
    var _a;
    if (!isModifierEnabled(data.options, 'preventOverflow')) {
        return data;
    }
    // NOTE: DOM access here
    // resets the target Offsets's position so that the document size can be calculated excluding
    // the size of the targetOffsets element itself
    const transformProp = 'transform';
    const targetStyles = data.instance.target.style; // assignment to help minification
    const { top, left, [transformProp]: transform } = targetStyles;
    targetStyles.top = '';
    targetStyles.left = '';
    targetStyles[transformProp] = '';
    const boundaries = getBoundaries(data.instance.target, data.instance.host, 0, // padding
    ((_a = data.options.modifiers.preventOverflow) === null || _a === void 0 ? void 0 : _a.boundariesElement) || 'scrollParent', false // positionFixed
    );
    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    targetStyles.top = top;
    targetStyles.left = left;
    targetStyles[transformProp] = transform;
    const order = ['left', 'right', 'top', 'bottom'];
    const check = {
        primary(placement) {
            var _a, _b, _c, _d;
            let value = data.offsets.target[placement];
            // options.escapeWithReference
            if (((_a = data.offsets.target[placement]) !== null && _a !== void 0 ? _a : 0) < ((_b = boundaries[placement]) !== null && _b !== void 0 ? _b : 0)) {
                value = Math.max((_c = data.offsets.target[placement]) !== null && _c !== void 0 ? _c : 0, (_d = boundaries[placement]) !== null && _d !== void 0 ? _d : 0);
            }
            return { [placement]: value };
        },
        secondary(placement) {
            var _a, _b, _c, _d;
            const mainSide = placement === 'right' ? 'left' : 'top';
            let value = data.offsets.target[mainSide];
            // escapeWithReference
            if (((_a = data.offsets.target[placement]) !== null && _a !== void 0 ? _a : 0) < ((_b = boundaries[placement]) !== null && _b !== void 0 ? _b : 0)) {
                value = Math.min((_c = data.offsets.target[mainSide]) !== null && _c !== void 0 ? _c : 0, ((_d = boundaries[placement]) !== null && _d !== void 0 ? _d : 0) -
                    (placement === 'right' ? data.offsets.target.width : data.offsets.target.height));
            }
            return { [mainSide]: value };
        }
    };
    order.forEach((placement) => {
        const side = ['left', 'top', 'start'].indexOf(placement) !== -1 ? check['primary'] : check['secondary'];
        data.offsets.target = Object.assign(Object.assign({}, data.offsets.target), side(placement));
    });
    return data;
}
//# sourceMappingURL=preventOverflow.js.map