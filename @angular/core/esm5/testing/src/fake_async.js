/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { discardPeriodicTasksFallback, fakeAsyncFallback, flushFallback, flushMicrotasksFallback, resetFakeAsyncZoneFallback, tickFallback } from './fake_async_fallback';
var _Zone = typeof Zone !== 'undefined' ? Zone : null;
var fakeAsyncTestModule = _Zone && _Zone[_Zone.__symbol__('fakeAsyncTest')];
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @publicApi
 */
export function resetFakeAsyncZone() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.resetFakeAsyncZone();
    }
    else {
        return resetFakeAsyncZoneFallback();
    }
}
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns The function wrapped to be executed in the fakeAsync zone
 *
 * @publicApi
 */
export function fakeAsync(fn) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.fakeAsync(fn);
    }
    else {
        return fakeAsyncFallback(fn);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param millis, the number of millisecond to advance the virtual timer
 * @param tickOptions, the options of tick with a flag called
 * processNewMacroTasksSynchronously, whether to invoke the new macroTasks, by default is
 * false, means the new macroTasks will be invoked
 *
 * For example,
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick();
 *   expect(nestedTimeoutInvoked).toBe(true);
 * }));
 *
 * in this case, we have a nested timeout (new macroTask), when we tick, both the
 * funcWithNestedTimeout and the nested timeout both will be invoked.
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick(0, {processNewMacroTasksSynchronously: false});
 *   expect(nestedTimeoutInvoked).toBe(false);
 * }));
 *
 * if we pass the tickOptions with processNewMacroTasksSynchronously to be false, the nested timeout
 * will not be invoked.
 *
 *
 * @publicApi
 */
export function tick(millis, tickOptions) {
    if (millis === void 0) { millis = 0; }
    if (tickOptions === void 0) { tickOptions = {
        processNewMacroTasksSynchronously: true
    }; }
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.tick(millis, tickOptions);
    }
    else {
        return tickFallback(millis, tickOptions);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * @param maxTurns
 * @returns The simulated time elapsed, in millis.
 *
 * @publicApi
 */
export function flush(maxTurns) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flush(maxTurns);
    }
    else {
        return flushFallback(maxTurns);
    }
}
/**
 * Discard all remaining periodic tasks.
 *
 * @publicApi
 */
export function discardPeriodicTasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.discardPeriodicTasks();
    }
    else {
        discardPeriodicTasksFallback();
    }
}
/**
 * Flush any pending microtasks.
 *
 * @publicApi
 */
