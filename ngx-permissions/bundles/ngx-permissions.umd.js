(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('ngx-permissions', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/router'], factory) :
    (global = global || self, factory(global['ngx-permissions'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.router));
}(this, function (exports, core, rxjs, operators, router) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var NgxPermissionsPredefinedStrategies = {
        REMOVE: 'remove',
        SHOW: 'show'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsConfigurationStore = /** @class */ (function () {
        function NgxPermissionsConfigurationStore() {
            this.strategiesSource = new rxjs.BehaviorSubject({});
            this.strategies$ = this.strategiesSource.asObservable();
        }
        NgxPermissionsConfigurationStore.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPermissionsConfigurationStore.ctorParameters = function () { return []; };
        return NgxPermissionsConfigurationStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var USE_CONFIGURATION_STORE = new core.InjectionToken('USE_CONFIGURATION_STORE');
    var NgxPermissionsConfigurationService = /** @class */ (function () {
        function NgxPermissionsConfigurationService(isolate, configurationStore) {
            if (isolate === void 0) { isolate = false; }
            this.isolate = isolate;
            this.configurationStore = configurationStore;
            this.strategiesSource = this.isolate ? new rxjs.BehaviorSubject({}) : this.configurationStore.strategiesSource;
            this.strategies$ = this.strategiesSource.asObservable();
            this.onAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onAuthorisedDefaultStrategy;
            this.onUnAuthorisedDefaultStrategy = this.isolate ? undefined : this.configurationStore.onUnAuthorisedDefaultStrategy;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.setDefaultOnAuthorizedStrategy = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (this.isolate) {
                this.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            }
            else {
                this.configurationStore.onAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
                this.onAuthorisedDefaultStrategy = this.configurationStore.onAuthorisedDefaultStrategy;
            }
        };
        /**
         * @param {?} name
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.setDefaultOnUnauthorizedStrategy = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (this.isolate) {
                this.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
            }
            else {
                this.configurationStore.onUnAuthorisedDefaultStrategy = this.getDefinedStrategy(name);
                this.onUnAuthorisedDefaultStrategy = this.configurationStore.onUnAuthorisedDefaultStrategy;
            }
        };
        /**
         * @param {?} key
         * @param {?} func
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.addPermissionStrategy = /**
         * @param {?} key
         * @param {?} func
         * @return {?}
         */
        function (key, func) {
            this.strategiesSource.value[key] = func;
        };
        /**
         * @param {?} key
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.getStrategy = /**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return this.strategiesSource.value[key];
        };
        /**
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.getAllStrategies = /**
         * @return {?}
         */
        function () {
            return this.strategiesSource.value;
        };
        /**
         * @private
         * @param {?} name
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.getDefinedStrategy = /**
         * @private
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (this.strategiesSource.value[name] || this.isPredefinedStrategy(name)) {
                return name;
            }
            else {
                throw new Error("No ' " + name + " ' strategy is found please define one");
            }
        };
        /**
         * @private
         * @param {?} strategy
         * @return {?}
         */
        NgxPermissionsConfigurationService.prototype.isPredefinedStrategy = /**
         * @private
         * @param {?} strategy
         * @return {?}
         */
        function (strategy) {
            return strategy === NgxPermissionsPredefinedStrategies.SHOW || strategy === NgxPermissionsPredefinedStrategies.REMOVE;
        };
        NgxPermissionsConfigurationService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPermissionsConfigurationService.ctorParameters = function () { return [
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_CONFIGURATION_STORE,] }] },
            { type: NgxPermissionsConfigurationStore }
        ]; };
        return NgxPermissionsConfigurationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsStore = /** @class */ (function () {
        function NgxPermissionsStore() {
            this.permissionsSource = new rxjs.BehaviorSubject({});
            this.permissions$ = this.permissionsSource.asObservable();
        }
        NgxPermissionsStore.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPermissionsStore.ctorParameters = function () { return []; };
        return NgxPermissionsStore;
    }());

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
        var getType = {};
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
            var prototype = Object.getPrototypeOf(value);
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
    var USE_PERMISSIONS_STORE = new core.InjectionToken('USE_PERMISSIONS_STORE');
    var NgxPermissionsService = /** @class */ (function () {
        function NgxPermissionsService(isolate, permissionsStore) {
            if (isolate === void 0) { isolate = false; }
            this.isolate = isolate;
            this.permissionsStore = permissionsStore;
            this.permissionsSource = isolate ? new rxjs.BehaviorSubject({}) : permissionsStore.permissionsSource;
            this.permissions$ = this.permissionsSource.asObservable();
        }
        /**
         * Remove all permissions from permissions source
         */
        /**
         * Remove all permissions from permissions source
         * @return {?}
         */
        NgxPermissionsService.prototype.flushPermissions = /**
         * Remove all permissions from permissions source
         * @return {?}
         */
        function () {
            this.permissionsSource.next({});
        };
        /**
         * @param {?} permission
         * @return {?}
         */
        NgxPermissionsService.prototype.hasPermission = /**
         * @param {?} permission
         * @return {?}
         */
        function (permission) {
            if (!permission || (Array.isArray(permission) && permission.length === 0)) {
                return Promise.resolve(true);
            }
            permission = transformStringToArray(permission);
            return this.hasArrayPermission(permission);
        };
        /**
         * @param {?} permissions
         * @param {?=} validationFunction
         * @return {?}
         */
        NgxPermissionsService.prototype.loadPermissions = /**
         * @param {?} permissions
         * @param {?=} validationFunction
         * @return {?}
         */
        function (permissions, validationFunction) {
            var _this = this;
            /** @type {?} */
            var newPermissions = permissions.reduce((/**
             * @param {?} source
             * @param {?} p
             * @return {?}
             */
            function (source, p) {
                return _this.reducePermission(source, p, validationFunction);
            }), {});
            this.permissionsSource.next(newPermissions);
        };
        /**
         * @param {?} permission
         * @param {?=} validationFunction
         * @return {?}
         */
        NgxPermissionsService.prototype.addPermission = /**
         * @param {?} permission
         * @param {?=} validationFunction
         * @return {?}
         */
        function (permission, validationFunction) {
            var _this = this;
            if (Array.isArray(permission)) {
                /** @type {?} */
                var permissions = permission.reduce((/**
                 * @param {?} source
                 * @param {?} p
                 * @return {?}
                 */
                function (source, p) {
                    return _this.reducePermission(source, p, validationFunction);
                }), this.permissionsSource.value);
                this.permissionsSource.next(permissions);
            }
            else {
                /** @type {?} */
                var permissions = this.reducePermission(this.permissionsSource.value, permission, validationFunction);
                this.permissionsSource.next(permissions);
            }
        };
        /**
         * @param {?} permissionName
         * @return {?}
         */
        NgxPermissionsService.prototype.removePermission = /**
         * @param {?} permissionName
         * @return {?}
         */
        function (permissionName) {
            /** @type {?} */
            var permissions = __assign({}, this.permissionsSource.value);
            delete permissions[permissionName];
            this.permissionsSource.next(permissions);
        };
        /**
         * @param {?} name
         * @return {?}
         */
        NgxPermissionsService.prototype.getPermission = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.permissionsSource.value[name];
        };
        /**
         * @return {?}
         */
        NgxPermissionsService.prototype.getPermissions = /**
         * @return {?}
         */
        function () {
            return this.permissionsSource.value;
        };
        /**
         * @private
         * @param {?} source
         * @param {?} name
         * @param {?=} validationFunction
         * @return {?}
         */
        NgxPermissionsService.prototype.reducePermission = /**
         * @private
         * @param {?} source
         * @param {?} name
         * @param {?=} validationFunction
         * @return {?}
         */
        function (source, name, validationFunction) {
            var _a, _b;
            if (!!validationFunction && isFunction(validationFunction)) {
                return __assign({}, source, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
            }
            else {
                return __assign({}, source, (_b = {}, _b[name] = { name: name }, _b));
            }
        };
        /**
         * @private
         * @param {?} permissions
         * @return {?}
         */
        NgxPermissionsService.prototype.hasArrayPermission = /**
         * @private
         * @param {?} permissions
         * @return {?}
         */
        function (permissions) {
            var _this = this;
            /** @type {?} */
            var promises = permissions.map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (_this.hasPermissionValidationFunction(key)) {
                    /** @type {?} */
                    var immutableValue_1 = __assign({}, _this.permissionsSource.value);
                    /** @type {?} */
                    var validationFunction_1 = (/** @type {?} */ (_this.permissionsSource.value[key].validationFunction));
                    return rxjs.of(null).pipe(operators.map((/**
                     * @return {?}
                     */
                    function () { return validationFunction_1(key, immutableValue_1); })), operators.switchMap((/**
                     * @param {?} promise
                     * @return {?}
                     */
                    function (promise) { return isBoolean(promise) ?
                        rxjs.of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)); })), operators.catchError((/**
                     * @return {?}
                     */
                    function () { return rxjs.of(false); })));
                }
                // check for name of the permission if there is no validation function
                return rxjs.of(!!_this.permissionsSource.value[key]);
            }));
            return rxjs.from(promises).pipe(operators.mergeAll(), operators.first((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data !== false; }), false), operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data === false ? false : true; }))).toPromise().then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data; }));
        };
        /**
         * @private
         * @param {?} key
         * @return {?}
         */
        NgxPermissionsService.prototype.hasPermissionValidationFunction = /**
         * @private
         * @param {?} key
         * @return {?}
         */
        function (key) {
            return !!this.permissionsSource.value[key] &&
                !!this.permissionsSource.value[key].validationFunction &&
                isFunction(this.permissionsSource.value[key].validationFunction);
        };
        NgxPermissionsService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPermissionsService.ctorParameters = function () { return [
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_PERMISSIONS_STORE,] }] },
            { type: NgxPermissionsStore }
        ]; };
        return NgxPermissionsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxRolesStore = /** @class */ (function () {
        function NgxRolesStore() {
            this.rolesSource = new rxjs.BehaviorSubject({});
            this.roles$ = this.rolesSource.asObservable();
        }
        return NgxRolesStore;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var USE_ROLES_STORE = new core.InjectionToken('USE_ROLES_STORE');
    var NgxRolesService = /** @class */ (function () {
        function NgxRolesService(isolate, rolesStore, permissionsService) {
            if (isolate === void 0) { isolate = false; }
            this.isolate = isolate;
            this.rolesStore = rolesStore;
            this.permissionsService = permissionsService;
            this.rolesSource = this.isolate ? new rxjs.BehaviorSubject({}) : this.rolesStore.rolesSource;
            this.roles$ = this.rolesSource.asObservable();
        }
        /**
         * @param {?} name
         * @param {?} validationFunction
         * @return {?}
         */
        NgxRolesService.prototype.addRole = /**
         * @param {?} name
         * @param {?} validationFunction
         * @return {?}
         */
        function (name, validationFunction) {
            var _a;
            /** @type {?} */
            var roles = __assign({}, this.rolesSource.value, (_a = {}, _a[name] = { name: name, validationFunction: validationFunction }, _a));
            this.rolesSource.next(roles);
        };
        /**
         * @param {?} rolesObj
         * @return {?}
         */
        NgxRolesService.prototype.addRoles = /**
         * @param {?} rolesObj
         * @return {?}
         */
        function (rolesObj) {
            var _this = this;
            Object.keys(rolesObj).forEach((/**
             * @param {?} key
             * @param {?} index
             * @return {?}
             */
            function (key, index) {
                _this.addRole(key, rolesObj[key]);
            }));
        };
        /**
         * @return {?}
         */
        NgxRolesService.prototype.flushRoles = /**
         * @return {?}
         */
        function () {
            this.rolesSource.next({});
        };
        /**
         * @param {?} roleName
         * @return {?}
         */
        NgxRolesService.prototype.removeRole = /**
         * @param {?} roleName
         * @return {?}
         */
        function (roleName) {
            /** @type {?} */
            var roles = __assign({}, this.rolesSource.value);
            delete roles[roleName];
            this.rolesSource.next(roles);
        };
        /**
         * @return {?}
         */
        NgxRolesService.prototype.getRoles = /**
         * @return {?}
         */
        function () {
            return this.rolesSource.value;
        };
        /**
         * @param {?} name
         * @return {?}
         */
        NgxRolesService.prototype.getRole = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.rolesSource.value[name];
        };
        /**
         * @param {?} names
         * @return {?}
         */
        NgxRolesService.prototype.hasOnlyRoles = /**
         * @param {?} names
         * @return {?}
         */
        function (names) {
            /** @type {?} */
            var isNamesEmpty = !names || (Array.isArray(names) && names.length === 0);
            if (isNamesEmpty)
                return Promise.resolve(true);
            names = transformStringToArray(names);
            return Promise.all([this.hasRoleKey(names), this.hasRolePermission(this.rolesSource.value, names)])
                .then((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), hasRoles = _b[0], hasPermissions = _b[1];
                return hasRoles || hasPermissions;
            }));
        };
        /**
         * @private
         * @param {?} roleName
         * @return {?}
         */
        NgxRolesService.prototype.hasRoleKey = /**
         * @private
         * @param {?} roleName
         * @return {?}
         */
        function (roleName) {
            var _this = this;
            /** @type {?} */
            var promises = roleName.map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var hasValidationFunction = !!_this.rolesSource.value[key] &&
                    !!_this.rolesSource.value[key].validationFunction &&
                    isFunction(_this.rolesSource.value[key].validationFunction);
                if (hasValidationFunction && !isPromise(_this.rolesSource.value[key].validationFunction)) {
                    /** @type {?} */
                    var validationFunction_1 = (/** @type {?} */ (_this.rolesSource.value[key].validationFunction));
                    /** @type {?} */
                    var immutableValue_1 = __assign({}, _this.rolesSource.value);
                    return rxjs.of(null).pipe(operators.map((/**
                     * @return {?}
                     */
                    function () { return validationFunction_1(key, immutableValue_1); })), operators.switchMap((/**
                     * @param {?} promise
                     * @return {?}
                     */
                    function (promise) { return isBoolean(promise) ?
                        rxjs.of((/** @type {?} */ (promise))) : (/** @type {?} */ (promise)); })), operators.catchError((/**
                     * @return {?}
                     */
                    function () { return rxjs.of(false); })));
                }
                return rxjs.of(false);
            }));
            return rxjs.from(promises).pipe(operators.mergeAll(), operators.first((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data !== false; }), false), operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data !== false; }))).toPromise().then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data; }));
        };
        /**
         * @private
         * @param {?} roles
         * @param {?} roleNames
         * @return {?}
         */
        NgxRolesService.prototype.hasRolePermission = /**
         * @private
         * @param {?} roles
         * @param {?} roleNames
         * @return {?}
         */
        function (roles, roleNames) {
            var _this = this;
            return rxjs.from(roleNames).pipe(operators.mergeMap((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (roles[key] && Array.isArray(roles[key].validationFunction)) {
                    return rxjs.from((/** @type {?} */ (roles[key].validationFunction))).pipe(operators.mergeMap((/**
                     * @param {?} permission
                     * @return {?}
                     */
                    function (permission) { return _this.permissionsService.hasPermission(permission); })), operators.every((/**
                     * @param {?} hasPermissions
                     * @return {?}
                     */
                    function (hasPermissions) { return hasPermissions === true; })));
                }
                return rxjs.of(false);
            })), operators.first((/**
             * @param {?} hasPermission
             * @return {?}
             */
            function (hasPermission) { return hasPermission === true; }), false)).toPromise();
        };
        NgxRolesService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxRolesService.ctorParameters = function () { return [
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_ROLES_STORE,] }] },
            { type: NgxRolesStore },
            { type: NgxPermissionsService }
        ]; };
        return NgxRolesService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsDirective = /** @class */ (function () {
        function NgxPermissionsDirective(permissionsService, configurationService, rolesService, viewContainer, changeDetector, templateRef) {
            this.permissionsService = permissionsService;
            this.configurationService = configurationService;
            this.rolesService = rolesService;
            this.viewContainer = viewContainer;
            this.changeDetector = changeDetector;
            this.templateRef = templateRef;
            this.permissionsAuthorized = new core.EventEmitter();
            this.permissionsUnauthorized = new core.EventEmitter();
            // skip first run cause merge will fire twice
            this.firstMergeUnusedRun = 1;
        }
        /**
         * @return {?}
         */
        NgxPermissionsDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.viewContainer.clear();
            this.initPermissionSubscription = this.validateExceptOnlyPermissions();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxPermissionsDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            /** @type {?} */
            var onlyChanges = changes['ngxPermissionsOnly'];
            /** @type {?} */
            var exceptChanges = changes['ngxPermissionsExcept'];
            if (onlyChanges || exceptChanges) {
                // Due to bug when you pass empty array
                if (onlyChanges && onlyChanges.firstChange)
                    return;
                if (exceptChanges && exceptChanges.firstChange)
                    return;
                rxjs.merge(this.permissionsService.permissions$, this.rolesService.roles$)
                    .pipe(operators.skip(this.firstMergeUnusedRun), operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (notEmptyValue(_this.ngxPermissionsExcept)) {
                        _this.validateExceptAndOnlyPermissions();
                        return;
                    }
                    if (notEmptyValue(_this.ngxPermissionsOnly)) {
                        _this.validateOnlyPermissions();
                        return;
                    }
                    _this.handleAuthorisedPermission(_this.getAuthorisedTemplates());
                }));
            }
        };
        /**
         * @return {?}
         */
        NgxPermissionsDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.initPermissionSubscription) {
                this.initPermissionSubscription.unsubscribe();
            }
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.validateExceptOnlyPermissions = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return rxjs.merge(this.permissionsService.permissions$, this.rolesService.roles$)
                .pipe(operators.skip(this.firstMergeUnusedRun))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (notEmptyValue(_this.ngxPermissionsExcept)) {
                    _this.validateExceptAndOnlyPermissions();
                    return;
                }
                if (notEmptyValue(_this.ngxPermissionsOnly)) {
                    _this.validateOnlyPermissions();
                    return;
                }
                _this.handleAuthorisedPermission(_this.getAuthorisedTemplates());
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.validateExceptAndOnlyPermissions = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsExcept), this.rolesService.hasOnlyRoles(this.ngxPermissionsExcept)])
                .then((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), hasPermission = _b[0], hasRole = _b[1];
                if (hasPermission || hasRole) {
                    _this.handleUnauthorisedPermission(_this.ngxPermissionsExceptElse || _this.ngxPermissionsElse);
                    return;
                }
                if (!!_this.ngxPermissionsOnly)
                    throw false;
                _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
            })).catch((/**
             * @return {?}
             */
            function () {
                if (!!_this.ngxPermissionsOnly) {
                    _this.validateOnlyPermissions();
                }
                else {
                    _this.handleAuthorisedPermission(_this.ngxPermissionsExceptThen || _this.ngxPermissionsThen || _this.templateRef);
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.validateOnlyPermissions = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            Promise.all([this.permissionsService.hasPermission(this.ngxPermissionsOnly), this.rolesService.hasOnlyRoles(this.ngxPermissionsOnly)])
                .then((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), hasPermissions = _b[0], hasRoles = _b[1];
                if (hasPermissions || hasRoles) {
                    _this.handleAuthorisedPermission(_this.ngxPermissionsOnlyThen || _this.ngxPermissionsThen || _this.templateRef);
                }
                else {
                    _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
                }
            })).catch((/**
             * @return {?}
             */
            function () {
                _this.handleUnauthorisedPermission(_this.ngxPermissionsOnlyElse || _this.ngxPermissionsElse);
            }));
        };
        /**
         * @private
         * @param {?} template
         * @return {?}
         */
        NgxPermissionsDirective.prototype.handleUnauthorisedPermission = /**
         * @private
         * @param {?} template
         * @return {?}
         */
        function (template) {
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
        };
        /**
         * @private
         * @param {?} template
         * @return {?}
         */
        NgxPermissionsDirective.prototype.handleAuthorisedPermission = /**
         * @private
         * @param {?} template
         * @return {?}
         */
        function (template) {
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
        };
        /**
         * @private
         * @param {?} strategy
         * @return {?}
         */
        NgxPermissionsDirective.prototype.applyStrategyAccordingToStrategyType = /**
         * @private
         * @param {?} strategy
         * @return {?}
         */
        function (strategy) {
            if (isString(strategy)) {
                this.applyStrategy(strategy);
                return;
            }
            if (isFunction(strategy)) {
                this.showTemplateBlockInView(this.templateRef);
                ((/** @type {?} */ (strategy)))(this.templateRef);
                return;
            }
        };
        /**
         * @private
         * @param {?} template
         * @return {?}
         */
        NgxPermissionsDirective.prototype.showTemplateBlockInView = /**
         * @private
         * @param {?} template
         * @return {?}
         */
        function (template) {
            this.viewContainer.clear();
            if (!template) {
                return;
            }
            this.viewContainer.createEmbeddedView(template);
            this.changeDetector.markForCheck();
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.getAuthorisedTemplates = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ngxPermissionsOnlyThen
                || this.ngxPermissionsExceptThen
                || this.ngxPermissionsThen
                || this.templateRef;
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.elseBlockDefined = /**
         * @private
         * @return {?}
         */
        function () {
            return !!this.ngxPermissionsExceptElse || !!this.ngxPermissionsElse;
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.thenBlockDefined = /**
         * @private
         * @return {?}
         */
        function () {
            return !!this.ngxPermissionsExceptThen || !!this.ngxPermissionsThen;
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.getAuthorizedStrategyInput = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ngxPermissionsOnlyAuthorisedStrategy ||
                this.ngxPermissionsExceptAuthorisedStrategy ||
                this.ngxPermissionsAuthorisedStrategy;
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsDirective.prototype.getUnAuthorizedStrategyInput = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ngxPermissionsOnlyUnauthorisedStrategy ||
                this.ngxPermissionsExceptUnauthorisedStrategy ||
                this.ngxPermissionsUnauthorisedStrategy;
        };
        /**
         * @private
         * @param {?} str
         * @return {?}
         */
        NgxPermissionsDirective.prototype.applyStrategy = /**
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            if (str === NgxPermissionsPredefinedStrategies.SHOW) {
                this.showTemplateBlockInView(this.templateRef);
                return;
            }
            if (str === NgxPermissionsPredefinedStrategies.REMOVE) {
                this.viewContainer.clear();
                return;
            }
            /** @type {?} */
            var strategy = this.configurationService.getStrategy(str);
            this.showTemplateBlockInView(this.templateRef);
            strategy(this.templateRef);
        };
        NgxPermissionsDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
                    },] }
        ];
        /** @nocollapse */
        NgxPermissionsDirective.ctorParameters = function () { return [
            { type: NgxPermissionsService },
            { type: NgxPermissionsConfigurationService },
            { type: NgxRolesService },
            { type: core.ViewContainerRef },
            { type: core.ChangeDetectorRef },
            { type: core.TemplateRef }
        ]; };
        NgxPermissionsDirective.propDecorators = {
            ngxPermissionsOnly: [{ type: core.Input }],
            ngxPermissionsOnlyThen: [{ type: core.Input }],
            ngxPermissionsOnlyElse: [{ type: core.Input }],
            ngxPermissionsExcept: [{ type: core.Input }],
            ngxPermissionsExceptElse: [{ type: core.Input }],
            ngxPermissionsExceptThen: [{ type: core.Input }],
            ngxPermissionsThen: [{ type: core.Input }],
            ngxPermissionsElse: [{ type: core.Input }],
            ngxPermissionsOnlyAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsOnlyUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsAuthorisedStrategy: [{ type: core.Input }],
            permissionsAuthorized: [{ type: core.Output }],
            permissionsUnauthorized: [{ type: core.Output }]
        };
        return NgxPermissionsDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsGuard = /** @class */ (function () {
        function NgxPermissionsGuard(permissionsService, rolesService, router) {
            this.permissionsService = permissionsService;
            this.rolesService = rolesService;
            this.router = router;
        }
        /**
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.canActivate = /**
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        function (route, state) {
            return this.hasPermissions(route, state);
        };
        /**
         * @param {?} childRoute
         * @param {?} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.canActivateChild = /**
         * @param {?} childRoute
         * @param {?} state
         * @return {?}
         */
        function (childRoute, state) {
            return this.hasPermissions(childRoute, state);
        };
        /**
         * @param {?} route
         * @return {?}
         */
        NgxPermissionsGuard.prototype.canLoad = /**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            return this.hasPermissions(route);
        };
        /**
         * @private
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.hasPermissions = /**
         * @private
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        function (route, state) {
            /** @type {?} */
            var purePermissions = !!route && route.data ? (/** @type {?} */ (route.data['permissions'])) : {};
            /** @type {?} */
            var permissions = this.transformPermission(purePermissions, route, state);
            if (this.isParameterAvailable(permissions.except)) {
                return this.passingExceptPermissionsValidation(permissions, route, state);
            }
            if (this.isParameterAvailable(permissions.only)) {
                return this.passingOnlyPermissionsValidation(permissions, route, state);
            }
            return true;
        };
        /**
         * @private
         * @param {?} purePermissions
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.transformPermission = /**
         * @private
         * @param {?} purePermissions
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        function (purePermissions, route, state) {
            /** @type {?} */
            var permissions = __assign({}, purePermissions);
            if (isFunction(permissions.except)) {
                permissions.except = ((/** @type {?} */ (permissions.except)))(route, state);
            }
            if (isFunction(permissions.only)) {
                permissions.only = ((/** @type {?} */ (permissions.only)))(route, state);
            }
            permissions.except = transformStringToArray(permissions.except);
            permissions.only = transformStringToArray(permissions.only);
            return permissions;
        };
        /**
         * @private
         * @param {?} permission
         * @return {?}
         */
        NgxPermissionsGuard.prototype.isParameterAvailable = /**
         * @private
         * @param {?} permission
         * @return {?}
         */
        function (permission) {
            return !!(permission) && permission.length > 0;
        };
        /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.passingExceptPermissionsValidation = /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?} state
         * @return {?}
         */
        function (permissions, route, state) {
            var _this = this;
            if (!!permissions.redirectTo && ((isFunction(permissions.redirectTo)) || (isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo)))) {
                /** @type {?} */
                var failedPermission_1 = '';
                return rxjs.from((/** @type {?} */ (permissions.except))).pipe(operators.mergeMap((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    return rxjs.forkJoin([
                        _this.permissionsService.hasPermission((/** @type {?} */ (data))),
                        _this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
                    ]).pipe(operators.tap((/**
                     * @param {?} hasPermissions
                     * @return {?}
                     */
                    function (hasPermissions) {
                        /** @type {?} */
                        var dontHavePermissions = hasPermissions.every((/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) { return data === false; }));
                        if (!dontHavePermissions) {
                            failedPermission_1 = data;
                        }
                    })));
                })), operators.first((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return data.some((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return data === true; })); }), false), operators.mergeMap((/**
                 * @param {?} isAllFalse
                 * @return {?}
                 */
                function (isAllFalse) {
                    if (!!failedPermission_1) {
                        _this.handleRedirectOfFailedPermission(permissions, failedPermission_1, route, state);
                        return rxjs.of(false);
                    }
                    if (!isAllFalse && permissions.only) {
                        return _this.onlyRedirectCheck(permissions, route, state);
                    }
                    return rxjs.of(!isAllFalse);
                }))).toPromise();
            }
            return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.except))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.except)))])
                .then((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), hasPermission = _b[0], hasRoles = _b[1];
                if (hasPermission || hasRoles) {
                    if (permissions.redirectTo) {
                        _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                    }
                    return false;
                }
                if (permissions.only) {
                    return _this.checkOnlyPermissions(permissions, route, state);
                }
                return true;
            }));
        };
        /**
         * @private
         * @param {?} redirectTo
         * @param {?} route
         * @param {?=} state
         * @param {?=} failedPermissionName
         * @return {?}
         */
        NgxPermissionsGuard.prototype.redirectToAnotherRoute = /**
         * @private
         * @param {?} redirectTo
         * @param {?} route
         * @param {?=} state
         * @param {?=} failedPermissionName
         * @return {?}
         */
        function (redirectTo, route, state, failedPermissionName) {
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
        };
        /**
         * @private
         * @param {?} object
         * @return {?}
         */
        NgxPermissionsGuard.prototype.isRedirectionWithParameters = /**
         * @private
         * @param {?} object
         * @return {?}
         */
        function (object) {
            return isPlainObject(object) && (!!object.navigationCommands || !!object.navigationExtras);
        };
        /**
         * @private
         * @param {?} redirectTo
         * @return {?}
         */
        NgxPermissionsGuard.prototype.hasNavigationExtrasAsFunction = /**
         * @private
         * @param {?} redirectTo
         * @return {?}
         */
        function (redirectTo) {
            return !!((/** @type {?} */ (redirectTo))).navigationExtras &&
                isFunction(((/** @type {?} */ (redirectTo))).navigationExtras);
        };
        /**
         * @private
         * @param {?} redirectTo
         * @return {?}
         */
        NgxPermissionsGuard.prototype.hasNavigationCommandsAsFunction = /**
         * @private
         * @param {?} redirectTo
         * @return {?}
         */
        function (redirectTo) {
            return !!((/** @type {?} */ (redirectTo))).navigationCommands &&
                isFunction(((/** @type {?} */ (redirectTo))).navigationCommands);
        };
        /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.onlyRedirectCheck = /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        function (permissions, route, state) {
            var _this = this;
            /** @type {?} */
            var failedPermission = '';
            return rxjs.from(permissions.only).pipe(operators.mergeMap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                return rxjs.forkJoin([
                    _this.permissionsService.hasPermission((/** @type {?} */ (data))),
                    _this.rolesService.hasOnlyRoles((/** @type {?} */ (data)))
                ]).pipe(operators.tap((/**
                 * @param {?} hasPermission
                 * @return {?}
                 */
                function (hasPermission) {
                    /** @type {?} */
                    var failed = hasPermission.every((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return data === false; }));
                    if (failed) {
                        failedPermission = data;
                    }
                })));
            })), operators.first((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (isFunction(permissions.redirectTo)) {
                    return data.some((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return data === true; }));
                }
                return data.every((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return data === false; }));
            }), false), operators.mergeMap((/**
             * @param {?} pass
             * @return {?}
             */
            function (pass) {
                if (isFunction(permissions.redirectTo)) {
                    if (pass) {
                        return rxjs.of(true);
                    }
                    else {
                        _this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                        return rxjs.of(false);
                    }
                }
                else {
                    if (!!failedPermission) {
                        _this.handleRedirectOfFailedPermission(permissions, failedPermission, route, state);
                    }
                    return rxjs.of(!pass);
                }
            }))).toPromise();
        };
        /**
         * @private
         * @param {?} permissions
         * @param {?} failedPermission
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.handleRedirectOfFailedPermission = /**
         * @private
         * @param {?} permissions
         * @param {?} failedPermission
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        function (permissions, failedPermission, route, state) {
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
        };
        /**
         * @private
         * @param {?} permissions
         * @param {?} failedPermission
         * @return {?}
         */
        NgxPermissionsGuard.prototype.isFailedPermissionPropertyOfRedirectTo = /**
         * @private
         * @param {?} permissions
         * @param {?} failedPermission
         * @return {?}
         */
        function (permissions, failedPermission) {
            return !!permissions.redirectTo && permissions.redirectTo[(/** @type {?} */ (failedPermission))];
        };
        /**
         * @private
         * @param {?} purePermissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.checkOnlyPermissions = /**
         * @private
         * @param {?} purePermissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        function (purePermissions, route, state) {
            var _this = this;
            /** @type {?} */
            var permissions = __assign({}, purePermissions);
            return Promise.all([this.permissionsService.hasPermission((/** @type {?} */ (permissions.only))), this.rolesService.hasOnlyRoles((/** @type {?} */ (permissions.only)))])
                .then((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), hasPermission = _b[0], hasRole = _b[1];
                if (hasPermission || hasRole)
                    return true;
                if (permissions.redirectTo) {
                    _this.redirectToAnotherRoute(permissions.redirectTo, route, state);
                }
                return false;
            }));
        };
        /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        NgxPermissionsGuard.prototype.passingOnlyPermissionsValidation = /**
         * @private
         * @param {?} permissions
         * @param {?} route
         * @param {?=} state
         * @return {?}
         */
        function (permissions, route, state) {
            if ((isFunction(permissions.redirectTo) || isPlainObject(permissions.redirectTo) && !this.isRedirectionWithParameters(permissions.redirectTo))) {
                return this.onlyRedirectCheck(permissions, route, state);
            }
            return this.checkOnlyPermissions(permissions, route, state);
        };
        NgxPermissionsGuard.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPermissionsGuard.ctorParameters = function () { return [
            { type: NgxPermissionsService },
            { type: NgxRolesService },
            { type: router.Router }
        ]; };
        return NgxPermissionsGuard;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsAllowStubDirective = /** @class */ (function () {
        function NgxPermissionsAllowStubDirective(viewContainer, templateRef) {
            this.viewContainer = viewContainer;
            this.templateRef = templateRef;
            this.permissionsAuthorized = new core.EventEmitter();
            this.permissionsUnauthorized = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NgxPermissionsAllowStubDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.getAuthorizedTemplate());
            this.permissionsUnauthorized.emit();
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsAllowStubDirective.prototype.getAuthorizedTemplate = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ngxPermissionsOnlyThen ||
                this.ngxPermissionsExceptThen ||
                this.ngxPermissionsThen ||
                this.templateRef;
        };
        NgxPermissionsAllowStubDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
                    },] }
        ];
        /** @nocollapse */
        NgxPermissionsAllowStubDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: core.TemplateRef }
        ]; };
        NgxPermissionsAllowStubDirective.propDecorators = {
            ngxPermissionsOnly: [{ type: core.Input }],
            ngxPermissionsOnlyThen: [{ type: core.Input }],
            ngxPermissionsOnlyElse: [{ type: core.Input }],
            ngxPermissionsExcept: [{ type: core.Input }],
            ngxPermissionsExceptElse: [{ type: core.Input }],
            ngxPermissionsExceptThen: [{ type: core.Input }],
            ngxPermissionsThen: [{ type: core.Input }],
            ngxPermissionsElse: [{ type: core.Input }],
            ngxPermissionsOnlyAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsOnlyUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsAuthorisedStrategy: [{ type: core.Input }],
            permissionsAuthorized: [{ type: core.Output }],
            permissionsUnauthorized: [{ type: core.Output }]
        };
        return NgxPermissionsAllowStubDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsRestrictStubDirective = /** @class */ (function () {
        function NgxPermissionsRestrictStubDirective(viewContainer) {
            this.viewContainer = viewContainer;
            this.permissionsAuthorized = new core.EventEmitter();
            this.permissionsUnauthorized = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NgxPermissionsRestrictStubDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.viewContainer.clear();
            if (this.getUnAuthorizedTemplate()) {
                this.viewContainer.createEmbeddedView(this.getUnAuthorizedTemplate());
            }
            this.permissionsUnauthorized.emit();
        };
        /**
         * @private
         * @return {?}
         */
        NgxPermissionsRestrictStubDirective.prototype.getUnAuthorizedTemplate = /**
         * @private
         * @return {?}
         */
        function () {
            return this.ngxPermissionsOnlyElse ||
                this.ngxPermissionsExceptElse ||
                this.ngxPermissionsElse;
        };
        NgxPermissionsRestrictStubDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngxPermissionsOnly],[ngxPermissionsExcept]'
                    },] }
        ];
        /** @nocollapse */
        NgxPermissionsRestrictStubDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        NgxPermissionsRestrictStubDirective.propDecorators = {
            ngxPermissionsOnly: [{ type: core.Input }],
            ngxPermissionsOnlyThen: [{ type: core.Input }],
            ngxPermissionsOnlyElse: [{ type: core.Input }],
            ngxPermissionsExcept: [{ type: core.Input }],
            ngxPermissionsExceptElse: [{ type: core.Input }],
            ngxPermissionsExceptThen: [{ type: core.Input }],
            ngxPermissionsThen: [{ type: core.Input }],
            ngxPermissionsElse: [{ type: core.Input }],
            ngxPermissionsOnlyAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsOnlyUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsExceptAuthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsUnauthorisedStrategy: [{ type: core.Input }],
            ngxPermissionsAuthorisedStrategy: [{ type: core.Input }],
            permissionsAuthorized: [{ type: core.Output }],
            permissionsUnauthorized: [{ type: core.Output }]
        };
        return NgxPermissionsRestrictStubDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxRole = /** @class */ (function () {
        function NgxRole(name, validationFunction) {
            this.name = name;
            this.validationFunction = validationFunction;
        }
        return NgxRole;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPermissionsModule = /** @class */ (function () {
        function NgxPermissionsModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        NgxPermissionsModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            if (config === void 0) { config = {}; }
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
        };
        /**
         * @param {?=} config
         * @return {?}
         */
        NgxPermissionsModule.forChild = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            if (config === void 0) { config = {}; }
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
        };
        NgxPermissionsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [
                            NgxPermissionsDirective
                        ],
                        exports: [
                            NgxPermissionsDirective
                        ]
                    },] }
        ];
        return NgxPermissionsModule;
    }());
    var NgxPermissionsAllowStubModule = /** @class */ (function () {
        function NgxPermissionsAllowStubModule() {
        }
        NgxPermissionsAllowStubModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [
                            NgxPermissionsAllowStubDirective
                        ],
                        exports: [
                            NgxPermissionsAllowStubDirective
                        ]
                    },] }
        ];
        return NgxPermissionsAllowStubModule;
    }());
    var NgxPermissionsRestrictStubModule = /** @class */ (function () {
        function NgxPermissionsRestrictStubModule() {
        }
        NgxPermissionsRestrictStubModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [
                            NgxPermissionsRestrictStubDirective
                        ],
                        exports: [
                            NgxPermissionsRestrictStubDirective
                        ]
                    },] }
        ];
        return NgxPermissionsRestrictStubModule;
    }());

    exports.NgxPermissionsAllowStubDirective = NgxPermissionsAllowStubDirective;
    exports.NgxPermissionsAllowStubModule = NgxPermissionsAllowStubModule;
    exports.NgxPermissionsConfigurationService = NgxPermissionsConfigurationService;
    exports.NgxPermissionsConfigurationStore = NgxPermissionsConfigurationStore;
    exports.NgxPermissionsDirective = NgxPermissionsDirective;
    exports.NgxPermissionsGuard = NgxPermissionsGuard;
    exports.NgxPermissionsModule = NgxPermissionsModule;
    exports.NgxPermissionsPredefinedStrategies = NgxPermissionsPredefinedStrategies;
    exports.NgxPermissionsRestrictStubDirective = NgxPermissionsRestrictStubDirective;
    exports.NgxPermissionsRestrictStubModule = NgxPermissionsRestrictStubModule;
    exports.NgxPermissionsService = NgxPermissionsService;
    exports.NgxPermissionsStore = NgxPermissionsStore;
    exports.NgxRole = NgxRole;
    exports.NgxRolesService = NgxRolesService;
    exports.NgxRolesStore = NgxRolesStore;
    exports.USE_CONFIGURATION_STORE = USE_CONFIGURATION_STORE;
    exports.USE_PERMISSIONS_STORE = USE_PERMISSIONS_STORE;
    exports.USE_ROLES_STORE = USE_ROLES_STORE;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-permissions.umd.js.map
