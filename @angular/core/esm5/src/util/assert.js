/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// The functions in this file verify that the assumptions we are making
// about state in an instruction are correct before implementing any logic.
// They are meant only to be called in dev mode as sanity checks.
import { stringify } from './stringify';
export function assertNumber(actual, msg) {
    if (!(typeof actual === 'number')) {
        throwError(msg, typeof actual, 'number', '===');
    }
}
export function assertNumberInRange(actual, minInclusive, maxInclusive) {
    assertNumber(actual, 'Expected a number');
    assertLessThanOrEqual(actual, maxInclusive, 'Expected number to be less than or equal to');
    assertGreaterThanOrEqual(actual, minInclusive, 'Expected number to be greater than or equal to');
}
export function assertString(actual, msg) {
    if (!(typeof actual === 'string')) {
        throwError(msg, actual === null ? 'null' : typeof actual, 'string', '===');
    }
}
export function assertEqual(actual, expected, msg) {
    if (!(actual == expected)) {
        throwError(msg, actual, expected, '==');
    }
}
export function assertNotEqual(actual, expected, msg) {
    if (!(actual != expected)) {
        throwError(msg, actual, expected, '!=');
    }
}
export function assertSame(actual, expected, msg) {
    if (!(actual === expected)) {
        throwError(msg, actual, expected, '===');
    }
}
export function assertNotSame(actual, expected, msg) {
    if (!(actual !== expected)) {
        throwError(msg, actual, expected, '!==');
    }
}
export function assertLessThan(actual, expected, msg) {
    if (!(actual < expected)) {
        throwError(msg, actual, expected, '<');
    }
}
export function assertLessThanOrEqual(actual, expected, msg) {
    if (!(actual <= expected)) {
        throwError(msg, actual, expected, '<=');
    }
}
export function assertGreaterThan(actual, expected, msg) {
    if (!(actual > expected)) {
        throwError(msg, actual, expected, '>');
    }
}
export function assertGreaterThanOrEqual(actual, expected, msg) {
    if (!(actual >= expected)) {
        throwError(msg, actual, expected, '>=');
    }
}
export function assertNotDefined(actual, msg) {
    if (actual != null) {
        throwError(msg, actual, null, '==');
    }
}
export function assertDefined(actual, msg) {
    if (actual == null) {
        throwError(msg, actual, null, '!=');
    }
}
export function throwError(msg, actual, expected, comparison) {
    throw new Error("ASSERTION ERROR: " + msg +
        (comparison == null ? '' : " [Expected=> " + expected + " " + comparison + " " + actual + " <=Actual]"));
}
export function assertDomNode(node) {
    // If we're in a worker, `Node` will not be defined.
    assertEqual((typeof Node !== 'undefined' && node instanceof Node) ||
        (typeof node === 'object' && node != null &&
            node.constructor.name === 'WebWorkerRenderNode'), true, "The provided value must be an instance of a DOM Node but got " + stringify(node));
}
export function assertDataInRange(arr, index) {
    var maxLen = arr ? arr.length : 0;
    assertLessThan(index, maxLen, "Index expected to be less than " + maxLen + " but got " + index);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdXRpbC9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsdUVBQXVFO0FBQ3ZFLDJFQUEyRTtBQUMzRSxpRUFBaUU7QUFFakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQVcsRUFBRSxHQUFXO0lBQ25ELElBQUksQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFO1FBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2pEO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsTUFBVyxFQUFFLFlBQW9CLEVBQUUsWUFBb0I7SUFDekQsWUFBWSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQzFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsNkNBQTZDLENBQUMsQ0FBQztJQUMzRix3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7QUFDbkcsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBVyxFQUFFLEdBQVc7SUFDbkQsSUFBSSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLEVBQUU7UUFDakMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1RTtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFJLE1BQVMsRUFBRSxR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QUMsQ0FBQyxDQUFDLGtCQUFnQixRQUFRLFNBQUksVUFBVSxTQUFJLE1BQU0sZUFBWSxDQUFDLENBQUMsQ0FBQztBQUNoRyxDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFTO0lBQ3JDLG9EQUFvRDtJQUNwRCxXQUFXLENBQ1AsQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxZQUFZLElBQUksQ0FBQztRQUNqRCxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxFQUNyRCxJQUFJLEVBQUUsa0VBQWdFLFNBQVMsQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFDO0FBQy9GLENBQUM7QUFHRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBVSxFQUFFLEtBQWE7SUFDekQsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsb0NBQWtDLE1BQU0saUJBQVksS0FBTyxDQUFDLENBQUM7QUFDN0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVGhlIGZ1bmN0aW9ucyBpbiB0aGlzIGZpbGUgdmVyaWZ5IHRoYXQgdGhlIGFzc3VtcHRpb25zIHdlIGFyZSBtYWtpbmdcbi8vIGFib3V0IHN0YXRlIGluIGFuIGluc3RydWN0aW9uIGFyZSBjb3JyZWN0IGJlZm9yZSBpbXBsZW1lbnRpbmcgYW55IGxvZ2ljLlxuLy8gVGhleSBhcmUgbWVhbnQgb25seSB0byBiZSBjYWxsZWQgaW4gZGV2IG1vZGUgYXMgc2FuaXR5IGNoZWNrcy5cblxuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4vc3RyaW5naWZ5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE51bWJlcihhY3R1YWw6IGFueSwgbXNnOiBzdHJpbmcpOiBhc3NlcnRzIGFjdHVhbCBpcyBudW1iZXIge1xuICBpZiAoISh0eXBlb2YgYWN0dWFsID09PSAnbnVtYmVyJykpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgdHlwZW9mIGFjdHVhbCwgJ251bWJlcicsICc9PT0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TnVtYmVySW5SYW5nZShcbiAgICBhY3R1YWw6IGFueSwgbWluSW5jbHVzaXZlOiBudW1iZXIsIG1heEluY2x1c2l2ZTogbnVtYmVyKTogYXNzZXJ0cyBhY3R1YWwgaXMgbnVtYmVyIHtcbiAgYXNzZXJ0TnVtYmVyKGFjdHVhbCwgJ0V4cGVjdGVkIGEgbnVtYmVyJyk7XG4gIGFzc2VydExlc3NUaGFuT3JFcXVhbChhY3R1YWwsIG1heEluY2x1c2l2ZSwgJ0V4cGVjdGVkIG51bWJlciB0byBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8nKTtcbiAgYXNzZXJ0R3JlYXRlclRoYW5PckVxdWFsKGFjdHVhbCwgbWluSW5jbHVzaXZlLCAnRXhwZWN0ZWQgbnVtYmVyIHRvIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0bycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0U3RyaW5nKGFjdHVhbDogYW55LCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIHN0cmluZyB7XG4gIGlmICghKHR5cGVvZiBhY3R1YWwgPT09ICdzdHJpbmcnKSkge1xuICAgIHRocm93RXJyb3IobXNnLCBhY3R1YWwgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0dWFsLCAnc3RyaW5nJywgJz09PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFcXVhbDxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoIShhY3R1YWwgPT0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc9PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3RFcXVhbDxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIFQge1xuICBpZiAoIShhY3R1YWwgIT0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICchPScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTYW1lPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgVCB7XG4gIGlmICghKGFjdHVhbCA9PT0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc9PT0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90U2FtZTxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoIShhY3R1YWwgIT09IGV4cGVjdGVkKSkge1xuICAgIHRocm93RXJyb3IobXNnLCBhY3R1YWwsIGV4cGVjdGVkLCAnIT09Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExlc3NUaGFuPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgVCB7XG4gIGlmICghKGFjdHVhbCA8IGV4cGVjdGVkKSkge1xuICAgIHRocm93RXJyb3IobXNnLCBhY3R1YWwsIGV4cGVjdGVkLCAnPCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRMZXNzVGhhbk9yRXF1YWw8VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpOiBhc3NlcnRzIGFjdHVhbCBpcyBUIHtcbiAgaWYgKCEoYWN0dWFsIDw9IGV4cGVjdGVkKSkge1xuICAgIHRocm93RXJyb3IobXNnLCBhY3R1YWwsIGV4cGVjdGVkLCAnPD0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0R3JlYXRlclRoYW48VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpOiBhc3NlcnRzIGFjdHVhbCBpcyBUIHtcbiAgaWYgKCEoYWN0dWFsID4gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc+Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEdyZWF0ZXJUaGFuT3JFcXVhbDxUPihcbiAgICBhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIFQge1xuICBpZiAoIShhY3R1YWwgPj0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc+PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3REZWZpbmVkPFQ+KGFjdHVhbDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCAhPSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgbnVsbCwgJz09Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERlZmluZWQ8VD4oYWN0dWFsOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsID09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBudWxsLCAnIT0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dFcnJvcihtc2c6IHN0cmluZyk6IG5ldmVyO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IobXNnOiBzdHJpbmcsIGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55LCBjb21wYXJpc29uOiBzdHJpbmcpOiBuZXZlcjtcbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0Vycm9yKG1zZzogc3RyaW5nLCBhY3R1YWw/OiBhbnksIGV4cGVjdGVkPzogYW55LCBjb21wYXJpc29uPzogc3RyaW5nKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQVNTRVJUSU9OIEVSUk9SOiAke21zZ31gICtcbiAgICAgIChjb21wYXJpc29uID09IG51bGwgPyAnJyA6IGAgW0V4cGVjdGVkPT4gJHtleHBlY3RlZH0gJHtjb21wYXJpc29ufSAke2FjdHVhbH0gPD1BY3R1YWxdYCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RG9tTm9kZShub2RlOiBhbnkpOiBhc3NlcnRzIG5vZGUgaXMgTm9kZSB7XG4gIC8vIElmIHdlJ3JlIGluIGEgd29ya2VyLCBgTm9kZWAgd2lsbCBub3QgYmUgZGVmaW5lZC5cbiAgYXNzZXJ0RXF1YWwoXG4gICAgICAodHlwZW9mIE5vZGUgIT09ICd1bmRlZmluZWQnICYmIG5vZGUgaW5zdGFuY2VvZiBOb2RlKSB8fFxuICAgICAgICAgICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiYgbm9kZSAhPSBudWxsICYmXG4gICAgICAgICAgIG5vZGUuY29uc3RydWN0b3IubmFtZSA9PT0gJ1dlYldvcmtlclJlbmRlck5vZGUnKSxcbiAgICAgIHRydWUsIGBUaGUgcHJvdmlkZWQgdmFsdWUgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBhIERPTSBOb2RlIGJ1dCBnb3QgJHtzdHJpbmdpZnkobm9kZSl9YCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERhdGFJblJhbmdlKGFycjogYW55W10sIGluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgbWF4TGVuID0gYXJyID8gYXJyLmxlbmd0aCA6IDA7XG4gIGFzc2VydExlc3NUaGFuKGluZGV4LCBtYXhMZW4sIGBJbmRleCBleHBlY3RlZCB0byBiZSBsZXNzIHRoYW4gJHttYXhMZW59IGJ1dCBnb3QgJHtpbmRleH1gKTtcbn1cbiJdfQ==