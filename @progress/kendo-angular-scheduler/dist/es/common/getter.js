var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};
getterCache['undefined'] = function () { return undefined; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export function getter(field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    getterCache[field] = function (obj) {
        var result = obj;
        for (var idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
}