export function flushMicrotasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flushMicrotasks();
    }
    else {
        return flushMicrotasksFallback();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvZmFrZV9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsNEJBQTRCLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXhLLElBQU0sS0FBSyxHQUFRLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0QsSUFBTSxtQkFBbUIsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUU5RTs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDakQ7U0FBTTtRQUNMLE9BQU8sMEJBQTBCLEVBQUUsQ0FBQztLQUNyQztBQUNILENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFZO0lBQ3BDLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNMLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUI7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBQ0gsTUFBTSxVQUFVLElBQUksQ0FDaEIsTUFBa0IsRUFBRSxXQUVuQjtJQUZELHVCQUFBLEVBQUEsVUFBa0I7SUFBRSw0QkFBQSxFQUFBO1FBQ2xCLGlDQUFpQyxFQUFFLElBQUk7S0FDeEM7SUFDSCxJQUFJLG1CQUFtQixFQUFFO1FBQ3ZCLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUN0RDtTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQzFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUMsUUFBaUI7SUFDckMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBQ0wsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLG9CQUFvQixFQUFFLENBQUM7S0FDbkQ7U0FBTTtRQUNMLDRCQUE0QixFQUFFLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlO0lBQzdCLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUM5QztTQUFNO1FBQ0wsT0FBTyx1QkFBdUIsRUFBRSxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7ZGlzY2FyZFBlcmlvZGljVGFza3NGYWxsYmFjaywgZmFrZUFzeW5jRmFsbGJhY2ssIGZsdXNoRmFsbGJhY2ssIGZsdXNoTWljcm90YXNrc0ZhbGxiYWNrLCByZXNldEZha2VBc3luY1pvbmVGYWxsYmFjaywgdGlja0ZhbGxiYWNrfSBmcm9tICcuL2Zha2VfYXN5bmNfZmFsbGJhY2snO1xuXG5jb25zdCBfWm9uZTogYW55ID0gdHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnID8gWm9uZSA6IG51bGw7XG5jb25zdCBmYWtlQXN5bmNUZXN0TW9kdWxlID0gX1pvbmUgJiYgX1pvbmVbX1pvbmUuX19zeW1ib2xfXygnZmFrZUFzeW5jVGVzdCcpXTtcblxuLyoqXG4gKiBDbGVhcnMgb3V0IHRoZSBzaGFyZWQgZmFrZSBhc3luYyB6b25lIGZvciBhIHRlc3QuXG4gKiBUbyBiZSBjYWxsZWQgaW4gYSBnbG9iYWwgYGJlZm9yZUVhY2hgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RmFrZUFzeW5jWm9uZSgpOiB2b2lkIHtcbiAgaWYgKGZha2VBc3luY1Rlc3RNb2R1bGUpIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jVGVzdE1vZHVsZS5yZXNldEZha2VBc3luY1pvbmUoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVzZXRGYWtlQXN5bmNab25lRmFsbGJhY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGZha2VBc3luYyB6b25lOlxuICogLSBtaWNyb3Rhc2tzIGFyZSBtYW51YWxseSBleGVjdXRlZCBieSBjYWxsaW5nIGBmbHVzaE1pY3JvdGFza3MoKWAsXG4gKiAtIHRpbWVycyBhcmUgc3luY2hyb25vdXMsIGB0aWNrKClgIHNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZS5cbiAqXG4gKiBJZiB0aGVyZSBhcmUgYW55IHBlbmRpbmcgdGltZXJzIGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uLCBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQ2FuIGJlIHVzZWQgdG8gd3JhcCBpbmplY3QoKSBjYWxscy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gKlxuICogQHBhcmFtIGZuXG4gKiBAcmV0dXJucyBUaGUgZnVuY3Rpb24gd3JhcHBlZCB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmVcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWtlQXN5bmMoZm46IEZ1bmN0aW9uKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmZha2VBc3luYyhmbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZha2VBc3luY0ZhbGxiYWNrKGZuKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUuXG4gKlxuICogVGhlIG1pY3JvdGFza3MgcXVldWUgaXMgZHJhaW5lZCBhdCB0aGUgdmVyeSBzdGFydCBvZiB0aGlzIGZ1bmN0aW9uIGFuZCBhZnRlciBhbnkgdGltZXIgY2FsbGJhY2tcbiAqIGhhcyBiZWVuIGV4ZWN1dGVkLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3Rlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J2Jhc2ljJ31cbiAqXG4gKiBAcGFyYW0gbWlsbGlzLCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kIHRvIGFkdmFuY2UgdGhlIHZpcnR1YWwgdGltZXJcbiAqIEBwYXJhbSB0aWNrT3B0aW9ucywgdGhlIG9wdGlvbnMgb2YgdGljayB3aXRoIGEgZmxhZyBjYWxsZWRcbiAqIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseSwgd2hldGhlciB0byBpbnZva2UgdGhlIG5ldyBtYWNyb1Rhc2tzLCBieSBkZWZhdWx0IGlzXG4gKiBmYWxzZSwgbWVhbnMgdGhlIG5ldyBtYWNyb1Rhc2tzIHdpbGwgYmUgaW52b2tlZFxuICpcbiAqIEZvciBleGFtcGxlLFxuICpcbiAqIGl0ICgndGVzdCB3aXRoIG5lc3RlZCBzZXRUaW1lb3V0JywgZmFrZUFzeW5jKCgpID0+IHtcbiAqICAgbGV0IG5lc3RlZFRpbWVvdXRJbnZva2VkID0gZmFsc2U7XG4gKiAgIGZ1bmN0aW9uIGZ1bmNXaXRoTmVzdGVkVGltZW91dCgpIHtcbiAqICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgIG5lc3RlZFRpbWVvdXRJbnZva2VkID0gdHJ1ZTtcbiAqICAgICB9KTtcbiAqICAgfTtcbiAqICAgc2V0VGltZW91dChmdW5jV2l0aE5lc3RlZFRpbWVvdXQpO1xuICogICB0aWNrKCk7XG4gKiAgIGV4cGVjdChuZXN0ZWRUaW1lb3V0SW52b2tlZCkudG9CZSh0cnVlKTtcbiAqIH0pKTtcbiAqXG4gKiBpbiB0aGlzIGNhc2UsIHdlIGhhdmUgYSBuZXN0ZWQgdGltZW91dCAobmV3IG1hY3JvVGFzayksIHdoZW4gd2UgdGljaywgYm90aCB0aGVcbiAqIGZ1bmNXaXRoTmVzdGVkVGltZW91dCBhbmQgdGhlIG5lc3RlZCB0aW1lb3V0IGJvdGggd2lsbCBiZSBpbnZva2VkLlxuICpcbiAqIGl0ICgndGVzdCB3aXRoIG5lc3RlZCBzZXRUaW1lb3V0JywgZmFrZUFzeW5jKCgpID0+IHtcbiAqICAgbGV0IG5lc3RlZFRpbWVvdXRJbnZva2VkID0gZmFsc2U7XG4gKiAgIGZ1bmN0aW9uIGZ1bmNXaXRoTmVzdGVkVGltZW91dCgpIHtcbiAqICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgICAgIG5lc3RlZFRpbWVvdXRJbnZva2VkID0gdHJ1ZTtcbiAqICAgICB9KTtcbiAqICAgfTtcbiAqICAgc2V0VGltZW91dChmdW5jV2l0aE5lc3RlZFRpbWVvdXQpO1xuICogICB0aWNrKDAsIHtwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHk6IGZhbHNlfSk7XG4gKiAgIGV4cGVjdChuZXN0ZWRUaW1lb3V0SW52b2tlZCkudG9CZShmYWxzZSk7XG4gKiB9KSk7XG4gKlxuICogaWYgd2UgcGFzcyB0aGUgdGlja09wdGlvbnMgd2l0aCBwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHkgdG8gYmUgZmFsc2UsIHRoZSBuZXN0ZWQgdGltZW91dFxuICogd2lsbCBub3QgYmUgaW52b2tlZC5cbiAqXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGljayhcbiAgICBtaWxsaXM6IG51bWJlciA9IDAsIHRpY2tPcHRpb25zOiB7cHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5OiBib29sZWFufSA9IHtcbiAgICAgIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseTogdHJ1ZVxuICAgIH0pOiB2b2lkIHtcbiAgaWYgKGZha2VBc3luY1Rlc3RNb2R1bGUpIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jVGVzdE1vZHVsZS50aWNrKG1pbGxpcywgdGlja09wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aWNrRmFsbGJhY2sobWlsbGlzLCB0aWNrT3B0aW9ucyk7XG4gIH1cbn1cblxuLyoqXG4gKiBTaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUgZm9yIHRoZSB0aW1lcnMgaW4gdGhlIGZha2VBc3luYyB6b25lIGJ5XG4gKiBkcmFpbmluZyB0aGUgbWFjcm90YXNrIHF1ZXVlIHVudGlsIGl0IGlzIGVtcHR5LiBUaGUgcmV0dXJuZWQgdmFsdWUgaXMgdGhlIG1pbGxpc2Vjb25kc1xuICogb2YgdGltZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiBlbGFwc2VkLlxuICpcbiAqIEBwYXJhbSBtYXhUdXJuc1xuICogQHJldHVybnMgVGhlIHNpbXVsYXRlZCB0aW1lIGVsYXBzZWQsIGluIG1pbGxpcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaChtYXhUdXJucz86IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChmYWtlQXN5bmNUZXN0TW9kdWxlKSB7XG4gICAgcmV0dXJuIGZha2VBc3luY1Rlc3RNb2R1bGUuZmx1c2gobWF4VHVybnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbHVzaEZhbGxiYWNrKG1heFR1cm5zKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc2NhcmQgYWxsIHJlbWFpbmluZyBwZXJpb2RpYyB0YXNrcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNjYXJkUGVyaW9kaWNUYXNrcygpOiB2b2lkIHtcbiAgaWYgKGZha2VBc3luY1Rlc3RNb2R1bGUpIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jVGVzdE1vZHVsZS5kaXNjYXJkUGVyaW9kaWNUYXNrcygpO1xuICB9IGVsc2Uge1xuICAgIGRpc2NhcmRQZXJpb2RpY1Rhc2tzRmFsbGJhY2soKTtcbiAgfVxufVxuXG4vKipcbiAqIEZsdXNoIGFueSBwZW5kaW5nIG1pY3JvdGFza3MuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzKCk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmZsdXNoTWljcm90YXNrcygpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbHVzaE1pY3JvdGFza3NGYWxsYmFjaygpO1xuICB9XG59XG4iXX0=