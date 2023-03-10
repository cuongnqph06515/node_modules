/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:no-null-keyword */
/* tslint:disable:no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
var resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.tick = function (f) { return (resolvedPromise.then(f)); };
