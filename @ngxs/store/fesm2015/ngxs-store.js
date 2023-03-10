import { NgZone, Injectable, Inject, PLATFORM_ID, InjectionToken, Optional, SkipSelf, ErrorHandler, Injector, isDevMode, NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { memoize, INITIAL_STATE_TOKEN, NgxsBootstrapper, isAngularInTestMode, NGXS_STATE_CONTEXT_FACTORY, NGXS_STATE_FACTORY, InitialState } from '@ngxs/store/internals';
import { isPlatformServer } from '@angular/common';
import { Observable, Subject, BehaviorSubject, of, forkJoin, throwError, EMPTY, from, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, take, exhaustMap, mergeMap, defaultIfEmpty, catchError, takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const VALIDATION_CODE = {
    STATE_NAME: 'STATE_NAME',
    STATE_UNIQUE: 'STATE_UNIQUE',
    STATE_NAME_PROPERTY: 'STATE_NAME_PROPERTY',
    STATE_DECORATOR: 'STATE_DECORATOR',
    INCORRECT_PRODUCTION: 'INCORRECT_PRODUCTION',
    INCORRECT_DEVELOPMENT: 'INCORRECT_DEVELOPMENT',
    SELECT_FACTORY_NOT_CONNECTED: 'SELECT_FACTORY_NOT_CONNECTED',
    ACTION_DECORATOR: 'ACTION_DECORATOR',
    SELECTOR_DECORATOR: 'SELECTOR_DECORATOR',
    ZONE_WARNING: 'ZONE_WARNING',
    PATCHING_ARRAY: 'PATCHING_ARRAY',
    PATCHING_PRIMITIVE: 'PATCHING_PRIMITIVE',
    UNDECORATED_STATE_IN_IVY: 'UNDECORATED_STATE_IN_IVY',
};
/** @type {?} */
const CONFIG_MESSAGES = {
    [VALIDATION_CODE.STATE_NAME]: (/**
     * @param {?} name
     * @return {?}
     */
    (name) => `${name} is not a valid state name. It needs to be a valid object property name.`),
    [VALIDATION_CODE.STATE_NAME_PROPERTY]: (/**
     * @return {?}
     */
    () => `States must register a 'name' property`),
    [VALIDATION_CODE.STATE_UNIQUE]: (/**
     * @param {?} current
     * @param {?} newName
     * @param {?} oldName
     * @return {?}
     */
    (current, newName, oldName) => `State name '${current}' from ${newName} already exists in ${oldName}`),
    [VALIDATION_CODE.STATE_DECORATOR]: (/**
     * @return {?}
     */
    () => 'States must be decorated with @State() decorator'),
    [VALIDATION_CODE.INCORRECT_PRODUCTION]: (/**
     * @return {?}
     */
    () => 'Angular is running in production mode but NGXS is still running in the development mode!\n' +
        'Please set developmentMode to false on the NgxsModule options when in production mode.\n' +
        'NgxsModule.forRoot(states, { developmentMode: !environment.production })'),
    [VALIDATION_CODE.INCORRECT_DEVELOPMENT]: (/**
     * @return {?}
     */
    () => 'RECOMMENDATION: Set developmentMode to true on the NgxsModule when Angular is running in development mode.\n' +
        'NgxsModule.forRoot(states, { developmentMode: !environment.production })'),
    [VALIDATION_CODE.SELECT_FACTORY_NOT_CONNECTED]: (/**
     * @return {?}
     */
    () => 'You have forgotten to import the NGXS module!'),
    [VALIDATION_CODE.ACTION_DECORATOR]: (/**
     * @return {?}
     */
    () => '@Action() decorator cannot be used with static methods'),
    [VALIDATION_CODE.SELECTOR_DECORATOR]: (/**
     * @return {?}
     */
    () => 'Selectors only work on methods'),
    [VALIDATION_CODE.ZONE_WARNING]: (/**
     * @return {?}
     */
    () => 'Your application was bootstrapped with nooped zone and your execution strategy requires an actual NgZone!\n' +
        'Please set the value of the executionStrategy property to NoopNgxsExecutionStrategy.\n' +
        'NgxsModule.forRoot(states, { executionStrategy: NoopNgxsExecutionStrategy })'),
    [VALIDATION_CODE.PATCHING_ARRAY]: (/**
     * @return {?}
     */
    () => 'Patching arrays is not supported.'),
    [VALIDATION_CODE.PATCHING_PRIMITIVE]: (/**
     * @return {?}
     */
    () => 'Patching primitives is not supported.'),
    [VALIDATION_CODE.UNDECORATED_STATE_IN_IVY]: (/**
     * @param {?} name
     * @return {?}
     */
    (name) => `'${name}' class should be decorated with @Injectable() right after the @State() decorator`)
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DispatchOutsideZoneNgxsExecutionStrategy {
    /**
     * @param {?} _ngZone
     * @param {?} _platformId
     */
    constructor(_ngZone, _platformId) {
        this._ngZone = _ngZone;
        this._platformId = _platformId;
        this.verifyZoneIsNotNooped(this._ngZone);
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    enter(func) {
        if (isPlatformServer(this._platformId)) {
            return this.runInsideAngular(func);
        }
        return this.runOutsideAngular(func);
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    leave(func) {
        return this.runInsideAngular(func);
    }
    /**
     * @private
     * @template T
     * @param {?} func
     * @return {?}
     */
    runInsideAngular(func) {
        if (NgZone.isInAngularZone()) {
            return func();
        }
        return this._ngZone.run(func);
    }
    /**
     * @private
     * @template T
     * @param {?} func
     * @return {?}
     */
    runOutsideAngular(func) {
        if (NgZone.isInAngularZone()) {
            return this._ngZone.runOutsideAngular(func);
        }
        return func();
    }
    /**
     * @private
     * @param {?} ngZone
     * @return {?}
     */
    verifyZoneIsNotNooped(ngZone) {
        // `NoopNgZone` is not exposed publicly as it doesn't expect
        // to be used outside of the core Angular code, thus we just have
        // to check if the zone doesn't extend or instanceof `NgZone`
        if (ngZone instanceof NgZone) {
            return;
        }
        console.warn(CONFIG_MESSAGES[VALIDATION_CODE.ZONE_WARNING]());
    }
}
DispatchOutsideZoneNgxsExecutionStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DispatchOutsideZoneNgxsExecutionStrategy.ctorParameters = () => [
    { type: NgZone },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DispatchOutsideZoneNgxsExecutionStrategy.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    DispatchOutsideZoneNgxsExecutionStrategy.prototype._platformId;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ROOT_STATE_TOKEN = new InjectionToken('ROOT_STATE_TOKEN');
/** @type {?} */
const FEATURE_STATE_TOKEN = new InjectionToken('FEATURE_STATE_TOKEN');
/** @type {?} */
const NGXS_PLUGINS = new InjectionToken('NGXS_PLUGINS');
/** @type {?} */
const NG_TEST_MODE = new InjectionToken('NG_TEST_MODE');
/** @type {?} */
const NG_DEV_MODE = new InjectionToken('NG_DEV_MODE');
/** @type {?} */
const META_KEY = 'NGXS_META';
/** @type {?} */
const META_OPTIONS_KEY = 'NGXS_OPTIONS_META';
/** @type {?} */
const SELECTOR_META_KEY = 'NGXS_SELECTOR_META';
/**
 * The NGXS config settings.
 */
class NgxsConfig {
    constructor() {
        /**
         * Defining the default state before module initialization
         * This is convenient if we need to create a define our own set of states.
         * @deprecated will be removed after v4
         * (default: {})
         */
        this.defaultsState = {};
        /**
         * Defining shared selector options
         */
        this.selectorOptions = {
            injectContainerState: true,
            // TODO: default is true in v3, will change in v4
            suppressErrors: true // TODO: default is true in v3, will change in v4
        };
        this.compatibility = {
            strictContentSecurityPolicy: false
        };
        this.executionStrategy = DispatchOutsideZoneNgxsExecutionStrategy;
    }
}
NgxsConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxsConfig.ctorParameters = () => [];
if (false) {
    /**
     * Run in development mode. This will add additional debugging features:
     * - Object.freeze on the state and actions to guarantee immutability
     * (default: false)
     * @type {?}
     */
    NgxsConfig.prototype.developmentMode;
    /** @type {?} */
    NgxsConfig.prototype.compatibility;
    /**
     * Determines the execution context to perform async operations inside. An implementation can be
     * provided to override the default behaviour where the async operations are run
     * outside Angular's zone but all observable behaviours of NGXS are run back inside Angular's zone.
     * These observable behaviours are from:
     *   `\@Select(...)`, `store.select(...)`, `actions.subscribe(...)` or `store.dispatch(...).subscribe(...)`
     * Every `zone.run` causes Angular to run change detection on the whole tree (`app.tick()`) so of your
     * application doesn't rely on zone.js running change detection then you can switch to the
     * `NoopNgxsExecutionStrategy` that doesn't interact with zones.
     * (default: null)
     * @type {?}
     */
    NgxsConfig.prototype.executionStrategy;
    /**
     * Defining the default state before module initialization
     * This is convenient if we need to create a define our own set of states.
     * @deprecated will be removed after v4
     * (default: {})
     * @type {?}
     */
    NgxsConfig.prototype.defaultsState;
    /**
     * Defining shared selector options
     * @type {?}
     */
    NgxsConfig.prototype.selectorOptions;
}
/**
 * State context provided to the actions in the state.
 * @record
 * @template T
 */
function StateContext() { }
if (false) {
    /**
     * Get the current state.
     * @return {?}
     */
    StateContext.prototype.getState = function () { };
    /**
     * Reset the state to a new value.
     * @param {?} val
     * @return {?}
     */
    StateContext.prototype.setState = function (val) { };
    /**
     * Patch the existing state with the provided value.
     * @param {?} val
     * @return {?}
     */
    StateContext.prototype.patchState = function (val) { };
    /**
     * Dispatch a new action and return the dispatched observable.
     * @param {?} actions
     * @return {?}
     */
    StateContext.prototype.dispatch = function (actions) { };
}
/**
 * Plugin interface
 * @record
 */
function NgxsPlugin() { }
if (false) {
    /**
     * Handle the state/action before its submitted to the state handlers.
     * @param {?} state
     * @param {?} action
     * @param {?} next
     * @return {?}
     */
    NgxsPlugin.prototype.handle = function (state, action, next) { };
}
/**
 * Options that can be provided to the store.
 * @record
 * @template T
 */
function StoreOptions() { }
if (false) {
    /**
     * Name of the state. Required.
     * @type {?}
     */
    StoreOptions.prototype.name;
    /**
     * Default values for the state. If not provided, uses empty object.
     * @type {?|undefined}
     */
    StoreOptions.prototype.defaults;
    /**
     * Sub states for the given state.
     * @type {?|undefined}
     */
    StoreOptions.prototype.children;
}
/**
 * Represents a basic change from a previous to a new value for a single state instance.
 * Passed as a value in a NgxsSimpleChanges object to the ngxsOnChanges hook.
 * @template T
 */
class NgxsSimpleChange {
    /**
     * @param {?} previousValue
     * @param {?} currentValue
     * @param {?} firstChange
     */
    constructor(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
}
if (false) {
    /** @type {?} */
    NgxsSimpleChange.prototype.previousValue;
    /** @type {?} */
    NgxsSimpleChange.prototype.currentValue;
    /** @type {?} */
    NgxsSimpleChange.prototype.firstChange;
}
/**
 * On init interface
 * @record
 */
function NgxsOnInit() { }
if (false) {
    /**
     * @param {?=} ctx
     * @return {?}
     */
    NgxsOnInit.prototype.ngxsOnInit = function (ctx) { };
}
/**
 * On change interface
 * @record
 */
function NgxsOnChanges() { }
if (false) {
    /**
     * @param {?} change
     * @return {?}
     */
    NgxsOnChanges.prototype.ngxsOnChanges = function (change) { };
}
/**
 * After bootstrap interface
 * @record
 */
function NgxsAfterBootstrap() { }
if (false) {
    /**
     * @param {?=} ctx
     * @return {?}
     */
    NgxsAfterBootstrap.prototype.ngxsAfterBootstrap = function (ctx) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Internal execution strategy injection token
 */
/** @type {?} */
const NGXS_EXECUTION_STRATEGY = new InjectionToken('NGXS_EXECUTION_STRATEGY');
/**
 * @record
 */
function NgxsExecutionStrategy() { }
if (false) {
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    NgxsExecutionStrategy.prototype.enter = function (func) { };
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    NgxsExecutionStrategy.prototype.leave = function (func) { };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns the type from an action instance/class.
 * @ignore
 * @param {?} action
 * @return {?}
 */
function getActionTypeFromInstance(action) {
    if (action.constructor && action.constructor.type) {
        return action.constructor.type;
    }
    else {
        return action.type;
    }
}
/**
 * Matches a action
 * @ignore
 * @param {?} action1
 * @return {?}
 */
function actionMatcher(action1) {
    /** @type {?} */
    const type1 = getActionTypeFromInstance(action1);
    return (/**
     * @param {?} action2
     * @return {?}
     */
    function (action2) {
        return type1 === getActionTypeFromInstance(action2);
    });
}
/**
 * Set a deeply nested value. Example:
 *
 *   setValue({ foo: { bar: { eat: false } } },
 *      'foo.bar.eat', true) //=> { foo: { bar: { eat: true } } }
 *
 * While it traverses it also creates new objects from top down.
 *
 * @ignore
 * @type {?}
 */
const setValue = (/**
 * @param {?} obj
 * @param {?} prop
 * @param {?} val
 * @return {?}
 */
(obj, prop, val) => {
    obj = Object.assign({}, obj);
    /** @type {?} */
    const split = prop.split('.');
    /** @type {?} */
    const lastIndex = split.length - 1;
    split.reduce((/**
     * @param {?} acc
     * @param {?} part
     * @param {?} index
     * @return {?}
     */
    (acc, part, index) => {
        if (index === lastIndex) {
            acc[part] = val;
        }
        else {
            acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : Object.assign({}, acc[part]);
        }
        return acc && acc[part];
    }), obj);
    return obj;
});
/**
 * Get a deeply nested value. Example:
 *
 *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
 *
 * @ignore
 * @type {?}
 */
const getValue = (/**
 * @param {?} obj
 * @param {?} prop
 * @return {?}
 */
(obj, prop) => prop.split('.').reduce((/**
 * @param {?} acc
 * @param {?} part
 * @return {?}
 */
(acc, part) => acc && acc[part]), obj));
/**
 * Simple object check.
 *
 *    isObject({a:1}) //=> true
 *    isObject(1) //=> false
 *
 * @ignore
 * @type {?}
 */
const isObject = (/**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
});
/**
 * Deep merge two objects.
 *
 *    mergeDeep({a:1, b:{x: 1, y:2}}, {b:{x: 3}, c:4}) //=> {a:1, b:{x:3, y:2}, c:4}
 *
 * \@param base base object onto which `sources` will be applied
 * @type {?}
 */
const mergeDeep = (/**
 * @param {?} base
 * @param {...?} sources
 * @return {?}
 */
(base, ...sources) => {
    if (!sources.length)
        return base;
    /** @type {?} */
    const source = sources.shift();
    if (isObject(base) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!base[key])
                    Object.assign(base, { [key]: {} });
                mergeDeep(base[key], source[key]);
            }
            else {
                Object.assign(base, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(base, ...sources);
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T, U
 */
function StateClassInternal() { }
if (false) {
    /* Skipping unnamed member:
    [META_KEY]?: MetaDataModel;*/
    /* Skipping unnamed member:
    [META_OPTIONS_KEY]?: StoreOptions<U>;*/
}
/**
 * @record
 * @template T
 */
function StateOperations() { }
if (false) {
    /**
     * @return {?}
     */
    StateOperations.prototype.getState = function () { };
    /**
     * @param {?} val
     * @return {?}
     */
    StateOperations.prototype.setState = function (val) { };
    /**
     * @param {?} actionOrActions
     * @return {?}
     */
    StateOperations.prototype.dispatch = function (actionOrActions) { };
}
/**
 * @record
 */
function MetaDataModel() { }
if (false) {
    /** @type {?} */
    MetaDataModel.prototype.name;
    /** @type {?} */
    MetaDataModel.prototype.actions;
    /** @type {?} */
    MetaDataModel.prototype.defaults;
    /** @type {?} */
    MetaDataModel.prototype.path;
    /** @type {?} */
    MetaDataModel.prototype.makeRootSelector;
    /** @type {?|undefined} */
    MetaDataModel.prototype.children;
}
/**
 * @record
 */
function RuntimeSelectorContext() { }
if (false) {
    /**
     * @param {?} key
     * @return {?}
     */
    RuntimeSelectorContext.prototype.getStateGetter = function (key) { };
    /**
     * @param {?=} localOptions
     * @return {?}
     */
    RuntimeSelectorContext.prototype.getSelectorOptions = function (localOptions) { };
}
/**
 * @record
 */
function SharedSelectorOptions() { }
if (false) {
    /** @type {?|undefined} */
    SharedSelectorOptions.prototype.injectContainerState;
    /** @type {?|undefined} */
    SharedSelectorOptions.prototype.suppressErrors;
}
/**
 * @record
 */
function SelectorMetaDataModel() { }
if (false) {
    /** @type {?} */
    SelectorMetaDataModel.prototype.makeRootSelector;
    /** @type {?} */
    SelectorMetaDataModel.prototype.originalFn;
    /** @type {?} */
    SelectorMetaDataModel.prototype.containerClass;
    /** @type {?} */
    SelectorMetaDataModel.prototype.selectorName;
    /** @type {?} */
    SelectorMetaDataModel.prototype.getSelectorOptions;
}
/**
 * @record
 */
function MappedStore() { }
if (false) {
    /** @type {?} */
    MappedStore.prototype.name;
    /** @type {?} */
    MappedStore.prototype.isInitialised;
    /** @type {?} */
    MappedStore.prototype.actions;
    /** @type {?} */
    MappedStore.prototype.defaults;
    /** @type {?} */
    MappedStore.prototype.instance;
    /** @type {?} */
    MappedStore.prototype.path;
}
/**
 * @record
 */
function StatesAndDefaults() { }
if (false) {
    /** @type {?} */
    StatesAndDefaults.prototype.defaults;
    /** @type {?} */
    StatesAndDefaults.prototype.states;
}
/**
 * @record
 * @template T
 */
function RootStateDiff() { }
if (false) {
    /** @type {?} */
    RootStateDiff.prototype.currentAppState;
    /** @type {?} */
    RootStateDiff.prototype.newAppState;
}
/**
 * Ensures metadata is attached to the class and returns it.
 *
 * @ignore
 * @param {?} target
 * @return {?}
 */
function ensureStoreMetadata(target) {
    if (!target.hasOwnProperty(META_KEY)) {
        /** @type {?} */
        const defaultMetadata = {
            name: null,
            actions: {},
            defaults: {},
            path: null,
            /**
             * @param {?} context
             * @return {?}
             */
            makeRootSelector(context) {
                return context.getStateGetter(defaultMetadata.name);
            },
            children: []
        };
        Object.defineProperty(target, META_KEY, { value: defaultMetadata });
    }
    return getStoreMetadata(target);
}
/**
 * Get the metadata attached to the state class if it exists.
 *
 * @ignore
 * @param {?} target
 * @return {?}
 */
function getStoreMetadata(target) {
    return (/** @type {?} */ (target[META_KEY]));
}
/**
 * Ensures metadata is attached to the selector and returns it.
 *
 * @ignore
 * @param {?} target
 * @return {?}
 */
function ensureSelectorMetadata(target) {
    if (!target.hasOwnProperty(SELECTOR_META_KEY)) {
        /** @type {?} */
        const defaultMetadata = {
            makeRootSelector: null,
            originalFn: null,
            containerClass: null,
            selectorName: null,
            getSelectorOptions: (/**
             * @return {?}
             */
            () => ({}))
        };
        Object.defineProperty(target, SELECTOR_META_KEY, { value: defaultMetadata });
    }
    return getSelectorMetadata(target);
}
/**
 * Get the metadata attached to the selector if it exists.
 *
 * @ignore
 * @param {?} target
 * @return {?}
 */
function getSelectorMetadata(target) {
    return target[SELECTOR_META_KEY];
}
/**
 * Get a deeply nested value. Example:
 *
 *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
 *
 * Note: This is not as fast as the `fastPropGetter` but is strict Content Security Policy compliant.
 * See perf hit: https://jsperf.com/fast-value-getter-given-path/1
 *
 * @ignore
 * @param {?} paths
 * @return {?}
 */
function compliantPropGetter(paths) {
    /** @type {?} */
    const copyOfPaths = paths.slice();
    return (/**
     * @param {?} obj
     * @return {?}
     */
    obj => copyOfPaths.reduce((/**
     * @param {?} acc
     * @param {?} part
     * @return {?}
     */
    (acc, part) => acc && acc[part]), obj));
}
/**
 * The generated function is faster than:
 * - pluck (Observable operator)
 * - memoize
 *
 * @ignore
 * @param {?} paths
 * @return {?}
 */
function fastPropGetter(paths) {
    /** @type {?} */
    const segments = paths;
    /** @type {?} */
    let seg = 'store.' + segments[0];
    /** @type {?} */
    let i = 0;
    /** @type {?} */
    const l = segments.length;
    /** @type {?} */
    let expr = seg;
    while (++i < l) {
        expr = expr + ' && ' + (seg = seg + '.' + segments[i]);
    }
    /** @type {?} */
    const fn = new Function('store', 'return ' + expr + ';');
    return (/** @type {?} */ (fn));
}
/**
 * Get a deeply nested value. Example:
 *
 *    getValue({ foo: bar: [] }, 'foo.bar') //=> []
 *
 * @ignore
 * @param {?} paths
 * @param {?} config
 * @return {?}
 */
function propGetter(paths, config) {
    if (config && config.compatibility && config.compatibility.strictContentSecurityPolicy) {
        return compliantPropGetter(paths);
    }
    else {
        return fastPropGetter(paths);
    }
}
/**
 * Given an array of states, it will return a object graph. Example:
 *    const states = [
 *      Cart,
 *      CartSaved,
 *      CartSavedItems
 *    ]
 *
 * would return:
 *
 *  const graph = {
 *    cart: ['saved'],
 *    saved: ['items'],
 *    items: []
 *  };
 *
 * @ignore
 * @param {?} stateClasses
 * @return {?}
 */
function buildGraph(stateClasses) {
    /** @type {?} */
    const findName = (/**
     * @param {?} stateClass
     * @return {?}
     */
    (stateClass) => {
        /** @type {?} */
        const meta = stateClasses.find((/**
         * @param {?} g
         * @return {?}
         */
        g => g === stateClass));
        if (!meta) {
            throw new Error(`Child state not found: ${stateClass}. \r\nYou may have forgotten to add states to module`);
        }
        return (/** @type {?} */ ((/** @type {?} */ (meta[META_KEY])).name));
    });
    return stateClasses.reduce((/**
     * @param {?} result
     * @param {?} stateClass
     * @return {?}
     */
    (result, stateClass) => {
        const { name, children } = (/** @type {?} */ (stateClass[META_KEY]));
        result[(/** @type {?} */ (name))] = (children || []).map(findName);
        return result;
    }), {});
}
/**
 * Given a states array, returns object graph
 * returning the name and state metadata. Example:
 *
 *  const graph = {
 *    cart: { metadata }
 *  };
 *
 * @ignore
 * @param {?} states
 * @return {?}
 */
function nameToState(states) {
    return states.reduce((/**
     * @param {?} result
     * @param {?} stateClass
     * @return {?}
     */
    (result, stateClass) => {
        /** @type {?} */
        const meta = (/** @type {?} */ (stateClass[META_KEY]));
        result[(/** @type {?} */ (meta.name))] = stateClass;
        return result;
    }), {});
}
/**
 * Given a object relationship graph will return the full path
 * for the child items. Example:
 *
 *  const graph = {
 *    cart: ['saved'],
 *    saved: ['items'],
 *    items: []
 *  };
 *
 * would return:
 *
 *  const r = {
 *    cart: 'cart',
 *    saved: 'cart.saved',
 *    items: 'cart.saved.items'
 *  };
 *
 * @ignore
 * @param {?} obj
 * @param {?=} newObj
 * @return {?}
 */
function findFullParentPath(obj, newObj = {}) {
    /** @type {?} */
    const visit = (/**
     * @param {?} child
     * @param {?} keyToFind
     * @return {?}
     */
    (child, keyToFind) => {
        for (const key in child) {
            if (child.hasOwnProperty(key) && child[key].indexOf(keyToFind) >= 0) {
                /** @type {?} */
                const parent = visit(child, key);
                return parent !== null ? `${parent}.${key}` : key;
            }
        }
        return null;
    });
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            /** @type {?} */
            const parent = visit(obj, key);
            newObj[key] = parent ? `${parent}.${key}` : key;
        }
    }
    return newObj;
}
/**
 * Given a object graph, it will return the items topologically sorted Example:
 *
 *  const graph = {
 *    cart: ['saved'],
 *    saved: ['items'],
 *    items: []
 *  };
 *
 * would return:
 *
 *  const results = [
 *    'items',
 *    'saved',
 *    'cart'
 *  ];
 *
 * @ignore
 * @param {?} graph
 * @return {?}
 */
function topologicalSort(graph) {
    /** @type {?} */
    const sorted = [];
    /** @type {?} */
    const visited = {};
    /** @type {?} */
    const visit = (/**
     * @param {?} name
     * @param {?=} ancestors
     * @return {?}
     */
    (name, ancestors = []) => {
        if (!Array.isArray(ancestors)) {
            ancestors = [];
        }
        ancestors.push(name);
        visited[name] = true;
        graph[name].forEach((/**
         * @param {?} dep
         * @return {?}
         */
        (dep) => {
            if (ancestors.indexOf(dep) >= 0) {
                throw new Error(`Circular dependency '${dep}' is required by '${name}': ${ancestors.join(' -> ')}`);
            }
            if (visited[dep]) {
                return;
            }
            visit(dep, ancestors.slice(0));
        }));
        if (sorted.indexOf(name) < 0) {
            sorted.push(name);
        }
    });
    Object.keys(graph).forEach((/**
     * @param {?} k
     * @return {?}
     */
    k => visit(k)));
    return sorted.reverse();
}
/**
 * Returns if the parameter is a object or not.
 *
 * @ignore
 * @param {?} obj
 * @return {?}
 */
function isObject$1(obj) {
    return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
}
/**
 * @template T
 * @param {?} mappedStore
 * @param {?} diff
 * @return {?}
 */
function getStateDiffChanges(mappedStore, diff) {
    /** @type {?} */
    const previousValue = getValue(diff.currentAppState, mappedStore.path);
    /** @type {?} */
    const currentValue = getValue(diff.newAppState, mappedStore.path);
    return new NgxsSimpleChange(previousValue, currentValue, !mappedStore.isInitialised);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T, E
 */
function ActionCompletion() { }
if (false) {
    /** @type {?} */
    ActionCompletion.prototype.action;
    /** @type {?} */
    ActionCompletion.prototype.result;
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will grab actions that have just been dispatched as well as actions that have completed
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofAction(...allowedTypes) {
    return ofActionOperator(allowedTypes);
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will ONLY grab actions that have just been dispatched
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofActionDispatched(...allowedTypes) {
    return ofActionOperator(allowedTypes, ["DISPATCHED" /* Dispatched */]);
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will ONLY grab actions that have just been successfully completed
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofActionSuccessful(...allowedTypes) {
    return ofActionOperator(allowedTypes, ["SUCCESSFUL" /* Successful */]);
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will ONLY grab actions that have just been canceled
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofActionCanceled(...allowedTypes) {
    return ofActionOperator(allowedTypes, ["CANCELED" /* Canceled */]);
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will ONLY grab actions that have just been completed
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofActionCompleted(...allowedTypes) {
    /** @type {?} */
    const allowedStatuses = [
        "SUCCESSFUL" /* Successful */,
        "CANCELED" /* Canceled */,
        "ERRORED" /* Errored */
    ];
    return ofActionOperator(allowedTypes, allowedStatuses, mapActionResult);
}
/**
 * RxJS operator for selecting out specific actions.
 *
 * This will ONLY grab actions that have just thrown an error
 * @param {...?} allowedTypes
 * @return {?}
 */
function ofActionErrored(...allowedTypes) {
    return ofActionOperator(allowedTypes, ["ERRORED" /* Errored */]);
}
/**
 * @param {?} allowedTypes
 * @param {?=} statuses
 * @param {?=} mapOperator
 * @return {?}
 */
function ofActionOperator(allowedTypes, statuses, 
// This actually could've been `OperatorFunction<ActionContext, ActionCompletion | any>`,
// since it maps either to `ctx.action` OR to `ActionCompletion`. But `ActionCompleteion | any`
// defaults to `any`, thus there is no sense from union type.
mapOperator = mapAction) {
    /** @type {?} */
    const allowedMap = createAllowedActionTypesMap(allowedTypes);
    /** @type {?} */
    const allowedStatusMap = statuses && createAllowedStatusesMap(statuses);
    return (/**
     * @param {?} o
     * @return {?}
     */
    function (o) {
        return o.pipe(filterStatus(allowedMap, allowedStatusMap), mapOperator());
    });
}
/**
 * @param {?} allowedTypes
 * @param {?=} allowedStatuses
 * @return {?}
 */
function filterStatus(allowedTypes, allowedStatuses) {
    return filter((/**
     * @param {?} ctx
     * @return {?}
     */
    (ctx) => {
        /** @type {?} */
        const actionType = (/** @type {?} */ (getActionTypeFromInstance(ctx.action)));
        /** @type {?} */
        const typeMatch = allowedTypes[actionType];
        /** @type {?} */
        const statusMatch = allowedStatuses ? allowedStatuses[ctx.status] : true;
        return typeMatch && statusMatch;
    }));
}
/**
 * @return {?}
 */
function mapActionResult() {
    return map((/**
     * @param {?} __0
     * @return {?}
     */
    ({ action, status, error }) => {
        return (/** @type {?} */ ({
            action,
            result: {
                successful: "SUCCESSFUL" /* Successful */ === status,
                canceled: "CANCELED" /* Canceled */ === status,
                error
            }
        }));
    }));
}
/**
 * @template T
 * @return {?}
 */
function mapAction() {
    return map((/**
     * @param {?} ctx
     * @return {?}
     */
    (ctx) => (/** @type {?} */ (ctx.action))));
}
/**
 * @record
 */
function FilterMap() { }
/**
 * @param {?} types
 * @return {?}
 */
function createAllowedActionTypesMap(types) {
    return types.reduce((/**
     * @param {?} filterMap
     * @param {?} klass
     * @return {?}
     */
    (filterMap, klass) => {
        filterMap[(/** @type {?} */ (getActionTypeFromInstance(klass)))] = true;
        return filterMap;
    }), (/** @type {?} */ ({})));
}
/**
 * @param {?} statuses
 * @return {?}
 */
function createAllowedStatusesMap(statuses) {
    return statuses.reduce((/**
     * @param {?} filterMap
     * @param {?} status
     * @return {?}
     */
    (filterMap, status) => {
        filterMap[status] = true;
        return filterMap;
    }), (/** @type {?} */ ({})));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns operator that will run
 * `subscribe` outside of the ngxs execution context
 * @template T
 * @param {?} ngxsExecutionStrategy
 * @return {?}
 */
function leaveNgxs(ngxsExecutionStrategy) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    (source) => {
        return new Observable((/**
         * @param {?} sink
         * @return {?}
         */
        (sink) => {
            return source.subscribe({
                /**
                 * @param {?} value
                 * @return {?}
                 */
                next(value) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.next(value)));
                },
                /**
                 * @param {?} error
                 * @return {?}
                 */
                error(error) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.error(error)));
                },
                /**
                 * @return {?}
                 */
                complete() {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.complete()));
                }
            });
        }));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InternalNgxsExecutionStrategy {
    /**
     * @param {?} _executionStrategy
     */
    constructor(_executionStrategy) {
        this._executionStrategy = _executionStrategy;
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    enter(func) {
        return this._executionStrategy.enter(func);
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    leave(func) {
        return this._executionStrategy.leave(func);
    }
}
InternalNgxsExecutionStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InternalNgxsExecutionStrategy.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGXS_EXECUTION_STRATEGY,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    InternalNgxsExecutionStrategy.prototype._executionStrategy;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ActionStatus = {
    Dispatched: 'DISPATCHED',
    Successful: 'SUCCESSFUL',
    Canceled: 'CANCELED',
    Errored: 'ERRORED',
};
/**
 * @record
 * @template T
 */
function ActionContext() { }
if (false) {
    /** @type {?} */
    ActionContext.prototype.status;
    /** @type {?} */
    ActionContext.prototype.action;
    /** @type {?|undefined} */
    ActionContext.prototype.error;
}
/**
 * Custom Subject that ensures that subscribers are notified of values in the order that they arrived.
 * A standard Subject does not have this guarantee.
 * For example, given the following code:
 * ```typescript
 *   const subject = new Subject<string>();
 * subject.subscribe(value => {
 * if (value === 'start') subject.next('end');
 * });
 * subject.subscribe(value => { });
 * subject.next('start');
 * ```
 * When `subject` is a standard `Subject<T>` the second subscriber would recieve `end` and then `start`.
 * When `subject` is a `OrderedSubject<T>` the second subscriber would recieve `start` and then `end`.
 * @template T
 */
class OrderedSubject extends Subject {
    constructor() {
        super(...arguments);
        this._itemQueue = [];
        this._busyPushingNext = false;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        if (this._busyPushingNext) {
            this._itemQueue.unshift((/** @type {?} */ (value)));
            return;
        }
        this._busyPushingNext = true;
        super.next(value);
        while (this._itemQueue.length > 0) {
            /** @type {?} */
            const nextValue = this._itemQueue.pop();
            super.next(nextValue);
        }
        this._busyPushingNext = false;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OrderedSubject.prototype._itemQueue;
    /**
     * @type {?}
     * @private
     */
    OrderedSubject.prototype._busyPushingNext;
}
/**
 * Internal Action stream that is emitted anytime an action is dispatched.
 */
class InternalActions extends OrderedSubject {
}
InternalActions.decorators = [
    { type: Injectable }
];
/**
 * Action stream that is emitted anytime an action is dispatched.
 *
 * You can listen to this in services to react without stores.
 */
class Actions extends Observable {
    // This has to be `Observable<ActionContext>` in the v4. Because `InternalActions`
    // is a `Subject<ActionContext>`. Leave it as `any` to avoid breaking changes
    /**
     * @param {?} internalActions$
     * @param {?} internalExecutionStrategy
     */
    constructor(internalActions$, internalExecutionStrategy) {
        super((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            /** @type {?} */
            const childSubscription = internalActions$
                .pipe(leaveNgxs(internalExecutionStrategy))
                .subscribe({
                next: (/**
                 * @param {?} ctx
                 * @return {?}
                 */
                ctx => observer.next(ctx)),
                error: (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => observer.error(error)),
                complete: (/**
                 * @return {?}
                 */
                () => observer.complete())
            });
            observer.add(childSubscription);
        }));
    }
}
Actions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Actions.ctorParameters = () => [
    { type: InternalActions },
    { type: InternalNgxsExecutionStrategy }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Composes a array of functions from left to right. Example:
 *
 *      compose([fn, final])(state, action);
 *
 * then the funcs have a signature like:
 *
 *      function fn (state, action, next) {
 *          console.log('here', state, action, next);
 *          return next(state, action);
 *      }
 *
 *      function final (state, action) {
 *          console.log('here', state, action);
 *          return state;
 *      }
 *
 * the last function should not call `next`.
 *
 * @ignore
 * @type {?}
 */
const compose = (/**
 * @param {?} funcs
 * @return {?}
 */
(funcs) => (/**
 * @param {...?} args
 * @return {?}
 */
(...args) => {
    /** @type {?} */
    const curr = (/** @type {?} */ (funcs.shift()));
    return curr(...args, (/**
     * @param {...?} nextArgs
     * @return {?}
     */
    (...nextArgs) => compose(funcs)(...nextArgs)));
}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * BehaviorSubject of the entire state.
 * @ignore
 */
class StateStream extends BehaviorSubject {
    constructor() {
        super({});
    }
}
StateStream.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StateStream.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PluginManager {
    /**
     * @param {?} _parentManager
     * @param {?} _pluginHandlers
     */
    constructor(_parentManager, _pluginHandlers) {
        this._parentManager = _parentManager;
        this._pluginHandlers = _pluginHandlers;
        this.plugins = [];
        this.registerHandlers();
    }
    /**
     * @private
     * @return {?}
     */
    get rootPlugins() {
        return (this._parentManager && this._parentManager.plugins) || this.plugins;
    }
    /**
     * @private
     * @return {?}
     */
    registerHandlers() {
        /** @type {?} */
        const pluginHandlers = this.getPluginHandlers();
        this.rootPlugins.push(...pluginHandlers);
    }
    /**
     * @private
     * @return {?}
     */
    getPluginHandlers() {
        /** @type {?} */
        const handlers = this._pluginHandlers || [];
        return handlers.map((/**
         * @param {?} plugin
         * @return {?}
         */
        (plugin) => (/** @type {?} */ ((plugin.handle ? plugin.handle.bind(plugin) : plugin)))));
    }
}
PluginManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PluginManager.ctorParameters = () => [
    { type: PluginManager, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: Array, decorators: [{ type: Inject, args: [NGXS_PLUGINS,] }, { type: Optional }] }
];
if (false) {
    /** @type {?} */
    PluginManager.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    PluginManager.prototype._parentManager;
    /**
     * @type {?}
     * @private
     */
    PluginManager.prototype._pluginHandlers;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Internal Action result stream that is emitted when an action is completed.
 * This is used as a method of returning the action result to the dispatcher
 * for the observable returned by the dispatch(...) call.
 * The dispatcher then asynchronously pushes the result from this stream onto the main action stream as a result.
 */
class InternalDispatchedActionResults extends Subject {
}
InternalDispatchedActionResults.decorators = [
    { type: Injectable }
];
class InternalDispatcher {
    /**
     * @param {?} _injector
     * @param {?} _actions
     * @param {?} _actionResults
     * @param {?} _pluginManager
     * @param {?} _stateStream
     * @param {?} _ngxsExecutionStrategy
     */
    constructor(_injector, _actions, _actionResults, _pluginManager, _stateStream, _ngxsExecutionStrategy) {
        this._injector = _injector;
        this._actions = _actions;
        this._actionResults = _actionResults;
        this._pluginManager = _pluginManager;
        this._stateStream = _stateStream;
        this._ngxsExecutionStrategy = _ngxsExecutionStrategy;
    }
    /**
     * Dispatches event(s).
     * @param {?} actionOrActions
     * @return {?}
     */
    dispatch(actionOrActions) {
        /** @type {?} */
        const result = this._ngxsExecutionStrategy.enter((/**
         * @return {?}
         */
        () => this.dispatchByEvents(actionOrActions)));
        result.subscribe({
            error: (/**
             * @param {?} error
             * @return {?}
             */
            error => this._ngxsExecutionStrategy.leave((/**
             * @return {?}
             */
            () => {
                try {
                    // Retrieve lazily to avoid cyclic dependency exception
                    this._errorHandler = this._errorHandler || this._injector.get(ErrorHandler);
                    this._errorHandler.handleError(error);
                }
                catch (_a) { }
            })))
        });
        return result.pipe(leaveNgxs(this._ngxsExecutionStrategy));
    }
    /**
     * @private
     * @param {?} actionOrActions
     * @return {?}
     */
    dispatchByEvents(actionOrActions) {
        if (Array.isArray(actionOrActions)) {
            if (actionOrActions.length === 0)
                return of(this._stateStream.getValue());
            return forkJoin(actionOrActions.map((/**
             * @param {?} action
             * @return {?}
             */
            action => this.dispatchSingle(action))));
        }
        else {
            return this.dispatchSingle(actionOrActions);
        }
    }
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    dispatchSingle(action) {
        /** @type {?} */
        const type = getActionTypeFromInstance(action);
        if (!type) {
            /** @type {?} */
            const error = new Error(`This action doesn't have a type property: ${action.constructor.name}`);
            return throwError(error);
        }
        /** @type {?} */
        const prevState = this._stateStream.getValue();
        /** @type {?} */
        const plugins = this._pluginManager.plugins;
        return ((/** @type {?} */ (compose([
            ...plugins,
            (/**
             * @param {?} nextState
             * @param {?} nextAction
             * @return {?}
             */
            (nextState, nextAction) => {
                if (nextState !== prevState) {
                    this._stateStream.next(nextState);
                }
                /** @type {?} */
                const actionResult$ = this.getActionResultStream(nextAction);
                actionResult$.subscribe((/**
                 * @param {?} ctx
                 * @return {?}
                 */
                ctx => this._actions.next(ctx)));
                this._actions.next({ action: nextAction, status: "DISPATCHED" /* Dispatched */ });
                return this.createDispatchObservable(actionResult$);
            })
        ])(prevState, action)))).pipe(shareReplay());
    }
    /**
     * @private
     * @param {?} action
     * @return {?}
     */
    getActionResultStream(action) {
        return this._actionResults.pipe(filter((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => ctx.action === action && ctx.status !== "DISPATCHED" /* Dispatched */)), take(1), shareReplay());
    }
    /**
     * @private
     * @param {?} actionResult$
     * @return {?}
     */
    createDispatchObservable(actionResult$) {
        return actionResult$
            .pipe(exhaustMap((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => {
            switch (ctx.status) {
                case "SUCCESSFUL" /* Successful */:
                    return of(this._stateStream.getValue());
                case "ERRORED" /* Errored */:
                    return throwError(ctx.error);
                default:
                    return EMPTY;
            }
        })))
            .pipe(shareReplay());
    }
}
InternalDispatcher.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InternalDispatcher.ctorParameters = () => [
    { type: Injector },
    { type: InternalActions },
    { type: InternalDispatchedActionResults },
    { type: PluginManager },
    { type: StateStream },
    { type: InternalNgxsExecutionStrategy }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._errorHandler;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._actionResults;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._pluginManager;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._stateStream;
    /**
     * @type {?}
     * @private
     */
    InternalDispatcher.prototype._ngxsExecutionStrategy;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Object freeze code
 * https://github.com/jsdf/deep-freeze
 * @type {?}
 */
const deepFreeze = (/**
 * @param {?} o
 * @return {?}
 */
(o) => {
    Object.freeze(o);
    /** @type {?} */
    const oIsFunction = typeof o === 'function';
    /** @type {?} */
    const hasOwnProp = Object.prototype.hasOwnProperty;
    Object.getOwnPropertyNames(o).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        if (hasOwnProp.call(o, prop) &&
            (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
            o[prop] !== null &&
            (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
            !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    }));
    return o;
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HostEnvironment {
    /**
     * @param {?} isDevMode
     * @param {?} isTestMode
     */
    constructor(isDevMode, isTestMode) {
        this.isDevMode = isDevMode;
        this.isTestMode = isTestMode;
    }
}
HostEnvironment.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HostEnvironment.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NG_DEV_MODE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [NG_TEST_MODE,] }] }
];
if (false) {
    /** @type {?} */
    HostEnvironment.prototype.isDevMode;
    /** @type {?} */
    HostEnvironment.prototype.isTestMode;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfigValidator {
    /**
     * @param {?} _host
     * @param {?} _config
     */
    constructor(_host, _config) {
        this._host = _host;
        this._config = _config;
    }
    /**
     * @private
     * @return {?}
     */
    get isIncorrectProduction() {
        return !this._host.isDevMode() && this._config.developmentMode;
    }
    /**
     * @private
     * @return {?}
     */
    get isIncorrectDevelopment() {
        return this._host.isDevMode() && !this._config.developmentMode;
    }
    /**
     * @return {?}
     */
    verifyDevMode() {
        if (this._host.isTestMode()) {
            return;
        }
        if (this.isIncorrectProduction) {
            console.warn(CONFIG_MESSAGES[VALIDATION_CODE.INCORRECT_PRODUCTION]());
        }
        else if (this.isIncorrectDevelopment) {
            console.warn(CONFIG_MESSAGES[VALIDATION_CODE.INCORRECT_DEVELOPMENT]());
        }
    }
}
ConfigValidator.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigValidator.ctorParameters = () => [
    { type: HostEnvironment },
    { type: NgxsConfig }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigValidator.prototype._host;
    /**
     * @type {?}
     * @private
     */
    ConfigValidator.prototype._config;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * State Context factory class
 * @ignore
 */
class InternalStateOperations {
    /**
     * @param {?} _stateStream
     * @param {?} _dispatcher
     * @param {?} _config
     * @param {?} configValidator
     */
    constructor(_stateStream, _dispatcher, _config, configValidator) {
        this._stateStream = _stateStream;
        this._dispatcher = _dispatcher;
        this._config = _config;
        configValidator.verifyDevMode();
    }
    /**
     * Returns the root state operators.
     * @return {?}
     */
    getRootStateOperations() {
        /** @type {?} */
        const rootStateOperations = {
            getState: (/**
             * @return {?}
             */
            () => this._stateStream.getValue()),
            setState: (/**
             * @param {?} newState
             * @return {?}
             */
            (newState) => this._stateStream.next(newState)),
            dispatch: (/**
             * @param {?} actionOrActions
             * @return {?}
             */
            (actionOrActions) => this._dispatcher.dispatch(actionOrActions))
        };
        if (this._config.developmentMode) {
            return this.ensureStateAndActionsAreImmutable(rootStateOperations);
        }
        return rootStateOperations;
    }
    /**
     * @private
     * @param {?} root
     * @return {?}
     */
    ensureStateAndActionsAreImmutable(root) {
        return {
            getState: (/**
             * @return {?}
             */
            () => root.getState()),
            setState: (/**
             * @param {?} value
             * @return {?}
             */
            value => {
                /** @type {?} */
                const frozenValue = deepFreeze(value);
                return root.setState(frozenValue);
            }),
            dispatch: (/**
             * @param {?} actions
             * @return {?}
             */
            actions => {
                return root.dispatch(actions);
            })
        };
    }
    /**
     * @param {?} results
     * @return {?}
     */
    setStateToTheCurrentWithNew(results) {
        /** @type {?} */
        const stateOperations = this.getRootStateOperations();
        // Get our current stream
        /** @type {?} */
        const currentState = stateOperations.getState();
        // Set the state to the current + new
        stateOperations.setState(Object.assign({}, currentState, results.defaults));
    }
}
InternalStateOperations.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InternalStateOperations.ctorParameters = () => [
    { type: StateStream },
    { type: InternalDispatcher },
    { type: NgxsConfig },
    { type: ConfigValidator }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    InternalStateOperations.prototype._stateStream;
    /**
     * @type {?}
     * @private
     */
    InternalStateOperations.prototype._dispatcher;
    /**
     * @type {?}
     * @private
     */
    InternalStateOperations.prototype._config;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} val
 * @return {?}
 */
function simplePatch(val) {
    return (/**
     * @param {?} existingState
     * @return {?}
     */
    (existingState) => {
        if (Array.isArray(val)) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.PATCHING_ARRAY]());
        }
        else if (typeof val !== 'object') {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.PATCHING_PRIMITIVE]());
        }
        /** @type {?} */
        const newState = Object.assign({}, ((/** @type {?} */ (existingState))));
        for (const key in val) {
            // deep clone for patch compatibility
            // noinspection JSUnfilteredForInLoop (IDE)
            newState[key] = ((/** @type {?} */ (val)))[key];
        }
        return (/** @type {?} */ (newState));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * State Context factory class
 * @ignore
 */
class StateContextFactory {
    /**
     * @param {?} _internalStateOperations
     */
    constructor(_internalStateOperations) {
        this._internalStateOperations = _internalStateOperations;
    }
    /**
     * Create the state context
     * @template T
     * @param {?} mappedStore
     * @return {?}
     */
    createStateContext(mappedStore) {
        /** @type {?} */
        const root = this._internalStateOperations.getRootStateOperations();
        /**
         * @param {?} currentAppState
         * @return {?}
         */
        function getState(currentAppState) {
            return getValue(currentAppState, mappedStore.path);
        }
        /**
         * @param {?} currentAppState
         * @param {?} newValue
         * @return {?}
         */
        function setStateValue(currentAppState, newValue) {
            /** @type {?} */
            const newAppState = setValue(currentAppState, mappedStore.path, newValue);
            /** @type {?} */
            const instance = mappedStore.instance;
            if (instance.ngxsOnChanges) {
                /** @type {?} */
                const change = getStateDiffChanges(mappedStore, {
                    currentAppState,
                    newAppState
                });
                instance.ngxsOnChanges(change);
            }
            root.setState(newAppState);
            return newAppState;
            // In doing this refactoring I noticed that there is a 'bug' where the
            // application state is returned instead of this state slice.
            // This has worked this way since the beginning see:
            // https://github.com/ngxs/store/blame/324c667b4b7debd8eb979006c67ca0ae347d88cd/src/state-factory.ts
            // This needs to be fixed, but is a 'breaking' change.
            // I will do this fix in a subsequent PR and we can decide how to handle it.
        }
        /**
         * @param {?} currentAppState
         * @param {?} stateOperator
         * @return {?}
         */
        function setStateFromOperator(currentAppState, stateOperator) {
            /** @type {?} */
            const local = getState(currentAppState);
            /** @type {?} */
            const newValue = stateOperator(local);
            return setStateValue(currentAppState, newValue);
        }
        /**
         * @param {?} value
         * @return {?}
         */
        function isStateOperator(value) {
            return typeof value === 'function';
        }
        return {
            /**
             * @return {?}
             */
            getState() {
                /** @type {?} */
                const currentAppState = root.getState();
                return getState(currentAppState);
            },
            /**
             * @param {?} val
             * @return {?}
             */
            patchState(val) {
                /** @type {?} */
                const currentAppState = root.getState();
                /** @type {?} */
                const patchOperator = simplePatch(val);
                return setStateFromOperator(currentAppState, patchOperator);
            },
            /**
             * @param {?} val
             * @return {?}
             */
            setState(val) {
                /** @type {?} */
                const currentAppState = root.getState();
                return isStateOperator(val)
                    ? setStateFromOperator(currentAppState, val)
                    : setStateValue(currentAppState, val);
            },
            /**
             * @param {?} actions
             * @return {?}
             */
            dispatch(actions) {
                return root.dispatch(actions);
            }
        };
    }
}
StateContextFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StateContextFactory.ctorParameters = () => [
    { type: InternalStateOperations }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateContextFactory.prototype._internalStateOperations;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class StoreValidators {
    /**
     * @param {?} name
     * @return {?}
     */
    static stateNameErrorMessage(name) {
        return CONFIG_MESSAGES[VALIDATION_CODE.STATE_NAME](name);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    static checkCorrectStateName(name) {
        if (!name) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_NAME_PROPERTY]());
        }
        if (!this.stateNameRegex.test(name)) {
            throw new Error(this.stateNameErrorMessage(name));
        }
    }
    /**
     * @param {?} state
     * @param {?} statesByName
     * @return {?}
     */
    static checkStateNameIsUnique(state, statesByName) {
        /** @type {?} */
        const meta = this.getValidStateMeta(state);
        /** @type {?} */
        const stateName = (/** @type {?} */ ((/** @type {?} */ (meta)).name));
        /** @type {?} */
        const existingState = statesByName[stateName];
        if (existingState && existingState !== state) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_UNIQUE](stateName, state.name, existingState.name));
        }
        return stateName;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static getValidStateMeta(state) {
        /** @type {?} */
        const meta = getStoreMetadata(state);
        if (!meta) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.STATE_DECORATOR]());
        }
        return meta;
    }
}
StoreValidators.stateNameRegex = new RegExp('^[a-zA-Z0-9_]+$');
if (false) {
    /** @type {?} */
    StoreValidators.stateNameRegex;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * State factory class
 * @ignore
 */
class StateFactory {
    /**
     * @param {?} _injector
     * @param {?} _config
     * @param {?} _parentFactory
     * @param {?} _actions
     * @param {?} _actionResults
     * @param {?} _stateContextFactory
     * @param {?} _initialState
     */
    constructor(_injector, _config, _parentFactory, _actions, _actionResults, _stateContextFactory, _initialState) {
        this._injector = _injector;
        this._config = _config;
        this._parentFactory = _parentFactory;
        this._actions = _actions;
        this._actionResults = _actionResults;
        this._stateContextFactory = _stateContextFactory;
        this._initialState = _initialState;
        this._actionsSubscription = null;
        this._states = [];
        this._statesByName = {};
        this._statePaths = {};
        this.getRuntimeSelectorContext = memoize((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const stateFactory = this;
            /**
             * @param {?} key
             * @return {?}
             */
            function resolveGetter(key) {
                /** @type {?} */
                const path = stateFactory.statePaths[key];
                return path ? propGetter(path.split('.'), stateFactory._config) : null;
            }
            /** @type {?} */
            const context = this._parentFactory
                ? this._parentFactory.getRuntimeSelectorContext()
                : {
                    /**
                     * @param {?} key
                     * @return {?}
                     */
                    getStateGetter(key) {
                        /** @type {?} */
                        let getter = resolveGetter(key);
                        if (getter) {
                            return getter;
                        }
                        return (/**
                         * @param {...?} args
                         * @return {?}
                         */
                        (...args) => {
                            // Late loaded getter
                            if (!getter) {
                                getter = resolveGetter(key);
                            }
                            return getter ? getter(...args) : undefined;
                        });
                    },
                    /**
                     * @param {?=} localOptions
                     * @return {?}
                     */
                    getSelectorOptions(localOptions) {
                        /** @type {?} */
                        const globalSelectorOptions = stateFactory._config.selectorOptions;
                        return Object.assign({}, globalSelectorOptions, (localOptions || {}));
                    }
                };
            return context;
        }));
    }
    /**
     * @return {?}
     */
    get states() {
        return this._parentFactory ? this._parentFactory.states : this._states;
    }
    /**
     * @return {?}
     */
    get statesByName() {
        return this._parentFactory ? this._parentFactory.statesByName : this._statesByName;
    }
    /**
     * @private
     * @return {?}
     */
    get statePaths() {
        return this._parentFactory ? this._parentFactory.statePaths : this._statePaths;
    }
    /**
     * @private
     * @param {?} defaults
     * @return {?}
     */
    static cloneDefaults(defaults) {
        /** @type {?} */
        let value = {};
        if (Array.isArray(defaults)) {
            value = defaults.slice();
        }
        else if (isObject$1(defaults)) {
            value = Object.assign({}, defaults);
        }
        else if (defaults === undefined) {
            value = {};
        }
        else {
            value = defaults;
        }
        return value;
    }
    /**
     * @private
     * @param {?} stateClasses
     * @return {?}
     */
    static checkStatesAreValid(stateClasses) {
        stateClasses.forEach(StoreValidators.getValidStateMeta);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // I'm using non-null assertion here since `_actionsSubscrition` will
        // be 100% defined. This is because `ngOnDestroy()` cannot be invoked
        // on the `StateFactory` until its initialized :) An it's initialized
        // for the first time along with the `NgxsRootModule`.
        (/** @type {?} */ (this._actionsSubscription)).unsubscribe();
    }
    /**
     * Add a new state to the global defs.
     * @param {?} stateClasses
     * @return {?}
     */
    add(stateClasses) {
        StateFactory.checkStatesAreValid(stateClasses);
        const { newStates } = this.addToStatesMap(stateClasses);
        if (!newStates.length)
            return [];
        /** @type {?} */
        const stateGraph = buildGraph(newStates);
        /** @type {?} */
        const sortedStates = topologicalSort(stateGraph);
        /** @type {?} */
        const paths = findFullParentPath(stateGraph);
        /** @type {?} */
        const nameGraph = nameToState(newStates);
        /** @type {?} */
        const bootstrappedStores = [];
        for (const name of sortedStates) {
            /** @type {?} */
            const stateClass = nameGraph[name];
            /** @type {?} */
            const path = paths[name];
            /** @type {?} */
            const meta = (/** @type {?} */ (stateClass[META_KEY]));
            this.addRuntimeInfoToMeta(meta, path);
            /** @type {?} */
            const stateMap = {
                name,
                path,
                isInitialised: false,
                actions: meta.actions,
                instance: this._injector.get(stateClass),
                defaults: StateFactory.cloneDefaults(meta.defaults)
            };
            // ensure our store hasn't already been added
            // but don't throw since it could be lazy
            // loaded from different paths
            if (!this.hasBeenMountedAndBootstrapped(name, path)) {
                bootstrappedStores.push(stateMap);
            }
            this.states.push(stateMap);
        }
        return bootstrappedStores;
    }
    /**
     * Add a set of states to the store and return the defaults
     * @param {?} stateClasses
     * @return {?}
     */
    addAndReturnDefaults(stateClasses) {
        /** @type {?} */
        const classes = stateClasses || [];
        /** @type {?} */
        const mappedStores = this.add(classes);
        /** @type {?} */
        const defaults = mappedStores.reduce((/**
         * @param {?} result
         * @param {?} mappedStore
         * @return {?}
         */
        (result, mappedStore) => setValue(result, mappedStore.path, mappedStore.defaults)), {});
        return { defaults, states: mappedStores };
    }
    /**
     * Bind the actions to the handlers
     * @return {?}
     */
    connectActionHandlers() {
        if (this._actionsSubscription !== null)
            return;
        this._actionsSubscription = this._actions
            .pipe(filter((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => ctx.status === "DISPATCHED" /* Dispatched */)), mergeMap((/**
         * @param {?} __0
         * @return {?}
         */
        ({ action }) => this.invokeActions(this._actions, (/** @type {?} */ (action))).pipe(map((/**
         * @return {?}
         */
        () => (/** @type {?} */ ({ action, status: "SUCCESSFUL" /* Successful */ })))), defaultIfEmpty((/** @type {?} */ ({ action, status: "CANCELED" /* Canceled */ }))), catchError((/**
         * @param {?} error
         * @return {?}
         */
        error => of((/** @type {?} */ ({ action, status: "ERRORED" /* Errored */, error })))))))))
            .subscribe((/**
         * @param {?} ctx
         * @return {?}
         */
        ctx => this._actionResults.next(ctx)));
    }
    /**
     * Invoke actions on the states.
     * @param {?} actions$
     * @param {?} action
     * @return {?}
     */
    invokeActions(actions$, action) {
        /** @type {?} */
        const type = (/** @type {?} */ (getActionTypeFromInstance(action)));
        /** @type {?} */
        const results = [];
        for (const metadata of this.states) {
            /** @type {?} */
            const actionMetas = metadata.actions[type];
            if (actionMetas) {
                for (const actionMeta of actionMetas) {
                    /** @type {?} */
                    const stateContext = this._stateContextFactory.createStateContext(metadata);
                    try {
                        /** @type {?} */
                        let result = metadata.instance[actionMeta.fn](stateContext, action);
                        if (result instanceof Promise) {
                            result = from(result);
                        }
                        if (result instanceof Observable) {
                            // If this observable has been completed w/o emitting
                            // any value then we wouldn't want to complete the whole chain
                            // of actions. Since if any observable completes then
                            // action will be canceled.
                            // For instance if any action handler would've had such statement:
                            // `handler(ctx) { return EMPTY; }`
                            // then the action will be canceled.
                            // See https://github.com/ngxs/store/issues/1568
                            result = result.pipe(defaultIfEmpty({}));
                            if (actionMeta.options.cancelUncompleted) {
                                // todo: ofActionDispatched should be used with action class
                                result = result.pipe(takeUntil(actions$.pipe(ofActionDispatched((/** @type {?} */ (action))))));
                            }
                        }
                        else {
                            result = of({}).pipe(shareReplay());
                        }
                        results.push(result);
                    }
                    catch (e) {
                        results.push(throwError(e));
                    }
                }
            }
        }
        if (!results.length) {
            results.push(of({}));
        }
        return forkJoin(results);
    }
    /**
     * @private
     * @param {?} stateClasses
     * @return {?}
     */
    addToStatesMap(stateClasses) {
        /** @type {?} */
        const newStates = [];
        /** @type {?} */
        const statesMap = this.statesByName;
        for (const stateClass of stateClasses) {
            /** @type {?} */
            const stateName = StoreValidators.checkStateNameIsUnique(stateClass, statesMap);
            /** @type {?} */
            const unmountedState = !statesMap[stateName];
            if (unmountedState) {
                newStates.push(stateClass);
                statesMap[stateName] = stateClass;
            }
        }
        return { newStates };
    }
    /**
     * @private
     * @param {?} meta
     * @param {?} path
     * @return {?}
     */
    addRuntimeInfoToMeta(meta, path) {
        this.statePaths[(/** @type {?} */ (meta.name))] = path;
        // TODO: v4 - we plan to get rid of the path property because it is non-deterministic
        // we can do this when we get rid of the incorrectly exposed getStoreMetadata
        // We will need to come up with an alternative in v4 because this is used by many plugins
        meta.path = path;
    }
    /**
     * \@description
     * the method checks if the state has already been added to the tree
     * and completed the life cycle
     * @private
     * @param {?} name
     * @param {?} path
     * @return {?}
     */
    hasBeenMountedAndBootstrapped(name, path) {
        /** @type {?} */
        const valueIsBootstrappedInInitialState = getValue(this._initialState, path) !== undefined;
        return this.statesByName[name] && valueIsBootstrappedInInitialState;
    }
}
StateFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
StateFactory.ctorParameters = () => [
    { type: Injector },
    { type: NgxsConfig },
    { type: StateFactory, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: InternalActions },
    { type: InternalDispatchedActionResults },
    { type: StateContextFactory },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_STATE_TOKEN,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._actionsSubscription;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._states;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._statesByName;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._statePaths;
    /** @type {?} */
    StateFactory.prototype.getRuntimeSelectorContext;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._config;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._parentFactory;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._actionResults;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._stateContextFactory;
    /**
     * @type {?}
     * @private
     */
    StateFactory.prototype._initialState;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LifecycleStateManager {
    /**
     * @param {?} internalStateOperations
     * @param {?} stateContextFactory
     * @param {?} bootstrapper
     */
    constructor(internalStateOperations, stateContextFactory, bootstrapper) {
        this.internalStateOperations = internalStateOperations;
        this.stateContextFactory = stateContextFactory;
        this.bootstrapper = bootstrapper;
    }
    /**
     * @template T
     * @param {?} action
     * @param {?} results
     * @return {?}
     */
    ngxsBootstrap(action, results) {
        this.internalStateOperations
            .getRootStateOperations()
            .dispatch(action)
            .pipe(filter((/**
         * @return {?}
         */
        () => !!results)), tap((/**
         * @return {?}
         */
        () => this.invokeInit((/** @type {?} */ (results)).states))), mergeMap((/**
         * @return {?}
         */
        () => this.bootstrapper.appBootstrapped$)), filter((/**
         * @param {?} appBootstrapped
         * @return {?}
         */
        appBootstrapped => !!appBootstrapped)))
            .subscribe((/**
         * @return {?}
         */
        () => this.invokeBootstrap((/** @type {?} */ (results)).states)));
    }
    /**
     * Invoke the init function on the states.
     * @param {?} mappedStores
     * @return {?}
     */
    invokeInit(mappedStores) {
        for (const mappedStore of mappedStores) {
            /** @type {?} */
            const instance = mappedStore.instance;
            if (instance.ngxsOnChanges) {
                /** @type {?} */
                const currentAppState = {};
                /** @type {?} */
                const newAppState = this.internalStateOperations
                    .getRootStateOperations()
                    .getState();
                /** @type {?} */
                const firstDiffChange = getStateDiffChanges(mappedStore, {
                    currentAppState,
                    newAppState
                });
                instance.ngxsOnChanges(firstDiffChange);
            }
            if (instance.ngxsOnInit) {
                instance.ngxsOnInit(this.getStateContext(mappedStore));
            }
            mappedStore.isInitialised = true;
        }
    }
    /**
     * Invoke the bootstrap function on the states.
     * @param {?} mappedStores
     * @return {?}
     */
    invokeBootstrap(mappedStores) {
        for (const mappedStore of mappedStores) {
            /** @type {?} */
            const instance = mappedStore.instance;
            if (instance.ngxsAfterBootstrap) {
                instance.ngxsAfterBootstrap(this.getStateContext(mappedStore));
            }
        }
    }
    /**
     * @private
     * @param {?} mappedStore
     * @return {?}
     */
    getStateContext(mappedStore) {
        return this.stateContextFactory.createStateContext(mappedStore);
    }
}
LifecycleStateManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LifecycleStateManager.ctorParameters = () => [
    { type: InternalStateOperations },
    { type: StateContextFactory },
    { type: NgxsBootstrapper }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LifecycleStateManager.prototype.internalStateOperations;
    /**
     * @type {?}
     * @private
     */
    LifecycleStateManager.prototype.stateContextFactory;
    /**
     * @type {?}
     * @private
     */
    LifecycleStateManager.prototype.bootstrapper;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SELECTOR_OPTIONS_META_KEY = 'NGXS_SELECTOR_OPTIONS_META';
/** @type {?} */
const selectorOptionsMetaAccessor = {
    getOptions: (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        return (target && ((/** @type {?} */ (target)))[SELECTOR_OPTIONS_META_KEY]) || {};
    }),
    defineOptions: (/**
     * @param {?} target
     * @param {?} options
     * @return {?}
     */
    (target, options) => {
        if (!target)
            return;
        ((/** @type {?} */ (target)))[SELECTOR_OPTIONS_META_KEY] = options;
    })
};
/**
 * @record
 */
function CreationMetadata() { }
if (false) {
    /** @type {?} */
    CreationMetadata.prototype.containerClass;
    /** @type {?} */
    CreationMetadata.prototype.selectorName;
    /** @type {?|undefined} */
    CreationMetadata.prototype.getSelectorOptions;
}
/**
 * @record
 */
function RuntimeSelectorInfo() { }
if (false) {
    /** @type {?} */
    RuntimeSelectorInfo.prototype.selectorOptions;
    /** @type {?} */
    RuntimeSelectorInfo.prototype.argumentSelectorFunctions;
}
/**
 * Function for creating a selector
 * @template T
 * @param {?} selectors The selectors to use to create the arguments of this function
 * @param {?} originalFn The original function being made into a selector
 * @param {?=} creationMetadata
 * @return {?}
 */
function createSelector(selectors, originalFn, creationMetadata) {
    /** @type {?} */
    const containerClass = creationMetadata && creationMetadata.containerClass;
    /** @type {?} */
    const wrappedFn = (/** @type {?} */ ((/**
     * @param {...?} args
     * @return {?}
     */
    function wrappedSelectorFn(...args) {
        /** @type {?} */
        const returnValue = originalFn.apply(containerClass, args);
        if (returnValue instanceof Function) {
            /** @type {?} */
            const innerMemoizedFn = memoize.apply(null, [returnValue]);
            return innerMemoizedFn;
        }
        return returnValue;
    })));
    /** @type {?} */
    const memoizedFn = memoize(wrappedFn);
    Object.setPrototypeOf(memoizedFn, originalFn);
    /** @type {?} */
    const selectorMetaData = setupSelectorMetadata(originalFn, creationMetadata);
    /** @type {?} */
    const makeRootSelector = (/**
     * @param {?} context
     * @return {?}
     */
    (context) => {
        const { argumentSelectorFunctions, selectorOptions } = getRuntimeSelectorInfo(context, selectorMetaData, selectors);
        return (/**
         * @param {?} rootState
         * @return {?}
         */
        function selectFromRoot(rootState) {
            // Determine arguments from the app state using the selectors
            /** @type {?} */
            const results = argumentSelectorFunctions.map((/**
             * @param {?} argFn
             * @return {?}
             */
            argFn => argFn(rootState)));
            // if the lambda tries to access a something on the
            // state that doesn't exist, it will throw a TypeError.
            // since this is quite usual behaviour, we simply return undefined if so.
            try {
                return memoizedFn(...results);
            }
            catch (ex) {
                if (ex instanceof TypeError && selectorOptions.suppressErrors) {
                    return undefined;
                }
                throw ex;
            }
        });
    });
    selectorMetaData.makeRootSelector = makeRootSelector;
    return memoizedFn;
}
/**
 * @template T
 * @param {?} originalFn
 * @param {?} creationMetadata
 * @return {?}
 */
function setupSelectorMetadata(originalFn, creationMetadata) {
    /** @type {?} */
    const selectorMetaData = ensureSelectorMetadata(originalFn);
    selectorMetaData.originalFn = originalFn;
    /** @type {?} */
    let getExplicitSelectorOptions = (/**
     * @return {?}
     */
    () => ({}));
    if (creationMetadata) {
        selectorMetaData.containerClass = creationMetadata.containerClass;
        selectorMetaData.selectorName = creationMetadata.selectorName;
        getExplicitSelectorOptions =
            creationMetadata.getSelectorOptions || getExplicitSelectorOptions;
    }
    /** @type {?} */
    const selectorMetaDataClone = Object.assign({}, selectorMetaData);
    selectorMetaData.getSelectorOptions = (/**
     * @return {?}
     */
    () => getLocalSelectorOptions(selectorMetaDataClone, getExplicitSelectorOptions()));
    return selectorMetaData;
}
/**
 * @param {?} context
 * @param {?} selectorMetaData
 * @param {?=} selectors
 * @return {?}
 */
function getRuntimeSelectorInfo(context, selectorMetaData, selectors = []) {
    /** @type {?} */
    const localSelectorOptions = selectorMetaData.getSelectorOptions();
    /** @type {?} */
    const selectorOptions = context.getSelectorOptions(localSelectorOptions);
    /** @type {?} */
    const selectorsToApply = getSelectorsToApply(selectors, selectorOptions, selectorMetaData.containerClass);
    /** @type {?} */
    const argumentSelectorFunctions = selectorsToApply.map((/**
     * @param {?} selector
     * @return {?}
     */
    selector => {
        /** @type {?} */
        const factory = getRootSelectorFactory(selector);
        return factory(context);
    }));
    return {
        selectorOptions,
        argumentSelectorFunctions
    };
}
/**
 * @param {?} selectorMetaData
 * @param {?} explicitOptions
 * @return {?}
 */
function getLocalSelectorOptions(selectorMetaData, explicitOptions) {
    return Object.assign({}, (selectorOptionsMetaAccessor.getOptions(selectorMetaData.containerClass) || {}), (selectorOptionsMetaAccessor.getOptions(selectorMetaData.originalFn) || {}), (selectorMetaData.getSelectorOptions() || {}), explicitOptions);
}
/**
 * @param {?=} selectors
 * @param {?=} selectorOptions
 * @param {?=} containerClass
 * @return {?}
 */
function getSelectorsToApply(selectors = [], selectorOptions, containerClass) {
    /** @type {?} */
    const selectorsToApply = [];
    /** @type {?} */
    const canInjectContainerState = selectors.length === 0 || selectorOptions.injectContainerState;
    if (containerClass && canInjectContainerState) {
        // If we are on a state class, add it as the first selector parameter
        /** @type {?} */
        const metadata = getStoreMetadata(containerClass);
        if (metadata) {
            selectorsToApply.push(containerClass);
        }
    }
    if (selectors) {
        selectorsToApply.push(...selectors);
    }
    return selectorsToApply;
}
/**
 * This function gets the factory function to create the selector to get the selected slice from the app state
 * @ignore
 * @param {?} selector
 * @return {?}
 */
function getRootSelectorFactory(selector) {
    /** @type {?} */
    const metadata = getSelectorMetadata(selector) || getStoreMetadata(selector);
    return (metadata && metadata.makeRootSelector) || ((/**
     * @return {?}
     */
    () => selector));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Store {
    /**
     * @param {?} _stateStream
     * @param {?} _internalStateOperations
     * @param {?} _config
     * @param {?} _internalExecutionStrategy
     * @param {?} _stateFactory
     * @param {?} initialStateValue
     */
    constructor(_stateStream, _internalStateOperations, _config, _internalExecutionStrategy, _stateFactory, initialStateValue) {
        this._stateStream = _stateStream;
        this._internalStateOperations = _internalStateOperations;
        this._config = _config;
        this._internalExecutionStrategy = _internalExecutionStrategy;
        this._stateFactory = _stateFactory;
        this.initStateStream(initialStateValue);
    }
    /**
     * Dispatches event(s).
     * @param {?} actionOrActions
     * @return {?}
     */
    dispatch(actionOrActions) {
        return this._internalStateOperations.getRootStateOperations().dispatch(actionOrActions);
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    select(selector) {
        /** @type {?} */
        const selectorFn = this.getStoreBoundSelectorFn(selector);
        return this._stateStream.pipe(map(selectorFn), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            // if error is TypeError we swallow it to prevent usual errors with property access
            const { suppressErrors } = this._config.selectorOptions;
            if (err instanceof TypeError && suppressErrors) {
                return of(undefined);
            }
            // rethrow other errors
            return throwError(err);
        })), distinctUntilChanged(), leaveNgxs(this._internalExecutionStrategy));
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    selectOnce(selector) {
        return this.select(selector).pipe(take(1));
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    selectSnapshot(selector) {
        /** @type {?} */
        const selectorFn = this.getStoreBoundSelectorFn(selector);
        return selectorFn(this._stateStream.getValue());
    }
    /**
     * Allow the user to subscribe to the root of the state
     * @param {?=} fn
     * @return {?}
     */
    subscribe(fn) {
        return this._stateStream.pipe(leaveNgxs(this._internalExecutionStrategy)).subscribe(fn);
    }
    /**
     * Return the raw value of the state.
     * @return {?}
     */
    snapshot() {
        return this._internalStateOperations.getRootStateOperations().getState();
    }
    /**
     * Reset the state to a specific point in time. This method is useful
     * for plugin's who need to modify the state directly or unit testing.
     * @param {?} state
     * @return {?}
     */
    reset(state) {
        return this._internalStateOperations.getRootStateOperations().setState(state);
    }
    /**
     * @private
     * @param {?} selector
     * @return {?}
     */
    getStoreBoundSelectorFn(selector) {
        /** @type {?} */
        const makeSelectorFn = getRootSelectorFactory(selector);
        /** @type {?} */
        const runtimeContext = this._stateFactory.getRuntimeSelectorContext();
        return makeSelectorFn(runtimeContext);
    }
    /**
     * @private
     * @param {?} initialStateValue
     * @return {?}
     */
    initStateStream(initialStateValue) {
        /** @type {?} */
        const value = this._stateStream.value;
        /** @type {?} */
        const storeIsEmpty = !value || Object.keys(value).length === 0;
        if (storeIsEmpty) {
            /** @type {?} */
            const defaultStateNotEmpty = Object.keys(this._config.defaultsState).length > 0;
            /** @type {?} */
            const storeValues = defaultStateNotEmpty
                ? Object.assign({}, this._config.defaultsState, initialStateValue) : initialStateValue;
            this._stateStream.next(storeValues);
        }
    }
}
Store.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Store.ctorParameters = () => [
    { type: StateStream },
    { type: InternalStateOperations },
    { type: NgxsConfig },
    { type: InternalNgxsExecutionStrategy },
    { type: StateFactory },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_STATE_TOKEN,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Store.prototype._stateStream;
    /**
     * @type {?}
     * @private
     */
    Store.prototype._internalStateOperations;
    /**
     * @type {?}
     * @private
     */
    Store.prototype._config;
    /**
     * @type {?}
     * @private
     */
    Store.prototype._internalExecutionStrategy;
    /**
     * @type {?}
     * @private
     */
    Store.prototype._stateFactory;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Allows the select decorator to get access to the DI store.
 * \@internal only use in \@Select decorator
 * @ignore
 */
class SelectFactory {
    /**
     * @param {?} store
     * @param {?} config
     */
    constructor(store, config) {
        SelectFactory.store = store;
        SelectFactory.config = config;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        SelectFactory.store = null;
        SelectFactory.config = null;
    }
}
SelectFactory.store = null;
SelectFactory.config = null;
SelectFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectFactory.ctorParameters = () => [
    { type: Store },
    { type: NgxsConfig }
];
if (false) {
    /** @type {?} */
    SelectFactory.store;
    /** @type {?} */
    SelectFactory.config;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Init action
 */
class InitState {
    /**
     * @return {?}
     */
    static get type() {
        // NOTE: Not necessary to declare the type in this way in your code. See https://github.com/ngxs/store/pull/644#issuecomment-436003138
        return '@@INIT';
    }
}
/**
 * Update action
 */
class UpdateState {
    /**
     * @param {?=} addedStates
     */
    constructor(addedStates) {
        this.addedStates = addedStates;
    }
    /**
     * @return {?}
     */
    static get type() {
        // NOTE: Not necessary to declare the type in this way in your code. See https://github.com/ngxs/store/pull/644#issuecomment-436003138
        return '@@UPDATE_STATE';
    }
}
if (false) {
    /** @type {?} */
    UpdateState.prototype.addedStates;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ivyEnabledInDevMode$ = new ReplaySubject(1);
/**
 * Ivy exposes helper functions to the global `window.ng` object.
 * Those functions are `getComponent, getContext,
 * getListeners, getViewComponent, getHostElement, getInjector,
 * getRootComponents, getDirectives, getDebugNode`
 * Previously, old view engine exposed `window.ng.coreTokens` and
 * `window.ng.probe` if an application was in development/production.
 * Ivy doesn't expose these functions in production. Developers will be able
 * to see warnings in both JIT/AOT modes, but only if an application
 * is in development.
 * @return {?}
 */
function setIvyEnabledInDevMode() {
    try {
        // `try-catch` will also handle server-side rendering, as
        // `window is not defined` will not be thrown.
        /** @type {?} */
        const ng = ((/** @type {?} */ (window))).ng;
        /** @type {?} */
        const _viewEngineEnabled = !!ng.probe && !!ng.coreTokens;
        /** @type {?} */
        const _ivyEnabledInDevMode = !_viewEngineEnabled && isDevMode();
        ivyEnabledInDevMode$.next(_ivyEnabledInDevMode);
    }
    catch (_a) {
        ivyEnabledInDevMode$.next(false);
    }
    finally {
        ivyEnabledInDevMode$.complete();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Root module
 * @ignore
 */
class NgxsRootModule {
    /**
     * @param {?} factory
     * @param {?} internalStateOperations
     * @param {?} _store
     * @param {?} _select
     * @param {?=} states
     * @param {?=} lifecycleStateManager
     */
    constructor(factory, internalStateOperations, _store, _select, states = [], lifecycleStateManager) {
        // Validate states on having the `@Injectable()` decorator in Ivy
        setIvyEnabledInDevMode();
        // Add stores to the state graph and return their defaults
        /** @type {?} */
        const results = factory.addAndReturnDefaults(states);
        internalStateOperations.setStateToTheCurrentWithNew(results);
        // Connect our actions stream
        factory.connectActionHandlers();
        // Dispatch the init action and invoke init and bootstrap functions after
        lifecycleStateManager.ngxsBootstrap(new InitState(), results);
    }
}
NgxsRootModule.decorators = [
    { type: NgModule }
];
/** @nocollapse */
NgxsRootModule.ctorParameters = () => [
    { type: StateFactory },
    { type: InternalStateOperations },
    { type: Store },
    { type: SelectFactory },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [ROOT_STATE_TOKEN,] }] },
    { type: LifecycleStateManager }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Feature module
 * @ignore
 */
class NgxsFeatureModule {
    /**
     * @param {?} _store
     * @param {?} internalStateOperations
     * @param {?} factory
     * @param {?=} states
     * @param {?=} lifecycleStateManager
     */
    constructor(_store, internalStateOperations, factory, states = [], lifecycleStateManager) {
        // Since FEATURE_STATE_TOKEN is a multi token, we need to
        // flatten it [[Feature1State, Feature2State], [Feature3State]]
        /** @type {?} */
        const flattenedStates = NgxsFeatureModule.flattenStates(states);
        // add stores to the state graph and return their defaults
        /** @type {?} */
        const results = factory.addAndReturnDefaults(flattenedStates);
        if (results.states.length) {
            internalStateOperations.setStateToTheCurrentWithNew(results);
            // dispatch the update action and invoke init and bootstrap functions after
            lifecycleStateManager.ngxsBootstrap(new UpdateState(results.defaults), results);
        }
    }
    /**
     * @private
     * @param {?=} states
     * @return {?}
     */
    static flattenStates(states = []) {
        return states.reduce((/**
         * @param {?} total
         * @param {?} values
         * @return {?}
         */
        (total, values) => total.concat(values)), []);
    }
}
NgxsFeatureModule.decorators = [
    { type: NgModule }
];
/** @nocollapse */
NgxsFeatureModule.ctorParameters = () => [
    { type: Store },
    { type: InternalStateOperations },
    { type: StateFactory },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [FEATURE_STATE_TOKEN,] }] },
    { type: LifecycleStateManager }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Ngxs Module
 */
class NgxsModule {
    /**
     * Root module factory
     * @param {?=} states
     * @param {?=} options
     * @return {?}
     */
    static forRoot(states = [], options = {}) {
        return {
            ngModule: NgxsRootModule,
            providers: [
                StateFactory,
                StateContextFactory,
                Actions,
                InternalActions,
                NgxsBootstrapper,
                ConfigValidator,
                HostEnvironment,
                LifecycleStateManager,
                InternalDispatcher,
                InternalDispatchedActionResults,
                InternalStateOperations,
                InternalNgxsExecutionStrategy,
                Store,
                StateStream,
                SelectFactory,
                PluginManager,
                ...states,
                ...NgxsModule.ngxsTokenProviders(states, options)
            ]
        };
    }
    /**
     * Feature module factory
     * @param {?=} states
     * @return {?}
     */
    static forFeature(states = []) {
        return {
            ngModule: NgxsFeatureModule,
            providers: [
                StateFactory,
                PluginManager,
                ...states,
                {
                    provide: FEATURE_STATE_TOKEN,
                    multi: true,
                    useValue: states
                }
            ]
        };
    }
    /**
     * @private
     * @param {?} states
     * @param {?} options
     * @return {?}
     */
    static ngxsTokenProviders(states, options) {
        return [
            {
                provide: NG_TEST_MODE,
                useValue: isAngularInTestMode
            },
            {
                provide: NG_DEV_MODE,
                useValue: isDevMode
            },
            {
                provide: NGXS_EXECUTION_STRATEGY,
                useClass: options.executionStrategy || DispatchOutsideZoneNgxsExecutionStrategy
            },
            {
                provide: ROOT_STATE_TOKEN,
                useValue: states
            },
            {
                provide: NgxsModule.ROOT_OPTIONS,
                useValue: options
            },
            {
                provide: NgxsConfig,
                useFactory: NgxsModule.ngxsConfigFactory,
                deps: [NgxsModule.ROOT_OPTIONS]
            },
            {
                provide: APP_BOOTSTRAP_LISTENER,
                useFactory: NgxsModule.appBootstrapListenerFactory,
                multi: true,
                deps: [NgxsBootstrapper]
            },
            {
                provide: INITIAL_STATE_TOKEN,
                useFactory: NgxsModule.getInitialState
            },
            {
                provide: NGXS_STATE_CONTEXT_FACTORY,
                useExisting: StateContextFactory
            },
            {
                provide: NGXS_STATE_FACTORY,
                useExisting: StateFactory
            }
        ];
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    static ngxsConfigFactory(options) {
        return mergeDeep(new NgxsConfig(), options);
    }
    /**
     * @private
     * @param {?} bootstrapper
     * @return {?}
     */
    static appBootstrapListenerFactory(bootstrapper) {
        return (/**
         * @return {?}
         */
        () => bootstrapper.bootstrap());
    }
    /**
     * @private
     * @return {?}
     */
    static getInitialState() {
        return InitialState.pop();
    }
}
NgxsModule.ROOT_OPTIONS = new InjectionToken('ROOT_OPTIONS');
NgxsModule.decorators = [
    { type: NgModule }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxsModule.ROOT_OPTIONS;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorates a method with a action information.
 * @param {?} actions
 * @param {?=} options
 * @return {?}
 */
function Action(actions, options) {
    return (/**
     * @param {?} target
     * @param {?} name
     * @return {?}
     */
    (target, name) => {
        /** @type {?} */
        const isStaticMethod = target.hasOwnProperty('prototype');
        if (isStaticMethod) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.ACTION_DECORATOR]());
        }
        /** @type {?} */
        const meta = ensureStoreMetadata(target.constructor);
        if (!Array.isArray(actions)) {
            actions = [actions];
        }
        for (const action of actions) {
            /** @type {?} */
            const type = action.type;
            if (!meta.actions[type]) {
                meta.actions[type] = [];
            }
            meta.actions[type].push({
                fn: name,
                options: options || {},
                type
            });
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * All provided or injected tokens must have `\@Injectable` decorator
 * (previously, injected tokens without `\@Injectable` were allowed
 * if another decorator was used, e.g. pipes).
 * @param {?} target
 * @return {?}
 */
function ensureStateClassIsInjectable(target) {
    // `??prov` is a static property added by the NGCC compiler. It always exists in
    // AOT mode because this property is added before runtime. If an application is running in
    // JIT mode then this property can be added by the `@Injectable()` decorator. The `@Injectable()`
    // decorator has to go after the `@State()` decorator, thus we prevent users from unwanted DI errors.
    ivyEnabledInDevMode$.subscribe((/**
     * @param {?} _ivyEnabledInDevMode
     * @return {?}
     */
    _ivyEnabledInDevMode => {
        if (_ivyEnabledInDevMode) {
            /** @type {?} */
            /** @nocollapse */ const ngInjectableDef = target.??prov;
            if (!ngInjectableDef) {
                // Don't warn if Ivy is disabled or `??prov` exists on the class
                console.warn(CONFIG_MESSAGES[VALIDATION_CODE.UNDECORATED_STATE_IN_IVY](target.name));
            }
        }
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function MutateMetaOptions() { }
if (false) {
    /** @type {?} */
    MutateMetaOptions.prototype.meta;
    /** @type {?} */
    MutateMetaOptions.prototype.inheritedStateClass;
    /** @type {?} */
    MutateMetaOptions.prototype.optionsWithInheritance;
}
/**
 * Decorates a class with ngxs state information.
 * @template T
 * @param {?} options
 * @return {?}
 */
function State(options) {
    /**
     * @param {?} inheritedStateClass
     * @return {?}
     */
    function getStateOptions(inheritedStateClass) {
        /** @type {?} */
        const inheritanceOptions = inheritedStateClass[META_OPTIONS_KEY] || {};
        return (/** @type {?} */ (Object.assign({}, inheritanceOptions, options)));
    }
    /**
     * @param {?} params
     * @return {?}
     */
    function mutateMetaData(params) {
        const { meta, inheritedStateClass, optionsWithInheritance } = params;
        const { children, defaults, name } = optionsWithInheritance;
        /** @type {?} */
        const stateName = typeof name === 'string' ? name : (name && name.getName()) || null;
        StoreValidators.checkCorrectStateName(stateName);
        if (inheritedStateClass.hasOwnProperty(META_KEY)) {
            /** @type {?} */
            const inheritedMeta = inheritedStateClass[META_KEY] || {};
            meta.actions = Object.assign({}, meta.actions, inheritedMeta.actions);
        }
        meta.children = children;
        meta.defaults = defaults;
        meta.name = stateName;
    }
    return (/**
     * @param {?} target
     * @return {?}
     */
    (target) => {
        ensureStateClassIsInjectable(target);
        /** @type {?} */
        const stateClass = target;
        /** @type {?} */
        const meta = ensureStoreMetadata(stateClass);
        /** @type {?} */
        const inheritedStateClass = Object.getPrototypeOf(stateClass);
        /** @type {?} */
        const optionsWithInheritance = getStateOptions(inheritedStateClass);
        mutateMetaData({ meta, inheritedStateClass, optionsWithInheritance });
        stateClass[META_OPTIONS_KEY] = optionsWithInheritance;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DOLLAR_CHAR_CODE = 36;
/**
 * @template T
 * @param {?} selector
 * @return {?}
 */
function createSelectObservable(selector) {
    if (!SelectFactory.store) {
        throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.SELECT_FACTORY_NOT_CONNECTED]());
    }
    return SelectFactory.store.select(selector);
}
/**
 * @param {?} name
 * @param {?=} rawSelector
 * @param {?=} paths
 * @return {?}
 */
function createSelectorFn(name, rawSelector, paths = []) {
    rawSelector = !rawSelector ? removeDollarAtTheEnd(name) : rawSelector;
    if (typeof rawSelector === 'string') {
        /** @type {?} */
        const propsArray = paths.length
            ? [rawSelector, ...paths]
            : rawSelector.split('.');
        return propGetter(propsArray, (/** @type {?} */ (SelectFactory.config)));
    }
    return rawSelector;
}
/**
 * \@example If `foo$` => make it just `foo`
 * @param {?} name
 * @return {?}
 */
function removeDollarAtTheEnd(name) {
    /** @type {?} */
    const lastCharIndex = name.length - 1;
    /** @type {?} */
    const dollarAtTheEnd = name.charCodeAt(lastCharIndex) === DOLLAR_CHAR_CODE;
    return dollarAtTheEnd ? name.slice(0, lastCharIndex) : name;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorator for selecting a slice of state from the store.
 * @template T
 * @param {?=} rawSelector
 * @param {...?} paths
 * @return {?}
 */
function Select(rawSelector, ...paths) {
    return (/**
     * @param {?} target
     * @param {?} key
     * @return {?}
     */
    function (target, key) {
        /** @type {?} */
        const name = key.toString();
        /** @type {?} */
        const selectorId = `__${name}__selector`;
        /** @type {?} */
        const selector = createSelectorFn(name, rawSelector, paths);
        Object.defineProperties(target, {
            [selectorId]: {
                writable: true,
                enumerable: false,
                configurable: true
            },
            [name]: {
                enumerable: true,
                configurable: true,
                /**
                 * @return {?}
                 */
                get() {
                    return this[selectorId] || (this[selectorId] = createSelectObservable(selector));
                }
            }
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorator for setting selector options at a method or class level.
 * @param {?} options
 * @return {?}
 */
function SelectorOptions(options) {
    return (/** @type {?} */ (((/**
     * @template T
     * @param {?} target
     * @param {?} methodName
     * @param {?} descriptor
     * @return {?}
     */
    function decorate(target, methodName, descriptor) {
        if (methodName) {
            // Method Decorator
            /** @type {?} */
            const originalFn = descriptor.value || ((/** @type {?} */ (descriptor))).originalFn;
            if (originalFn) {
                selectorOptionsMetaAccessor.defineOptions(originalFn, options);
            }
        }
        else {
            // Class Decorator
            selectorOptionsMetaAccessor.defineOptions(target, options);
        }
    }))));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function MetaDataModel$1() { }
if (false) {
    /** @type {?} */
    MetaDataModel$1.prototype.name;
    /** @type {?} */
    MetaDataModel$1.prototype.actions;
    /** @type {?} */
    MetaDataModel$1.prototype.defaults;
    /** @type {?} */
    MetaDataModel$1.prototype.path;
    /** @type {?|undefined} */
    MetaDataModel$1.prototype.children;
}
/**
 * @record
 */
function SelectorMetaDataModel$1() { }
if (false) {
    /** @type {?} */
    SelectorMetaDataModel$1.prototype.originalFn;
    /** @type {?} */
    SelectorMetaDataModel$1.prototype.containerClass;
    /** @type {?} */
    SelectorMetaDataModel$1.prototype.selectorName;
    /** @type {?} */
    SelectorMetaDataModel$1.prototype.getSelectorOptions;
}
/**
 * @param {?} target
 * @return {?}
 */
function ensureStoreMetadata$1(target) {
    return ensureStoreMetadata(target);
}
/**
 * @param {?} target
 * @return {?}
 */
function getStoreMetadata$1(target) {
    return getStoreMetadata(target);
}
/**
 * @param {?} target
 * @return {?}
 */
function ensureSelectorMetadata$1(target) {
    return ensureSelectorMetadata(target);
}
/**
 * @param {?} target
 * @return {?}
 */
function getSelectorMetadata$1(target) {
    return getSelectorMetadata(target);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorator for memoizing a state selector.
 * @template T
 * @param {?=} selectors
 * @return {?}
 */
function Selector(selectors) {
    return (/**
     * @template U
     * @param {?} target
     * @param {?} key
     * @param {?} descriptor
     * @return {?}
     */
    (target, key, descriptor) => {
        /** @type {?} */
        const isNotMethod = !(descriptor && descriptor.value !== null);
        if (isNotMethod) {
            throw new Error(CONFIG_MESSAGES[VALIDATION_CODE.SELECTOR_DECORATOR]());
        }
        /** @type {?} */
        const originalFn = descriptor.value;
        /** @type {?} */
        const memoizedFn = createSelector(selectors, (/** @type {?} */ (originalFn)), {
            containerClass: target,
            selectorName: key.toString(),
            /**
             * @return {?}
             */
            getSelectorOptions() {
                return {};
            }
        });
        /** @type {?} */
        const newDescriptor = {
            configurable: true,
            /**
             * @return {?}
             */
            get() {
                return memoizedFn;
            }
        };
        // Add hidden property to descriptor
        ((/** @type {?} */ (newDescriptor)))['originalFn'] = originalFn;
        return newDescriptor;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NoopNgxsExecutionStrategy {
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    enter(func) {
        return func();
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    leave(func) {
        return func();
    }
}
NoopNgxsExecutionStrategy.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class StateToken {
    /**
     * @param {?} name
     */
    constructor(name) {
        this.name = name;
        /** @type {?} */
        const selectorMetadata = ensureSelectorMetadata((/** @type {?} */ (this)));
        selectorMetadata.makeRootSelector = (/**
         * @param {?} runtimeContext
         * @return {?}
         */
        (runtimeContext) => {
            return runtimeContext.getStateGetter(this.name);
        });
    }
    /**
     * @return {?}
     */
    getName() {
        return this.name;
    }
    /**
     * @return {?}
     */
    toString() {
        return `StateToken[${this.name}]`;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StateToken.prototype.name;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Action, Actions, InitState, NGXS_PLUGINS, NgxsModule, NgxsSimpleChange, NoopNgxsExecutionStrategy, Select, Selector, SelectorOptions, State, StateStream, StateToken, Store, UpdateState, actionMatcher, createSelector, ensureSelectorMetadata$1 as ensureSelectorMetadata, ensureStoreMetadata$1 as ensureStoreMetadata, getActionTypeFromInstance, getSelectorMetadata$1 as getSelectorMetadata, getStoreMetadata$1 as getStoreMetadata, getValue, ofAction, ofActionCanceled, ofActionCompleted, ofActionDispatched, ofActionErrored, ofActionSuccessful, setValue, OrderedSubject as ??a, InternalActions as ??b, SelectFactory as ??ba, LifecycleStateManager as ??bb, NgxsFeatureModule as ??bc, DispatchOutsideZoneNgxsExecutionStrategy as ??bd, ROOT_STATE_TOKEN as ??c, FEATURE_STATE_TOKEN as ??d, NG_TEST_MODE as ??e, NG_DEV_MODE as ??f, SELECTOR_META_KEY as ??g, NgxsConfig as ??h, mergeDeep as ??i, NGXS_EXECUTION_STRATEGY as ??j, NgxsRootModule as ??k, StateFactory as ??l, InternalDispatchedActionResults as ??m, InternalDispatcher as ??n, StateContextFactory as ??o, InternalStateOperations as ??p, PluginManager as ??q, InternalNgxsExecutionStrategy as ??r, ConfigValidator as ??s, HostEnvironment as ??t, ensureStoreMetadata as ??w, getStoreMetadata as ??x, ensureSelectorMetadata as ??y, getSelectorMetadata as ??z };
//# sourceMappingURL=ngxs-store.js.map
