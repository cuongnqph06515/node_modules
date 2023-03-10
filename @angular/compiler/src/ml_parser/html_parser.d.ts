/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TokenizeOptions } from './lexer';
import { Parser, ParseTreeResult } from './parser';
export { ParseTreeResult, TreeError } from './parser';
export declare class HtmlParser extends Parser {
    constructor();
    parse(source: string, url: string, options?: TokenizeOptions): ParseTreeResult;
}
