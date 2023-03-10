/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, isDevMode, EventEmitter } from '@angular/core';
import { animate, style, AnimationBuilder } from '@angular/animations';
var LEFT = 'left';
var RIGHT = 'right';
var DOWN = 'down';
var UP = 'up';
var DEFAULT_TYPE = 'slide';
var DEFAULT_DURATION = 100;
var animationTypes = {};
/* tslint:disable:object-literal-sort-keys */
animationTypes.expand = function (direction) {
    var scale = direction === UP || direction === DOWN ? 'scaleY' : 'scaleX';
    var startScale = 0;
    var endScale = 1;
    var origin;
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
        start: { transform: scale + "(" + startScale + ")", transformOrigin: origin },
        end: { transform: scale + "(" + endScale + ")" }
    };
};
animationTypes.slide = function (direction) {
    var translate = direction === LEFT || direction === RIGHT ? 'translateX' : 'translateY';
    var start = direction === RIGHT || direction === DOWN ? -100 : 100;
    var end = 0;
    return {
        start: { transform: translate + "(" + start + "%)" },
        end: { transform: translate + "(" + end + "%)" }
    };
};
animationTypes.fade = function () {
    return {
        start: { opacity: 0 },
        end: { opacity: 1 }
    };
};
animationTypes.zoom = function () {
    var start = 0;
    var end = 1;
    return {
        start: { transform: "scale(" + start + ")" },
        end: { transform: "scale(" + end + ")" }
    };
};
/**
 * @hidden
 */
var AnimationService = /** @class */ (function () {
    function AnimationService(animationBuilder) {
        this.animationBuilder = animationBuilder;
        this.start = new EventEmitter();
        this.end = new EventEmitter();
    }
    AnimationService.prototype.play = function (element, options, flip) {
        if (!this.flip || this.flip.horizontal !== flip.horizontal ||
            this.flip.vertical !== flip.vertical) {
            this.flip = flip;
            var type = options.type || DEFAULT_TYPE;
            var statesFn = animationTypes[type];
            if (statesFn) {
                var direction = this.getDirection(flip, options);
                var states = statesFn(direction);
                this.playStates(element, states, options);
            }
            else if (isDevMode()) {
                throw new Error("Unsupported animation type: \"" + type + "\". The supported types are slide, expand, fade and zoom.");
            }
        }
    };
    AnimationService.prototype.ngOnDestroy = function () {
        this.stopPlayer();
    };
    AnimationService.prototype.playStates = function (element, states, options) {
        var _this = this;
        this.stopPlayer();
        var duration = options.duration || DEFAULT_DURATION;
        var factory = this.animationBuilder.build([
            style(states.start),
            animate(duration + "ms ease-in", style(states.end))
        ]);
        var player = this.player = factory.create(element);
        player.onDone(function () {
            _this.end.emit();
            _this.stopPlayer();
        });
        this.start.emit();
        player.play();
    };
    AnimationService.prototype.getDirection = function (flip, options) {
        var direction = options.direction || DOWN;
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
    };
    AnimationService.prototype.stopPlayer = function () {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    };
    AnimationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AnimationService.ctorParameters = function () { return [
        { type: AnimationBuilder }
    ]; };
    return AnimationService;
}());
export { AnimationService };
