import { SimpleChange } from '@angular/core';
/**
 * @hidden
 */
export function toSimpleChanges(changes) {
    var result = {};
    for (var propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        result[propertyName] = new SimpleChange(null, changes[propertyName], false);
    }
    return result;
}
