/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, every, first, map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';
import { NgxRolesStore } from '../store/roles.store';
import { isBoolean, isFunction, isPromise, transformStringToArray } from '../utils/utils';
import { NgxPermissionsService } from './permissions.service';
/** @type {?} */
export const USE_ROLES_STORE = new InjectionToken('USE_ROLES_STORE');
export class NgxRolesService {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.rolesSource;
    /** @type {?} */
    NgxRolesService.prototype.roles$;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.isolate;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.rolesStore;
    /**
     * @type {?}
     * @private
     */
    NgxRolesService.prototype.permissionsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wZXJtaXNzaW9ucy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlL3JvbGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBK0IsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTlELE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQUMsaUJBQWlCLENBQUM7QUFLcEUsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQU14QixZQUNxQyxVQUFtQixLQUFLLEVBQ2pELFVBQXlCLEVBQ3pCLGtCQUF5QztRQUZoQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUNqRCxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUFFakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ3hHLElBQUksQ0FBQyxNQUFNLEdBQUcs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Q0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQzVELE9BQU8sSUFBSSxDQUFDLG1CQUFVLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUNyRCxRQUFROzs7O2dCQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEVBQzNFLEtBQUs7Ozs7Z0JBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUMsQ0FDckQsQ0FBQzthQUNMO1lBRUQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLEVBQ0YsS0FBSzs7OztRQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxhQUFhLEtBQUssSUFBSSxHQUFFLEtBQUssQ0FBQyxDQUMxRCxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQXpHSixVQUFVOzs7OzBDQVFGLE1BQU0sU0FBQyxlQUFlO1lBaEJ0QixhQUFhO1lBRWIscUJBQXFCOzs7Ozs7O0lBUzFCLHNDQUFxRDs7SUFFckQsaUNBQTBDOzs7OztJQUd0QyxrQ0FBeUQ7Ozs7O0lBQ3pELHFDQUFpQzs7Ozs7SUFDakMsNkNBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBmcm9tLCBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGV2ZXJ5LCBmaXJzdCwgbWFwLCBtZXJnZUFsbCwgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IE5neFJvbGUgfSBmcm9tICcuLi9tb2RlbC9yb2xlLm1vZGVsJztcclxuaW1wb3J0IHsgTmd4Um9sZXNTdG9yZSB9IGZyb20gJy4uL3N0b3JlL3JvbGVzLnN0b3JlJztcclxuaW1wb3J0IHsgaXNCb29sZWFuLCBpc0Z1bmN0aW9uLCBpc1Byb21pc2UsIHRyYW5zZm9ybVN0cmluZ1RvQXJyYXkgfSBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IE5neFBlcm1pc3Npb25zU2VydmljZSB9IGZyb20gJy4vcGVybWlzc2lvbnMuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgVVNFX1JPTEVTX1NUT1JFID0gbmV3IEluamVjdGlvblRva2VuKCdVU0VfUk9MRVNfU1RPUkUnKTtcclxuXHJcbmV4cG9ydCB0eXBlIE5neFJvbGVzT2JqZWN0ID0geyBbbmFtZTogc3RyaW5nXTogTmd4Um9sZSB9O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmd4Um9sZXNTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJvbGVzU291cmNlOiBCZWhhdmlvclN1YmplY3Q8Tmd4Um9sZXNPYmplY3Q+O1xyXG5cclxuICAgIHB1YmxpYyByb2xlcyQ6IE9ic2VydmFibGU8Tmd4Um9sZXNPYmplY3Q+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QoVVNFX1JPTEVTX1NUT1JFKSBwcml2YXRlIGlzb2xhdGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgICAgICBwcml2YXRlIHJvbGVzU3RvcmU6IE5neFJvbGVzU3RvcmUsXHJcbiAgICAgICAgcHJpdmF0ZSBwZXJtaXNzaW9uc1NlcnZpY2U6IE5neFBlcm1pc3Npb25zU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZSA9IHRoaXMuaXNvbGF0ZSA/IG5ldyBCZWhhdmlvclN1YmplY3Q8Tmd4Um9sZXNPYmplY3Q+KHt9KSA6IHRoaXMucm9sZXNTdG9yZS5yb2xlc1NvdXJjZTtcclxuICAgICAgICB0aGlzLnJvbGVzJCA9IHRoaXMucm9sZXNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFJvbGUobmFtZTogc3RyaW5nLCB2YWxpZGF0aW9uRnVuY3Rpb246IEZ1bmN0aW9uIHwgc3RyaW5nW10pIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5yb2xlc1NvdXJjZS52YWx1ZSxcclxuICAgICAgICAgICAgW25hbWVdOiB7bmFtZSwgdmFsaWRhdGlvbkZ1bmN0aW9ufVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yb2xlc1NvdXJjZS5uZXh0KHJvbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUm9sZXMocm9sZXNPYmo6IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uIHwgc3RyaW5nW10gfSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHJvbGVzT2JqKS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZShrZXksIHJvbGVzT2JqW2tleV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmbHVzaFJvbGVzKCkge1xyXG4gICAgICAgIHRoaXMucm9sZXNTb3VyY2UubmV4dCh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVJvbGUocm9sZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByb2xlcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5yb2xlc1NvdXJjZS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsZXRlIHJvbGVzW3JvbGVOYW1lXTtcclxuICAgICAgICB0aGlzLnJvbGVzU291cmNlLm5leHQocm9sZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSb2xlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb2xlc1NvdXJjZS52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um9sZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzT25seVJvbGVzKG5hbWVzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IGlzTmFtZXNFbXB0eSA9ICFuYW1lcyB8fCAoQXJyYXkuaXNBcnJheShuYW1lcykgJiYgbmFtZXMubGVuZ3RoID09PSAwKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTmFtZXNFbXB0eSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcclxuXHJcbiAgICAgICAgbmFtZXMgPSB0cmFuc2Zvcm1TdHJpbmdUb0FycmF5KG5hbWVzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLmhhc1JvbGVLZXkobmFtZXMpLCB0aGlzLmhhc1JvbGVQZXJtaXNzaW9uKHRoaXMucm9sZXNTb3VyY2UudmFsdWUsIG5hbWVzKV0pXHJcbiAgICAgICAgICAgIC50aGVuKChbaGFzUm9sZXMsIGhhc1Blcm1pc3Npb25zXTogW2Jvb2xlYW4sIGJvb2xlYW5dKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzUm9sZXMgfHwgaGFzUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFzUm9sZUtleShyb2xlTmFtZTogc3RyaW5nW10pOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCBwcm9taXNlczogT2JzZXJ2YWJsZTxib29sZWFuPltdID0gcm9sZU5hbWUubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGFzVmFsaWRhdGlvbkZ1bmN0aW9uID0gISF0aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgISF0aGlzLnJvbGVzU291cmNlLnZhbHVlW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnVuY3Rpb24odGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzVmFsaWRhdGlvbkZ1bmN0aW9uICYmICFpc1Byb21pc2UodGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25GdW5jdGlvbjogRnVuY3Rpb24gPSA8RnVuY3Rpb24+dGhpcy5yb2xlc1NvdXJjZS52YWx1ZVtrZXldLnZhbGlkYXRpb25GdW5jdGlvbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltbXV0YWJsZVZhbHVlID0gey4uLnRoaXMucm9sZXNTb3VyY2UudmFsdWV9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB2YWxpZGF0aW9uRnVuY3Rpb24oa2V5LCBpbW11dGFibGVWYWx1ZSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgocHJvbWlzZTogUHJvbWlzZTxib29sZWFuPiB8IGJvb2xlYW4pOiBPYnNlcnZhYmxlSW5wdXQ8Ym9vbGVhbj4gPT4gaXNCb29sZWFuKHByb21pc2UpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2YocHJvbWlzZSBhcyBib29sZWFuKSA6IHByb21pc2UgYXMgUHJvbWlzZTxib29sZWFuPiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihmYWxzZSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJvbShwcm9taXNlcykucGlwZShcclxuICAgICAgICAgICAgbWVyZ2VBbGwoKSxcclxuICAgICAgICAgICAgZmlyc3QoKGRhdGE6IGFueSkgPT4gZGF0YSAhPT0gZmFsc2UsIGZhbHNlKSxcclxuICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhICE9PSBmYWxzZSlcclxuICAgICAgICApLnRvUHJvbWlzZSgpLnRoZW4oKGRhdGE6IGFueSkgPT4gZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYXNSb2xlUGVybWlzc2lvbihyb2xlczogTmd4Um9sZXNPYmplY3QsIHJvbGVOYW1lczogc3RyaW5nW10pOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gZnJvbShyb2xlTmFtZXMpLnBpcGUoXHJcbiAgICAgICAgICAgIG1lcmdlTWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1trZXldICYmIEFycmF5LmlzQXJyYXkocm9sZXNba2V5XS52YWxpZGF0aW9uRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20oPHN0cmluZ1tdPnJvbGVzW2tleV0udmFsaWRhdGlvbkZ1bmN0aW9uKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgocGVybWlzc2lvbikgPT4gdGhpcy5wZXJtaXNzaW9uc1NlcnZpY2UuaGFzUGVybWlzc2lvbihwZXJtaXNzaW9uKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZXJ5KChoYXNQZXJtaXNzaW9ucykgPT4gaGFzUGVybWlzc2lvbnMgPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZmlyc3QoKGhhc1Blcm1pc3Npb24pID0+IGhhc1Blcm1pc3Npb24gPT09IHRydWUsIGZhbHNlKVxyXG4gICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==