/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { matchesClasses, matchesNodeName, findElement } from '../rendering/common/dom-queries';
/**
 * @hidden
 */
export const HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
export const FOOTER_CLASS = 'k-grid-footer';
const GRID_LIST = 'KENDO-GRID-LIST';
const TABLE = 'TABLE';
const matchesList = matchesNodeName(GRID_LIST);
const matchesTable = matchesNodeName(TABLE);
const suffix = (locked) => locked ? 'locked' : 'wrap';
const ɵ0 = suffix;
/**
 * @hidden
 */
export class GridQuery {
    constructor(element) {
        this.element = element;
        this.list = findElement(element, matchesList);
    }
    content(locked) {
        return findElement(this.list, matchesClasses(`k-grid-content${locked ? '-locked' : ''}`));
    }
    header(locked) {
        this.headerWrap = this.headerWrap || findElement(this.element, matchesClasses(HEADER_CLASS));
        return findElement(this.headerWrap, matchesClasses(`${HEADER_CLASS}-${suffix(locked)}`));
    }
    footer(locked) {
        this.footerWrap = this.footerWrap || findElement(this.element, matchesClasses(FOOTER_CLASS));
        return findElement(this.footerWrap, matchesClasses(`${FOOTER_CLASS}-${suffix(locked)}`));
    }
    table() {
        return findElement(this.element, matchesTable);
    }
}
export { ɵ0 };
