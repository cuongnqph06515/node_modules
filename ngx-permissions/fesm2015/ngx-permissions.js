import { Injectable, InjectionToken, Inject, EventEmitter, Directive, ViewContainerRef, ChangeDetectorRef, TemplateRef, Input, Output, NgModule } from '@angular/core';
import { BehaviorSubject, of, from, merge, forkJoin } from 'rxjs';
import { map, switchMap, catchError, mergeAll, first, mergeMap, every, skip, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NgxPermissionsPredefinedStrategies = {
    REMOVE: 'remove',
    SHOW: 'show'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsConfigurationStore {
    constructor() {
        this.strategiesSource = new BehaviorSubject({});
        this.strategies$ = this.strategiesSource.asObservable();
    }
}
NgxPermissionsConfigurationStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsConfigurationStore.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const USE_CONFIGURATION_STORE = new InjectionToken('USE_CONFIGURATION_STORE');
class NgxPermissionsConfigurationService {
    /**
     * @param {?=} isolate
     * @param {?=} configurationStore
     */
    constructor(isolate = false, configurationStore) {
        this.isolate = isolate;
        this.configurationStore = configurationStore;
        this.strategiesSource = this.isolate ? new BehaviorSubject({}) : this.configurationStore.strategiesSource;
        this.strategies$ = this.strategiesSource.asObservable();
        this.onAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onAuthorisedDefaultStrategy;
        this.onUnAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onUnAuthorisedDefaultStrategy;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setDefaultOnAuthorizedStrategy(name) {
        if (this.isolate) {
            this.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onAuthorisedDefaultStrategy = this.configurationStore.onAuthorisedDefaultStrategy;
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setDefaultOnUnauthorizedStrategy(name) {
        if (this.isolate) {
            this.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
        }
        else {
            this.configurationStore.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            this.onUnAuthorisedDefaultStrategy = this.configurationStore.onUnAuthorisedDefaultStrategy;
        }
    }
    /**
     * @param {?} key
     * @param {?} func
     * @return {?}
     */
    addPermissionStrategy(key, func) {
        this.strategiesSource.value[key] = func;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getStrategy(key) {
        return this.strategiesSource.value[key];
    }
    /**
     * @return {?}
     */
    getAllStrategies() {
        return this.strategiesSource.value;
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    getDefinedStrategy(name) {
        if (this.strategiesSource.value[name] || this.isPredefinedStrategy(name)) {
            return name;
        }
        else {
            throw new Error(`No ' ${name} ' strategy is found please define one`);
        }
    }
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    isPredefinedStrategy(strategy) {
        return strategy === NgxPermissionsPredefinedStrategies.SHOW || strategy === NgxPermissionsPredefinedStrategies.REMOVE;
    }
}
NgxPermissionsConfigurationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsConfigurationService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_CONFIGURATION_STORE,] }] },
    { type: NgxPermissionsConfigurationStore }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsStore {
    constructor() {
        this.permissionsSource = new BehaviorSubject({});
        this.permissions$ = this.permissionsSource.asObservable();
    }
}
NgxPermissionsStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsStore.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} functionToCheck
 * @return {?}
 */
function isFunction(functionToCheck) {
    /** @type {?} */
    let getType = {};
    return !!functionToCheck && functionToCheck instanceof Function && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * @param {?} value
 * @return {?}
 */
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    else {
        /** @type {?} */
        let prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function isString(value) {
    return !!value && typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * @param {?} promise
 * @return {?}
 */
function isPromise(promise) {
    return Object.prototype.toString.call(promise) === '[object Promise]';
}
/**
 * @param {?} value
 * @return {?}
 */
function notEmptyValue(value) {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return !!value;
}
/**
 * @param {?} value
 * @return {?}
 */
function transformStringToArray(value) {
    if (isString(value)) {
        return [value];
    }
    return value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const USE_PERMISSIONS_STORE = new InjectionToken('USE_PERMISSIONS_STORE');
class NgxPermissionsService {
    /**
     * @param {?=} isolate
     * @param {?=} permissionsStore
     */
    constructor(isolate = false, permissionsStore) {
        this.isolate = isolate;
        this.permissionsStore = permissionsStore;
        this.permissionsSource = isolate ? new BehaviorSubject({}) : permissionsStore.permissionsSource;
        this.permissions$ = this.permissionsSource.asObservable();
    }
    /**
     * Remove all permissions from permissions source
     * @return {?}
     */
    flushPermissions() {
        this.permissionsSource.next({});
    }
    /**
     * @param {?} permission
     * @return {?}
     */
    hasPermission(permission) {
        if (!permission || (Array.isArray(permission) && permission.length === 0)) {
            return Promise.resolve(true);
        }
        permission = transformStringToArray(permission);
        return this.hasArrayPermission(permission);
    }
    /**
     * @param {?} permissions
     * @param {?=} validationFunction
     * @return {?}
     */
    loadPermissions(permissions, validationFunction) {
        /** @type {?} */
        const newPermissions = permissions.reduce((/**
         * @param {?} source
         * @param {?} p
         * @return {?}
         */
        (source, p) => this.reducePermission(source, p, validationFunction)), {});
        this.permissionsSource.next(newPermissions);
    }
    /**
     * @param {?} permission
     * @param {?=} validationFunction
     * @return {?}
     */
    addPermission(permission, validationFunction) {
        if (Array.isArray(permission)) {
            /** @type {?} */
            const permissions = permission.reduce((/**
             * @param {?} source
             * @param {?} p
             * @return {?}
             */
            (source, p) => this.reducePermission(source, p, validationFunction)), this.permissionsSource.value);
            this.permissionsSource.next(permissions);
        }
        else {
            /** @type {?} */
            const permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);
            this.permissionsSource.next(permissions);
        }
    }
    /**
     * @param {?} permissionName
     * @return {?}
     */
    removePermission(permissionName) {
        /** @type {?} */
        const permissions = Object.assign({}, this.permissionsSource.value);
        delete permissions[permissionName];
        this.permissionsSource.next(permissions);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getPermission(name) {
        return this.permissionsSource.value[name];
    }
    /**
     * @return {?}
     */
    getPermissions() {
        return this.permissionsSource.value;
    }
    /**
     * @private
     * @param {?} source
     * @param {?} name
     * @param {?=} validationFunction
     * @return {?}
     */
    reducePermission(source, name, validationFunction) {
        if (!!validationFunction && isFunction(validationFunction)) {
            return Object.assign({}, source, { [name]: { name, validationFunction } });
        }
        else {
            return Object.assign({}, source, { [name]: { name } });
        }
    }
    /**
     * @private
     * @param {?} permissions
     * @return {?}
     */
    hasArrayPermission(permissions) {
        /** @type {?} */
        const promises = permissions.map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (this.hasPermissionValidationFunction(key)) {
                /** @type {?} */
                const immutableValue = Object.assign({}, this.permissionsSource.value);
                /** @type {?} */
                const validationFunction = (/** @type {?} */ (this.permissionsSource.value[key].validationFunction));
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                () => validationFunction(key, immutableValue))), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                (promise) => isBoolean(promise) ?
                    of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)))), catchError((/**
                 * @return {?}
                 */
                () => of(false))));
            }
            // check for name of the permission if there is no validation function
            return of(!!this.permissionsSource.value[key]);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data !== false), false), map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data === false ? false : true))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    hasPermissionValidationFunction(key) {
        return !!this.permissionsSource.value[key] &&
            !!this.permissionsSource.value[key].validationFunction &&
            isFunction(this.permissionsSource.value[key].validationFunction);
    }
}
NgxPermissionsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_PERMISSIONS_STORE,] }] },
    { type: NgxPermissionsStore }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxRolesStore {
    constructor() {
        this.rolesSource = new BehaviorSubject({});
        this.roles$ = this.rolesSource.asObservable();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');
class NgxRolesService {
    /**
     * @param {?=} isolate
     * @param {?=} rolesStore
     * @param {?=} permissionsService
     */
    constructor(isolate = false, rolesStore, permissionsService) {
        this.isolate = isolate;
        this.rolesStore = rolesStore;
        this.permissionsService = permissionsService;
        this.rolesSource = this.isolate ? new BehaviorSubject({}) : this.rolesStore.rolesSource;
        this.roles$ = this.rolesSource.asObservable();
    }
    /**
     * @param {?} name
     * @param {?} validationFunction
     * @return {?}
     */
    addRole(name, validationFunction) {
        /** @type {?} */
        const roles = Object.assign({}, this.rolesSource.value, { [name]: { name, validationFunction } });
        this.rolesSource.next(roles);
    }
    /**
     * @param {?} rolesObj
     * @return {?}
     */
    addRoles(rolesObj) {
        Object.keys(rolesObj).forEach((/**
         * @param {?} key
         * @param {?} index
         * @return {?}
         */
        (key, index) => {
            this.addRole(key, rolesObj[key]);
        }));
    }
    /**
     * @return {?}
     */
    flushRoles() {
        this.rolesSource.next({});
    }
    /**
     * @param {?} roleName
     * @return {?}
     */
    removeRole(roleName) {
        /** @type {?} */
        let roles = Object.assign({}, this.rolesSource.value);
        delete roles[roleName];
        this.rolesSource.next(roles);
    }
    /**
     * @return {?}
     */
    getRoles() {
        return this.rolesSource.value;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getRole(name) {
        return this.rolesSource.value[name];
    }
    /**
     * @param {?} names
     * @return {?}
     */
    hasOnlyRoles(names) {
        /** @type {?} */
        const isNamesEmpty = !names || (Array.isArray(names) && names.length === 0);
        if (isNamesEmpty)
            return Promise.resolve(true);
        names = transformStringToArray(names);
        return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasRoles, hasPermissions]) => {
            return hasRoles || hasPermissions;
        }));
    }
    /**
     * @private
     * @param {?} roleName
     * @return {?}
     */
    hasRoleKey(roleName) {
        /** @type {?} */
        const promises = roleName.map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            /** @type {?} */
            const hasValidationFunction = !!this.rolesSource.value[key] &&
                !!this.rolesSource.value[key].validationFunction &&
                isFunction(this.rolesSource.value[key].validationFunction);
            if (hasValidationFunction && !isPromise(this.rolesSource.value[key].validationFunction)) {
                /** @type {?} */
                const validationFunction = (/** @type {?} */ (this.rolesSource.value[key].validationFunction));
                /** @type {?} */
                const immutableValue = Object.assign({}, this.rolesSource.value);
                return of(null).pipe(map((/**
                 * @return {?}
                 */
                () => validationFunction(key, immutableValue))), switchMap((/**
                 * @param {?} promise
                 * @return {?}
                 */
                (promise) => isBoolean(promise) ?
                    of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)))), catchError((/**
                 * @return {?}
                 */
                () => of(false))));
            }
            return of(false);
        }));
        return from(promises).pipe(mergeAll(), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data !== false), false), map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data !== false))).toPromise().then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => data));
    }
    /**
     * @private
     * @param {?} roles
     * @param {?} roleNames
     * @return {?}
     */
    hasRolePermission(roles, roleNames) {
        return from(roleNames).pipe(mergeMap((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                return from((/** @type {?} */ (roles[key].validationFunction))).pipe(mergeMap((/**
                 * @param {?} permission
                 * @return {?}
                 */
                (permission) => this.permissionsService.hasPermission(permission))), every((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                (hasPermissions) => hasPermissions === true)));
            }
            return of(false);
        })), first((/**
         * @param {?} hasPermission
         * @return {?}
         */
        (hasPermission) => hasPermission === true), false)).toPromise();
    }
}
NgxRolesService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxRolesService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_ROLES_STORE,] }] },
    { type: NgxRolesStore },
    { type: NgxPermissionsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsDirective {
    /**
     * @param {?} permissionsService
     * @param {?} configurationService
     * @param {?} rolesService
     * @param {?} viewContainer
     * @param {?} changeDetector
     * @param {?} templateRef
     */
    constructor(permissionsService, configurationService, rolesService, viewContainer, changeDetector, templateRef) {
        this.permissionsService = permissionsService;
        this.configurationService = configurationService;
        this.rolesService = rolesService;
        this.viewContainer = viewContainer;
        this.changeDetector = changeDetector;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
        // skip first run cause merge will fire twice
        this.firstMergeUnusedRun = 1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewContainer.clear();
        this.initPermissionSubscription = this.validateExceptOnlyPermissions();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const onlyChanges = changes['ngxPermissionsOnly'];
        /** @type {?} */
        const exceptChanges = changes['ngxPermissionsExcept'];
        if (onlyChanges || exceptChanges) {
            // Due to bug when you pass empty array
            if (onlyChanges && onlyChanges.firstChange)
                return;
            if (exceptChanges && exceptChanges.firstChange)
                return;
            merge(this.permissionsService.permissions$, this.rolesService.roles$)
                .pipe(skip(this.firstMergeUnusedRun), take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                if (notEmptyValue(this.ngxPermissionsExcept)) {
                    this.validateExceptAndOnlyPermissions();
                    return;
                }
                if (notEmptyValue(this.ngxPermissionsOnly)) {
                    this.validateOnlyPermissions();
                    return;
                }
                this.handleAuthorisedPermission(this.getAuthorisedTemplates());
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.initPermissionSubscription) {
            this.initPermissionSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    validateExceptOnlyPermissions() {
        return merge(this.permissionsService.permissions$, this.rolesService.roles$)
            .pipe(skip(this.firstMergeUnusedRun))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (notEmptyValue(this.ngxPermissionsExcept)) {
                this.validateExceptAndOnlyPermissions();
                return;
            }
            if (notEmptyValue(this.ngxPermissionsOnly)) {
                this.validateOnlyPermissions();
                return;
            }
            this.handleAuthorisedPermission(this.getAuthorisedTemplates());
        }));
    }
    /**
     * @private
     * @return {?}
     */
    validateExceptAndOnlyPermissions() {
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept)])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermission, hasRole]) => {
            if (hasPermission || hasRole) {
                this.handleUnauthorisedPermission(this.ngxPermissionsExceptElse || this.ngxPermissionsElse);
                return;
            }
            if (!!this.ngxPermissionsOnly)
                throw false;
            this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
        })).catch((/**
         * @return {?}
         */
        () => {
            if (!!this.ngxPermissionsOnly) {
                this.validateOnlyPermissions();
            }
            else {
                this.handleAuthorisedPermission(this.ngxPermissionsExceptThen || this.ngxPermissionsThen || this.templateRef);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    validateOnlyPermissions() {
        Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly)])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermissions, hasRoles]) => {
            if (hasPermissions || hasRoles) {
                this.handleAuthorisedPermission(this.ngxPermissionsOnlyThen || this.ngxPermissionsThen || this.templateRef);
            }
            else {
                this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
            }
        })).catch((/**
         * @return {?}
         */
        () => {
            this.handleUnauthorisedPermission(this.ngxPermissionsOnlyElse || this.ngxPermissionsElse);
        }));
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    handleUnauthorisedPermission(template) {
        if (isBoolean(this.currentAuthorizedState) && !this.currentAuthorizedState)
            return;
        this.currentAuthorizedState = false;
        this.permissionsUnauthorized.emit();
        if (this.getUnAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getUnAuthorizedStrategyInput());
            return;
        }
        if (this.configurationService.onUnAuthorisedDefaultStrategy && !this.elseBlockDefined()) {
            this.applyStrategy(this.configurationService.onUnAuthorisedDefaultStrategy);
        }
        else {
            this.showTemplateBlockInView(template);
        }
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    handleAuthorisedPermission(template) {
        if (isBoolean(this.currentAuthorizedState) && this.currentAuthorizedState)
            return;
        this.currentAuthorizedState = true;
        this.permissionsAuthorized.emit();
        if (this.getAuthorizedStrategyInput()) {
            this.applyStrategyAccordingToStrategyType(this.getAuthorizedStrategyInput());
            return;
        }
        if (this.configurationService.onAuthorisedDefaultStrategy && !this.thenBlockDefined()) {
            this.applyStrategy(this.configurationService.onAuthorisedDefaultStrategy);
        }
        else {
            this.showTemplateBlockInView(template);
        }
    }
    /**
     * @private
     * @param {?} strategy
     * @return {?}
     */
    applyStrategyAccordingToStrategyType(strategy) {
        if (isString(strategy)) {
            this.applyStrategy(strategy);
            return;
        }
        if (isFunction(strategy)) {
            this.showTemplateBlockInView(this.templateRef);
            ((/** @type {?} */ (strategy)))(this.templateRef);
            return;
        }
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    showTemplateBlockInView(template) {
        this.viewContainer.clear();
        if (!template) {
            return;
        }
        this.viewContainer.createEmbeddedView(template);
        this.changeDetector.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorisedTemplates() {
        return this.ngxPermissionsOnlyThen
            || this.ngxPermissionsExceptThen
            || this.ngxPermissionsThen
            || this.templateRef;
    }
    /**
     * @private
     * @return {?}
     */
    elseBlockDefined() {
        return !!this.ngxPermissionsExceptElse || !!this.ngxPermissionsElse;
    }
    /**
     * @private
     * @return {?}
     */
    thenBlockDefined() {
        return !!this.ngxPermissionsExceptThen || !!this.ngxPermissionsThen;
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorizedStrategyInput() {
        return this.ngxPermissionsOnlyAuthorisedStrategy ||
            this.ngxPermissionsExceptAuthorisedStrategy ||
            this.ngxPermissionsAuthorisedStrategy;
    }
    /**
     * @private
     * @return {?}
     */
    getUnAuthorizedStrategyInput() {
        return this.ngxPermissionsOnlyUnauthorisedStrategy ||
            this.ngxPermissionsExceptUnauthorisedStrategy ||
            this.ngxPermissionsUnauthorisedStrategy;
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    applyStrategy(str) {
        if (str === NgxPermissionsPredefinedStrategies.SHOW) {
            this.showTemplateBlockInView(this.templateRef);
            return;
        }
        if (str === NgxPermissionsPredefinedStrategies.REMOVE) {
            this.viewContainer.clear();
            return;
        }
        /** @type {?} */
        const strategy = this.configurationService.getStrategy(str);
        this.showTemplateBlockInView(this.templateRef);
        strategy(this.templateRef);
    }
}
NgxPermissionsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            },] }
];
/** @nocollapse */
NgxPermissionsDirective.ctorParameters = () => [
    { type: NgxPermissionsService },
    { type: NgxPermissionsConfigurationService },
    { type: NgxRolesService },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: TemplateRef }
];
NgxPermissionsDirective.propDecorators = {
    ngxPermissionsOnly: [{ type: Input }],
    ngxPermissionsOnlyThen: [{ type: Input }],
    ngxPermissionsOnlyElse: [{ type: Input }],
    ngxPermissionsExcept: [{ type: Input }],
    ngxPermissionsExceptElse: [{ type: Input }],
    ngxPermissionsExceptThen: [{ type: Input }],
    ngxPermissionsThen: [{ type: Input }],
    ngxPermissionsElse: [{ type: Input }],
    ngxPermissionsOnlyAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsOnlyUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsAuthorisedStrategy: [{ type: Input }],
    permissionsAuthorized: [{ type: Output }],
    permissionsUnauthorized: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsGuard {
    /**
     * @param {?} permissionsService
     * @param {?} rolesService
     * @param {?} router
     */
    constructor(permissionsService, rolesService, router) {
        this.permissionsService = permissionsService;
        this.rolesService = rolesService;
        this.router = router;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        return this.hasPermissions(route, state);
    }
    /**
     * @param {?} childRoute
     * @param {?} state
     * @return {?}
     */
    canActivateChild(childRoute, state) {
        return this.hasPermissions(childRoute, state);
    }
    /**
     * @param {?} route
     * @return {?}
     */
    canLoad(route) {
        return this.hasPermissions(route);
    }
    /**
     * @private
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    hasPermissions(route, state) {
        /** @type {?} */
        const purePermissions = !!route && route.data ? (/** @type {?} */ (route.data['permissions'])) : {};
        /** @type {?} */
        let permissions = this.transformPermission(purePermissions, route, state);
        if (this.isParameterAvailable(permissions.except)) {
            return this.passingExceptPermissionsValidation(permissions, route, state);
        }
        if (this.isParameterAvailable(permissions.only)) {
            return this.passingOnlyPermissionsValidation(permissions, route, state);
        }
        return true;
    }
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    transformPermission(purePermissions, route, state) {
        /** @type {?} */
        let permissions = Object.assign({}, purePermissions);
        if (isFunction(permissions.except)) {
            permissions.except = ((/** @type {?} */ (permissions.except)))(route, state);
        }
        if (isFunction(permissions.only)) {
            permissions.only = ((/** @type {?} */ (permissions.only)))(route, state);
        }
        permissions.except = transformStringToArray(permissions.except);
        permissions.only = transformStringToArray(permissions.only);
        return permissions;
    }
    /**
     * @private
     * @param {?} permission
     * @return {?}
     */
    isParameterAvailable(permission) {
        return !!(permission) && permission.length > 0;
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    passingExceptPermissionsValidation(permissions, route, state) {
        if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo)))) {
            /** @type {?} */
            let failedPermission = '';
            return from((/** @type {?} */ (permissions.except))).pipe(mergeMap((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                return forkJoin([
                    this.permissionsService.hasPermission((/** @type {?} */ (data))),
                    this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
                ]).pipe(tap((/**
                 * @param {?} hasPermissions
                 * @return {?}
                 */
                (hasPermissions) => {
                    /** @type {?} */
                    const dontHavePermissions = hasPermissions.every((/**
                     * @param {?} data
                     * @return {?}
                     */
                    (data) => data === false));
                    if (!dontHavePermissions) {
                        failedPermission = data;
                    }
                })));
            })), first((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data.some((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data === true))), false), mergeMap((/**
             * @param {?} isAllFalse
             * @return {?}
             */
            (isAllFalse) => {
                if (!!failedPermission) {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    return of(false);
                }
                if (!isAllFalse && permissions.only) {
                    return this.onlyRedirectCheck(permissions, route, state);
                }
                return of(!isAllFalse);
            }))).toPromise();
        }
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.except))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.except)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermission, hasRoles]) => {
            if (hasPermission || hasRoles) {
                if (permissions.redirectTo) {
                    this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                }
                return false;
            }
            if (permissions.only) {
                return this.checkOnlyPermissions(permissions, route, state);
            }
            return true;
        }));
    }
    /**
     * @private
     * @param {?} redirectTo
     * @param {?} route
     * @param {?=} state
     * @param {?=} failedPermissionName
     * @return {?}
     */
    redirectToAnotherRoute(redirectTo, route, state, failedPermissionName) {
        if (isFunction(redirectTo)) {
            redirectTo = ((/** @type {?} */ (redirectTo)))(failedPermissionName, route, state);
        }
        if (this.isRedirectionWithParameters(redirectTo)) {
            if (this.hasNavigationExtrasAsFunction(redirectTo)) {
                ((/** @type {?} */ (redirectTo))).navigationExtras = ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationExtras)))(route, state);
            }
            if (this.hasNavigationCommandsAsFunction(redirectTo)) {
                ((/** @type {?} */ (redirectTo))).navigationCommands = ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationCommands)))(route, state);
            }
            this.router.navigate(((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationCommands))), ((/** @type {?} */ (((/** @type {?} */ (redirectTo))).navigationExtras))));
            return;
        }
        if (Array.isArray(redirectTo)) {
            this.router.navigate(redirectTo);
        }
        else {
            this.router.navigate([redirectTo]);
        }
    }
    /**
     * @private
     * @param {?} object
     * @return {?}
     */
    isRedirectionWithParameters(object) {
        return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
    }
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    hasNavigationExtrasAsFunction(redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationExtras &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationExtras);
    }
    /**
     * @private
     * @param {?} redirectTo
     * @return {?}
     */
    hasNavigationCommandsAsFunction(redirectTo) {
        return !!((/** @type {?} */ (redirectTo))).navigationCommands &&
            isFunction(((/** @type {?} */ (redirectTo))).navigationCommands);
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    onlyRedirectCheck(permissions, route, state) {
        /** @type {?} */
        let failedPermission = '';
        return from(permissions.only).pipe(mergeMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return forkJoin([
                this.permissionsService.hasPermission((/** @type {?} */ (data))),
                this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
            ]).pipe(tap((/**
             * @param {?} hasPermission
             * @return {?}
             */
            (hasPermission) => {
                /** @type {?} */
                const failed = hasPermission.every((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => data === false));
                if (failed) {
                    failedPermission = data;
                }
            })));
        })), first((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (isFunction(permissions.redirectTo)) {
                return data.some((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => data === true));
            }
            return data.every((/**
             * @param {?} data
             * @return {?}
             */
            (data) => data === false));
        }), false), mergeMap((/**
         * @param {?} pass
         * @return {?}
         */
        (pass) => {
            if (isFunction(permissions.redirectTo)) {
                if (pass) {
                    return of(true);
                }
                else {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    return of(false);
                }
            }
            else {
                if (!!failedPermission) {
                    this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                }
                return of(!pass);
            }
        }))).toPromise();
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    handleRedirectOfFailedPermission(permissions, failedPermission, route, state) {
        if (this.isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission)) {
            this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo)))[failedPermission], route, state, failedPermission);
        }
        else {
            if (isFunction(permissions.redirectTo)) {
                this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo))), route, state, failedPermission);
            }
            else {
                this.redirectToAnotherRoute(((/** @type {?} */ (permissions.redirectTo)))['default'], route, state, failedPermission);
            }
        }
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} failedPermission
     * @return {?}
     */
    isFailedPermissionPropertyOfRedirectTo(permissions, failedPermission) {
        return !!permissions.redirectTo && permissions.redirectTo[(/** @type {?} */ (failedPermission))];
    }
    /**
     * @private
     * @param {?} purePermissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    checkOnlyPermissions(purePermissions, route, state) {
        /** @type {?} */
        let permissions = Object.assign({}, purePermissions);
        return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.only))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.only)))])
            .then((/**
         * @param {?} __0
         * @return {?}
         */
        ([hasPermission, hasRole]) => {
            if (hasPermission || hasRole)
                return true;
            if (permissions.redirectTo) {
                this.redirectToAnotherRoute(permissions.redirectTo, route, state);
            }
            return false;
        }));
    }
    /**
     * @private
     * @param {?} permissions
     * @param {?} route
     * @param {?=} state
     * @return {?}
     */
    passingOnlyPermissionsValidation(permissions, route, state) {
        if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
            return this.onlyRedirectCheck(permissions, route, state);
        }
        return this.checkOnlyPermissions(permissions, route, state);
    }
}
NgxPermissionsGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPermissionsGuard.ctorParameters = () => [
    { type: NgxPermissionsService },
    { type: NgxRolesService },
    { type: Router }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsAllowStubDirective {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     */
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
        this.permissionsUnauthorized.emit();
    }
    /**
     * @private
     * @return {?}
     */
    getAuthorizedTemplate() {
        return this.ngxPermissionsOnlyThen ||
            this.ngxPermissionsExceptThen ||
            this.ngxPermissionsThen ||
            this.templateRef;
    }
}
NgxPermissionsAllowStubDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            },] }
];
/** @nocollapse */
NgxPermissionsAllowStubDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef }
];
NgxPermissionsAllowStubDirective.propDecorators = {
    ngxPermissionsOnly: [{ type: Input }],
    ngxPermissionsOnlyThen: [{ type: Input }],
    ngxPermissionsOnlyElse: [{ type: Input }],
    ngxPermissionsExcept: [{ type: Input }],
    ngxPermissionsExceptElse: [{ type: Input }],
    ngxPermissionsExceptThen: [{ type: Input }],
    ngxPermissionsThen: [{ type: Input }],
    ngxPermissionsElse: [{ type: Input }],
    ngxPermissionsOnlyAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsOnlyUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsAuthorisedStrategy: [{ type: Input }],
    permissionsAuthorized: [{ type: Output }],
    permissionsUnauthorized: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsRestrictStubDirective {
    /**
     * @param {?} viewContainer
     */
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.permissionsAuthorized = new EventEmitter();
        this.permissionsUnauthorized = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewContainer.clear();
        if (this.getUnAuthorizedTemplate()) {
            this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
        }
        this.permissionsUnauthorized.emit();
    }
    /**
     * @private
     * @return {?}
     */
    getUnAuthorizedTemplate() {
        return this.ngxPermissionsOnlyElse ||
            this.ngxPermissionsExceptElse ||
            this.ngxPermissionsElse;
    }
}
NgxPermissionsRestrictStubDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
            },] }
];
/** @nocollapse */
NgxPermissionsRestrictStubDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
NgxPermissionsRestrictStubDirective.propDecorators = {
    ngxPermissionsOnly: [{ type: Input }],
    ngxPermissionsOnlyThen: [{ type: Input }],
    ngxPermissionsOnlyElse: [{ type: Input }],
    ngxPermissionsExcept: [{ type: Input }],
    ngxPermissionsExceptElse: [{ type: Input }],
    ngxPermissionsExceptThen: [{ type: Input }],
    ngxPermissionsThen: [{ type: Input }],
    ngxPermissionsElse: [{ type: Input }],
    ngxPermissionsOnlyAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsOnlyUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsExceptAuthorisedStrategy: [{ type: Input }],
    ngxPermissionsUnauthorisedStrategy: [{ type: Input }],
    ngxPermissionsAuthorisedStrategy: [{ type: Input }],
    permissionsAuthorized: [{ type: Output }],
    permissionsUnauthorized: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxRole {
    /**
     * @param {?} name
     * @param {?} validationFunction
     */
    constructor(name, validationFunction) {
        this.name = name;
        this.validationFunction = validationFunction;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPermissionsModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                NgxPermissionsStore,
                NgxRolesStore,
                NgxPermissionsConfigurationStore,
                NgxPermissionsService,
                NgxPermissionsGuard,
                NgxRolesService,
                NgxPermissionsConfigurationService,
                { provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate },
                { provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
                { provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate },
            ]
        };
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forChild(config = {}) {
        return {
            ngModule: NgxPermissionsModule,
            providers: [
                { provide: USE_PERMISSIONS_STORE, useValue: config.permissionsIsolate },
                { provide: USE_ROLES_STORE, useValue: config.rolesIsolate },
                { provide: USE_CONFIGURATION_STORE, useValue: config.configurationIsolate },
                NgxPermissionsConfigurationService,
                NgxPermissionsService,
                NgxRolesService,
                NgxPermissionsGuard
            ]
        };
    }
}
NgxPermissionsModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NgxPermissionsDirective
                ],
                exports: [
                    NgxPermissionsDirective
                ]
            },] }
];
class NgxPermissionsAllowStubModule {
}
NgxPermissionsAllowStubModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NgxPermissionsAllowStubDirective
                ],
                exports: [
                    NgxPermissionsAllowStubDirective
                ]
            },] }
];
class NgxPermissionsRestrictStubModule {
}
NgxPermissionsRestrictStubModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    NgxPermissionsRestrictStubDirective
                ],
                exports: [
                    NgxPermissionsRestrictStubDirective
                ]
            },] }
];

export { NgxPermissionsAllowStubDirective, NgxPermissionsAllowStubModule, NgxPermissionsConfigurationService, NgxPermissionsConfigurationStore, NgxPermissionsDirective, NgxPermissionsGuard, NgxPermissionsModule, NgxPermissionsPredefinedStrategies, NgxPermissionsRestrictStubDirective, NgxPermissionsRestrictStubModule, NgxPermissionsService, NgxPermissionsStore, NgxRole, NgxRolesService, NgxRolesStore, USE_CONFIGURATION_STORE, USE_PERMISSIONS_STORE, USE_ROLES_STORE };
//# sourceMappingURL=ngx-permissions.js.map
