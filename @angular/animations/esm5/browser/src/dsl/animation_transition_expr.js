/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var ANY_STATE = '*';
export function parseTransitionExpr(transitionValue, errors) {
    var expressions = [];
    if (typeof transitionValue == 'string') {
        transitionValue.split(/\s*,\s*/).forEach(function (str) { return parseInnerTransitionStr(str, expressions, errors); });
    }
    else {
        expressions.push(transitionValue);
    }
    return expressions;
}
function parseInnerTransitionStr(eventStr, expressions, errors) {
    if (eventStr[0] == ':') {
        var result = parseAnimationAlias(eventStr, errors);
        if (typeof result == 'function') {
            expressions.push(result);
            return;
        }
        eventStr = result;
    }
    var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (match == null || match.length < 4) {
        errors.push("The provided transition expression \"" + eventStr + "\" is not supported");
        return expressions;
    }
    var fromState = match[1];
    var separator = match[2];
    var toState = match[3];
    expressions.push(makeLambdaFromStates(fromState, toState));
    var isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(makeLambdaFromStates(toState, fromState));
    }
}
function parseAnimationAlias(alias, errors) {
    switch (alias) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        case ':increment':
            return function (fromState, toState) { return parseFloat(toState) > parseFloat(fromState); };
        case ':decrement':
            return function (fromState, toState) { return parseFloat(toState) < parseFloat(fromState); };
        default:
            errors.push("The transition alias value \"" + alias + "\" is not supported");
            return '* => *';
    }
}
// DO NOT REFACTOR ... keep the follow set instantiations
// with the values intact (closure compiler for some reason
// removes follow-up lines that add the values outside of
// the constructor...
var TRUE_BOOLEAN_VALUES = new Set(['true', '1']);
var FALSE_BOOLEAN_VALUES = new Set(['false', '0']);
function makeLambdaFromStates(lhs, rhs) {
    var LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs);
    var RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
    return function (fromState, toState) {
        var lhsMatch = lhs == ANY_STATE || lhs == fromState;
        var rhsMatch = rhs == ANY_STATE || rhs == toState;
        if (!lhsMatch && LHS_MATCH_BOOLEAN && typeof fromState === 'boolean') {
            lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs);
        }
        if (!rhsMatch && RHS_MATCH_BOOLEAN && typeof toState === 'boolean') {
            rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs);
        }
        return lhsMatch && rhsMatch;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyYW5zaXRpb25fZXhwci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvZHNsL2FuaW1hdGlvbl90cmFuc2l0aW9uX2V4cHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUk3QixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLGVBQTJDLEVBQUUsTUFBZ0I7SUFDL0QsSUFBTSxXQUFXLEdBQTBCLEVBQUUsQ0FBQztJQUM5QyxJQUFJLE9BQU8sZUFBZSxJQUFJLFFBQVEsRUFBRTtRQUN0QyxlQUFlLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FDcEMsVUFBQSxHQUFHLElBQUksT0FBQSx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLENBQUM7S0FDL0Q7U0FBTTtRQUNMLFdBQVcsQ0FBQyxJQUFJLENBQXNCLGVBQWUsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQzVCLFFBQWdCLEVBQUUsV0FBa0MsRUFBRSxNQUFnQjtJQUN4RSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDdEIsSUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksT0FBTyxNQUFNLElBQUksVUFBVSxFQUFFO1lBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsT0FBTztTQUNSO1FBQ0QsUUFBUSxHQUFHLE1BQU0sQ0FBQztLQUNuQjtJQUVELElBQU0sS0FBSyxHQUFHLFFB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LENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckY7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLGlCQUFpQixJQUFJLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUNsRSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuRjtRQUVELE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQztJQUM5QixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuZXhwb3J0IGNvbnN0IEFOWV9TVEFURSA9ICcqJztcbmV4cG9ydCBkZWNsYXJlIHR5cGUgVHJhbnNpdGlvbk1hdGNoZXJGbiA9XG4gICAgKGZyb21TdGF0ZTogYW55LCB0b1N0YXRlOiBhbnksIGVsZW1lbnQ6IGFueSwgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJhbnNpdGlvbkV4cHIoXG4gICAgdHJhbnNpdGlvblZhbHVlOiBzdHJpbmd8VHJhbnNpdGlvbk1hdGNoZXJGbiwgZXJyb3JzOiBzdHJpbmdbXSk6IFRyYW5zaXRpb25NYXRjaGVyRm5bXSB7XG4gIGNvbnN0IGV4cHJlc3Npb25zOiBUcmFuc2l0aW9uTWF0Y2hlckZuW10gPSBbXTtcbiAgaWYgKHR5cGVvZiB0cmFuc2l0aW9uVmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICB0cmFuc2l0aW9uVmFsdWUuc3BsaXQoL1xccyosXFxzKi8pLmZvckVhY2goXG4gICAgICAgIHN0ciA9PiBwYXJzZUlubmVyVHJhbnNpdGlvblN0cihzdHIsIGV4cHJlc3Npb25zLCBlcnJvcnMpKTtcbiAgfSBlbHNlIHtcbiAgICBleHByZXNzaW9ucy5wdXNoKDxUcmFuc2l0aW9uTWF0Y2hlckZuPnRyYW5zaXRpb25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGV4cHJlc3Npb25zO1xufVxuXG5mdW5jdGlvbiBwYXJzZUlubmVyVHJhbnNpdGlvblN0cihcbiAgICBldmVudFN0cjogc3RyaW5nLCBleHByZXNzaW9uczogVHJhbnNpdGlvbk1hdGNoZXJGbltdLCBlcnJvcnM6IHN0cmluZ1tdKSB7XG4gIGlmIChldmVudFN0clswXSA9PSAnOicpIHtcbiAgICBjb25zdCByZXN1bHQgPSBwYXJzZUFuaW1hdGlvbkFsaWFzKGV2ZW50U3RyLCBlcnJvcnMpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV4cHJlc3Npb25zLnB1c2gocmVzdWx0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnRTdHIgPSByZXN1bHQ7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9IGV2ZW50U3RyLm1hdGNoKC9eKFxcKnxbLVxcd10rKVxccyooPD9bPS1dPilcXHMqKFxcKnxbLVxcd10rKSQvKTtcbiAgaWYgKG1hdGNoID09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgNCkge1xuICAgIGVycm9ycy5wdXNoKGBUaGUgcHJvdmlkZWQgdHJhbnNpdGlvbiBleHByZXNzaW9uIFwiJHtldmVudFN0cn1cIiBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgcmV0dXJuIGV4cHJlc3Npb25zO1xuICB9XG5cbiAgY29uc3QgZnJvbVN0YXRlID0gbWF0Y2hbMV07XG4gIGNvbnN0IHNlcGFyYXRvciA9IG1hdGNoWzJdO1xuICBjb25zdCB0b1N0YXRlID0gbWF0Y2hbM107XG4gIGV4cHJlc3Npb25zLnB1c2gobWFrZUxhbWJkYUZyb21TdGF0ZXMoZnJvbVN0YXRlLCB0b1N0YXRlKSk7XG5cbiAgY29uc3QgaXNGdWxsQW55U3RhdGVFeHByID0gZnJvbVN0YXRlID09IEFOWV9TVEFURSAmJiB0b1N0YXRlID09IEFOWV9TVEFURTtcbiAgaWYgKHNlcGFyYXRvclswXSA9PSAnPCcgJiYgIWlzRnVsbEFueVN0YXRlRXhwcikge1xuICAgIGV4cHJlc3Npb25zLnB1c2gobWFrZUxhbWJkYUZyb21TdGF0ZXModG9TdGF0ZSwgZnJvbVN0YXRlKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBbmltYXRpb25BbGlhcyhhbGlhczogc3RyaW5nLCBlcnJvcnM6IHN0cmluZ1tdKTogc3RyaW5nfFRyYW5zaXRpb25NYXRjaGVyRm4ge1xuICBzd2l0Y2ggKGFsaWFzKSB7XG4gICAgY2FzZSAnOmVudGVyJzpcbiAgICAgIHJldHVybiAndm9pZCA9PiAqJztcbiAgICBjYXNlICc6bGVhdmUnOlxuICAgICAgcmV0dXJuICcqID0+IHZvaWQnO1xuICAgIGNhc2UgJzppbmNyZW1lbnQnOlxuICAgICAgcmV0dXJuIChmcm9tU3RhdGU6IGFueSwgdG9TdGF0ZTogYW55KTogYm9vbGVhbiA9PiBwYXJzZUZsb2F0KHRvU3RhdGUpID4gcGFyc2VGbG9hdChmcm9tU3RhdGUpO1xuICAgIGNhc2UgJzpkZWNyZW1lbnQnOlxuICAgICAgcmV0dXJuIChmcm9tU3RhdGU6IGFueSwgdG9TdGF0ZTogYW55KTogYm9vbGVhbiA9PiBwYXJzZUZsb2F0KHRvU3RhdGUpIDwgcGFyc2VGbG9hdChmcm9tU3RhdGUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBlcnJvcnMucHVzaChgVGhlIHRyYW5zaXRpb24gYWxpYXMgdmFsdWUgXCIke2FsaWFzfVwiIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgIHJldHVybiAnKiA9PiAqJztcbiAgfVxufVxuXG4vLyBETyBOT1QgUkVGQUNUT1IgLi4uIGtlZXAgdGhlIGZvbGxvdyBzZXQgaW5zdGFudGlhdGlvbnNcbi8vIHdpdGggdGhlIHZhbHVlcyBpbnRhY3QgKGNsb3N1cmUgY29tcGlsZXIgZm9yIHNvbWUgcmVhc29uXG4vLyByZW1vdmVzIGZvbGxvdy11cCBsaW5lcyB0aGF0IGFkZCB0aGUgdmFsdWVzIG91dHNpZGUgb2Zcbi8vIHRoZSBjb25zdHJ1Y3Rvci4uLlxuY29uc3QgVFJVRV9CT09MRUFOX1ZBTFVFUyA9IG5ldyBTZXQ8c3RyaW5nPihbJ3RydWUnLCAnMSddKTtcbmNvbnN0IEZBTFNFX0JPT0xFQU5fVkFMVUVTID0gbmV3IFNldDxzdHJpbmc+KFsnZmFsc2UnLCAnMCddKTtcblxuZnVuY3Rpb24gbWFrZUxhbWJkYUZyb21TdGF0ZXMobGhzOiBzdHJpbmcsIHJoczogc3RyaW5nKTogVHJhbnNpdGlvbk1hdGNoZXJGbiB7XG4gIGNvbnN0IExIU19NQVRDSF9CT09MRUFOID0gVFJVRV9CT09MRUFOX1ZBTFVFUy5oYXMobGhzKSB8fCBGQUxTRV9CT09MRUFOX1ZBTFVFUy5oYXMobGhzKTtcbiAgY29uc3QgUkhTX01BVENIX0JPT0xFQU4gPSBUUlVFX0JPT0xFQU5fVkFMVUVTLmhhcyhyaHMpIHx8IEZBTFNFX0JPT0xFQU5fVkFMVUVTLmhhcyhyaHMpO1xuXG4gIHJldHVybiAoZnJvbVN0YXRlOiBhbnksIHRvU3RhdGU6IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBsaHNNYXRjaCA9IGxocyA9PSBBTllfU1RBVEUgfHwgbGhzID09IGZyb21TdGF0ZTtcbiAgICBsZXQgcmhzTWF0Y2ggPSByaHMgPT0gQU5ZX1NUQVRFIHx8IHJocyA9PSB0b1N0YXRlO1xuXG4gICAgaWYgKCFsaHNNYXRjaCAmJiBMSFNfTUFUQ0hfQk9PTEVBTiAmJiB0eXBlb2YgZnJvbVN0YXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGxoc01hdGNoID0gZnJvbVN0YXRlID8gVFJVRV9CT09MRUFOX1ZBTFVFUy5oYXMobGhzKSA6IEZBTFNFX0JPT0xFQU5fVkFMVUVTLmhhcyhsaHMpO1xuICAgIH1cbiAgICBpZiAoIXJoc01hdGNoICYmIFJIU19NQVRDSF9CT09MRUFOICYmIHR5cGVvZiB0b1N0YXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJoc01hdGNoID0gdG9TdGF0ZSA/IFRSVUVfQk9PTEVBTl9WQUxVRVMuaGFzKHJocykgOiBGQUxTRV9CT09MRUFOX1ZBTFVFUy5oYXMocmhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGhzTWF0Y2ggJiYgcmhzTWF0Y2g7XG4gIH07XG59XG4iXX0=