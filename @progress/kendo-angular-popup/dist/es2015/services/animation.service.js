/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, isDevMode, EventEmitter } from '@angular/core';
import { animate, style, AnimationBuilder } from '@angular/animations';
const LEFT = 'left';
const RIGHT = 'right';
const DOWN = 'down';
const UP = 'up';
const DEFAULT_TYPE = 'slide';
const DEFAULT_DURATION = 100;
const animationTypes = {};
/* tslint:disable:object-literal-sort-keys */
animationTypes.expand = (direction) => {
    const scale = direction === UP || direction === DOWN ? 'scaleY' : 'scaleX';
    const startScale = 0;
    const endScale = 1;
    let origin;
    if (direction === DOWN) {
        origin = 'top';
    }
    else if (direction === LEFT) {
        origin = RIGHT;
    }
    else if (direction === RIGHT) {
        origin = LEFT;
    }
    else {
        origin = 'bottom';
    }
    return {
        start: { transform: `${scale}(${startScale})`, transformOrigin: origin },
        end: { transform: `${scale}(${endScale})` }
    };
};
animationTypes.slide = (direction) => {
    const translate = direction === LEFT || direction === RIGHT ? 'translateX' : 'translateY';
    const start = direction === RIGHT || direction === DOWN ? -100 : 100;
    const end = 0;
    return {
        start: { transform: `${translate}(${start}%)` },
        end: { transform: `${translate}(${end}%)` }
    };
};
animationTypes.fade = () => {
    return {
        start: { opacity: 0 },
        end: { opacity: 1 }
    };
};
animationTypes.zoom = () => {
    const start = 0;
    const end = 1;
    return {
        start: { transform: `scale(${start})` },
        end: { transform: `scale(${end})` }
    };
};
/**
 * @hidden
 */
export class AnimationService {
    constructor(animationBuilder) {
        this.animationBuilder = animationBuilder;
        this.start = new EventEmitter();
        this.end = new EventEmitter();
    }
    play(element, options, flip) {
        if (!this.flip || this.flip.horizontal !== flip.horizontal ||
            this.flip.vertical !== flip.vertical) {
            this.flip = flip;
            const type = options.type || DEFAULT_TYPE;
            const statesFn = animationTypes[type];
            if (statesFn) {
                const direction = this.getDirection(flip, options);
                const states = statesFn(direction);
                this.playStates(element, states, options);
            }
            else if (isDevMode()) {
                throw new Error(`Unsupported animation type: "${type}". The supported types are slide, expand, fade and zoom.`);
            }
        }
    }
    ngOnDestroy() {
        this.stopPlayer();
    }
    playStates(element, states, options) {
        this.stopPlayer();
        const duration = options.duration || DEFAULT_DURATION;
        const factory = this.animationBuilder.build([
            style(states.start),
            animate(`${duration}ms ease-in`, style(states.end))
        ]);
        const player = this.player = factory.create(element);
        player.onDone(() => {
            this.end.emit();
            this.stopPlayer();
        });
        this.start.emit();
        player.play();
    }
    getDirection(flip, options) {
        let direction = options.direction || DOWN;
        if (flip.horizontal) {
            if (direction === LEFT) {
                direction = RIGHT;
            }
            else if (direction === RIGHT) {
                direction = LEFT;
            }
        }
        if (flip.vertical) {
            if (direction === DOWN) {
                direction = UP;
            }
            else if (direction === UP) {
                direction = DOWN;
            }
        }
        return direction;
    }
    stopPlayer() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    }
}
AnimationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AnimationService.ctorParameters = () => [
    { type: AnimationBuilder }
];
