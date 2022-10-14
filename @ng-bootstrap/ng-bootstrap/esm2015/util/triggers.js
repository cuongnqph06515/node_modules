import { Observable, merge } from 'rxjs';
import { share, filter, delay, map } from 'rxjs/operators';
export class Trigger {
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
export function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
export function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable(subscriber => {
        const listeners = [];
        const openFn = () => subscriber.next(true);
        const closeFn = () => subscriber.next(false);
        const toggleFn = () => subscriber.next(!isOpenedFn());
        triggers.forEach((trigger) => {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        });
        return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
    });
}
const delayOrNoop = (time) => time > 0 ? delay(time) : (a) => a;
const ɵ0 = delayOrNoop;
export function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return (input$) => {
        let pending = null;
        const filteredInput$ = input$.pipe(map(open => ({ open })), filter(event => {
            const currentlyOpen = isOpenedFn();
            if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                pending = event;
                return true;
            }
            if (pending && pending.open !== event.open) {
                pending = null;
            }
            return false;
        }), share());
        const delayedOpen$ = filteredInput$.pipe(filter(event => event.open), delayOrNoop(openDelay));
        const delayedClose$ = filteredInput$.pipe(filter(event => !event.open), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter(event => {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        }), map(event => event.open));
    };
}
export function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay = 0, closeDelay = 0) {
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return () => { };
    }
    const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe(open => (open ? openFn() : closeFn()));
    return () => subscription.unsubscribe();
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvdHJpZ2dlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3pELE1BQU0sT0FBTyxPQUFPO0lBQ2xCLFlBQW1CLElBQVksRUFBUyxLQUFjO1FBQW5DLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ3BELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRCxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Q0FDekU7QUFFRCxNQUFNLGVBQWUsR0FBRztJQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7Q0FDakMsQ0FBQztBQUVGLE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBZ0IsRUFBRSxPQUFPLEdBQUcsZUFBZTtJQUN2RSxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVoRCxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENB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Q0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBbUIsRUFBRSxhQUEwQixFQUFFLFFBQWdCLEVBQUUsVUFBeUIsRUFBRSxNQUFnQixFQUM5RyxPQUFpQixFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDbEQsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9DLElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQy9ELE9BQU8sR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBQ2pCO0lBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztTQUMvRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDckQsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0UsT0FBTyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgbWVyZ2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzaGFyZSwgZmlsdGVyLCBkZWxheSwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1JlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XG4gICAgaWYgKCFjbG9zZSkge1xuICAgICAgdGhpcy5jbG9zZSA9IG9wZW47XG4gICAgfVxuICB9XG5cbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XG59XG5cbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcbiAgJ2hvdmVyJzogWydtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnXSxcbiAgJ2ZvY3VzJzogWydmb2N1c2luJywgJ2ZvY3Vzb3V0J10sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vyczogc3RyaW5nLCBhbGlhc2VzID0gREVGQVVMVF9BTElBU0VTKTogVHJpZ2dlcltdIHtcbiAgY29uc3QgdHJpbW1lZFRyaWdnZXJzID0gKHRyaWdnZXJzIHx8ICcnKS50cmltKCk7XG5cbiAgaWYgKHRyaW1tZWRUcmlnZ2Vycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHRyaW1tZWRUcmlnZ2Vycy5zcGxpdCgvXFxzKy8pLm1hcCh0cmlnZ2VyID0+IHRyaWdnZXIuc3BsaXQoJzonKSkubWFwKCh0cmlnZ2VyUGFpcikgPT4ge1xuICAgIGxldCBhbGlhcyA9IGFsaWFzZXNbdHJpZ2dlclBhaXJbMF1dIHx8IHRyaWdnZXJQYWlyO1xuICAgIHJldHVybiBuZXcgVHJpZ2dlcihhbGlhc1swXSwgYWxpYXNbMV0pO1xuICB9KTtcblxuICBjb25zdCBtYW51YWxUcmlnZ2VycyA9IHBhcnNlZFRyaWdnZXJzLmZpbHRlcih0cmlnZ2VyUGFpciA9PiB0cmlnZ2VyUGFpci5pc01hbnVhbCgpKTtcblxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID4gMSkge1xuICAgIHRocm93ICdUcmlnZ2VycyBwYXJzZSBlcnJvcjogb25seSBvbmUgbWFudWFsIHRyaWdnZXIgaXMgYWxsb3dlZCc7XG4gIH1cblxuICBpZiAobWFudWFsVHJpZ2dlcnMubGVuZ3RoID09PSAxICYmIHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG1hbnVhbCB0cmlnZ2VyIGNhblxcJ3QgYmUgbWl4ZWQgd2l0aCBvdGhlciB0cmlnZ2Vycyc7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkVHJpZ2dlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlVHJpZ2dlcnMoXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMiwgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQsIHRyaWdnZXJzOiBUcmlnZ2VyW10sIGlzT3BlbmVkRm46ICgpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KHN1YnNjcmliZXIgPT4ge1xuICAgIGNvbnN0IGxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICAgIGNvbnN0IG9wZW5GbiA9ICgpID0+IHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICBjb25zdCBjbG9zZUZuID0gKCkgPT4gc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICBjb25zdCB0b2dnbGVGbiA9ICgpID0+IHN1YnNjcmliZXIubmV4dCghaXNPcGVuZWRGbigpKTtcblxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXI6IFRyaWdnZXIpID0+IHtcbiAgICAgIGlmICh0cmlnZ2VyLm9wZW4gPT09IHRyaWdnZXIuY2xvc2UpIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gocmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3BlbiwgdG9nZ2xlRm4pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3Blbiwgb3BlbkZuKSxcbiAgICAgICAgICAgIHJlbmRlcmVyLmxpc3RlbihuYXRpdmVFbGVtZW50LCB0cmlnZ2VyLmNsb3NlICEsIGNsb3NlRm4pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcbiAgfSk7XG59XG5cbmNvbnN0IGRlbGF5T3JOb29wID0gPFQ+KHRpbWU6IG51bWJlcikgPT4gdGltZSA+IDAgPyBkZWxheTxUPih0aW1lKSA6IChhOiBPYnNlcnZhYmxlPFQ+KSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckRlbGF5KG9wZW5EZWxheTogbnVtYmVyLCBjbG9zZURlbGF5OiBudW1iZXIsIGlzT3BlbmVkRm46ICgpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIChpbnB1dCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4pID0+IHtcbiAgICBsZXQgcGVuZGluZzoge29wZW46IGJvb2xlYW59IHwgbnVsbCA9IG51bGw7XG4gICAgY29uc3QgZmlsdGVyZWRJbnB1dCQgPSBpbnB1dCQucGlwZShcbiAgICAgICAgbWFwKG9wZW4gPT4gKHtvcGVufSkpLCBmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRseU9wZW4gPSBpc09wZW5lZEZuKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRseU9wZW4gIT09IGV2ZW50Lm9wZW4gJiYgKCFwZW5kaW5nIHx8IHBlbmRpbmcub3BlbiA9PT0gY3VycmVudGx5T3BlbikpIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGVuZGluZyAmJiBwZW5kaW5nLm9wZW4gIT09IGV2ZW50Lm9wZW4pIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpKTtcbiAgICBjb25zdCBkZWxheWVkT3BlbiQgPSBmaWx0ZXJlZElucHV0JC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5vcGVuKSwgZGVsYXlPck5vb3Aob3BlbkRlbGF5KSk7XG4gICAgY29uc3QgZGVsYXllZENsb3NlJCA9IGZpbHRlcmVkSW5wdXQkLnBpcGUoZmlsdGVyKGV2ZW50ID0+ICFldmVudC5vcGVuKSwgZGVsYXlPck5vb3AoY2xvc2VEZWxheSkpO1xuICAgIHJldHVybiBtZXJnZShkZWxheWVkT3BlbiQsIGRlbGF5ZWRDbG9zZSQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09PSBwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50Lm9wZW4gIT09IGlzT3BlbmVkRm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcChldmVudCA9PiBldmVudC5vcGVuKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsIG5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0cmlnZ2Vyczogc3RyaW5nLCBpc09wZW5lZEZuOiAoKSA9PiBib29sZWFuLCBvcGVuRm46IEZ1bmN0aW9uLFxuICAgIGNsb3NlRm46IEZ1bmN0aW9uLCBvcGVuRGVsYXkgPSAwLCBjbG9zZURlbGF5ID0gMCkge1xuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHBhcnNlVHJpZ2dlcnModHJpZ2dlcnMpO1xuXG4gIGlmIChwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPT09IDEgJiYgcGFyc2VkVHJpZ2dlcnNbMF0uaXNNYW51YWwoKSkge1xuICAgIHJldHVybiAoKSA9PiB7fTtcbiAgfVxuXG4gIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG9ic2VydmVUcmlnZ2VycyhyZW5kZXJlciwgbmF0aXZlRWxlbWVudCwgcGFyc2VkVHJpZ2dlcnMsIGlzT3BlbmVkRm4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0cmlnZ2VyRGVsYXkob3BlbkRlbGF5LCBjbG9zZURlbGF5LCBpc09wZW5lZEZuKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUob3BlbiA9PiAob3BlbiA/IG9wZW5GbigpIDogY2xvc2VGbigpKSk7XG5cbiAgcmV0dXJuICgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xufVxuIl19