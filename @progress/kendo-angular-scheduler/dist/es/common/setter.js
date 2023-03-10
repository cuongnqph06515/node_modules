var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var setterCache = {};
setterCache['undefined'] = function (obj) { return obj; };
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export function setter(field) {
    if (setterCache[field]) {
        return setterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    setterCache[field] = function (obj, value) {
        var root = obj;
        var depth = fields.length - 1;
        for (var idx = 0; idx < depth && root; idx++) {
            root = root[fields[idx]] = root[fields[idx]] || {};
        }
        root[fields[depth]] = value;
    };
    return setterCache[field];
}
