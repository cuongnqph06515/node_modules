"use strict";
// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var Modifiers;
(function (Modifiers) {
    Modifiers[Modifiers["None"] = 0] = "None";
    Modifiers[Modifiers["AltKey"] = 1] = "AltKey";
    Modifiers[Modifiers["CtrlKey"] = 2] = "CtrlKey";
    Modifiers[Modifiers["ShiftKey"] = 4] = "ShiftKey";
    Modifiers[Modifiers["MetaKey"] = 8] = "MetaKey";
})(Modifiers = exports.Modifiers || (exports.Modifiers = {}));
/**
 * @hidden
 */
function withModifiers(e, modifiers) {
    return e.altKey === ((modifiers & Modifiers.AltKey) === Modifiers.AltKey) &&
        e.ctrlKey === ((modifiers & Modifiers.CtrlKey) === Modifiers.CtrlKey) &&
        e.shiftKey === ((modifiers & Modifiers.ShiftKey) === Modifiers.ShiftKey) &&
        e.metaKey === ((modifiers & Modifiers.MetaKey) === Modifiers.MetaKey);
}
exports.withModifiers = withModifiers;
/**
 * @hidden
 */
function noModifiers(e) {
    return withModifiers(e, Modifiers.None);
}
exports.noModifiers = noModifiers;
