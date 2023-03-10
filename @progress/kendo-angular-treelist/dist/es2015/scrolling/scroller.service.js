/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable, BehaviorSubject } from 'rxjs';
/**
 * @hidden
 */
export class ScrollAction {
    constructor(offset) {
        this.offset = offset;
    }
}
/**
 * @hidden
 */
export class PageAction {
    constructor(skip, take) {
        this.skip = skip;
        this.take = take;
    }
}
/**
 * @hidden
 */
export class ScrollBottomAction {
}
const SCROLL_BOTTOM_THRESHOLD = 1;
/**
 * @hidden
 */
export class ScrollerService {
    constructor(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
    }
    create(rowHeightService, skip, take, total) {
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take;
        this.take = take;
        this.total = total;
        this.lastScrollTop = 0;
        const subject = new BehaviorSubject(new ScrollAction(this.rowHeightService.offset(skip)));
        this.subscription = Observable.create(observer => {
            this.unsubscribe();
            this.scrollSubscription = this.scrollObservable.subscribe(x => this.onScroll(x, observer));
        }).subscribe(x => subject.next(x));
        return subject;
    }
    destroy() {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    onScroll({ scrollTop, offsetHeight, scrollHeight, clientHeight }, observer) {
        if (this.lastScrollTop === scrollTop) {
            return;
        }
        const up = this.lastScrollTop >= scrollTop;
        this.lastScrollTop = scrollTop;
        let firstItemIndex = this.rowHeightService.index(scrollTop);
        let firstItemOffset = this.rowHeightService.offset(firstItemIndex);
        const lastItemIndex = this.rowHeightService.index(scrollTop + offsetHeight);
        if (!up) {
            if (lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
                const overflow = (firstItemIndex + this.take) - this.total;
                if (overflow > 0) {
                    firstItemIndex = firstItemIndex - overflow;
                    firstItemOffset = this.rowHeightService.offset(firstItemIndex);
                }
                this.firstLoaded = firstItemIndex;
                observer.next(new ScrollAction(firstItemOffset));
                let nextTake = this.firstLoaded + this.take;
                this.lastLoaded = Math.min(nextTake, this.total);
                nextTake = nextTake > this.total ? this.total - this.firstLoaded : this.take;
                observer.next(new PageAction(this.firstLoaded, this.take));
            }
            else {
                const atBottom = scrollHeight - clientHeight - scrollTop < SCROLL_BOTTOM_THRESHOLD;
                if (atBottom) {
                    observer.next(new ScrollBottomAction());
                }
            }
        }
        if (up && firstItemIndex < this.firstLoaded) {
            const nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = Math.max(firstItemIndex - nonVisibleBuffer, 0);
            observer.next(new ScrollAction(this.rowHeightService.offset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded, this.take));
        }
    }
    unsubscribe() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = undefined;
        }
    }
}
