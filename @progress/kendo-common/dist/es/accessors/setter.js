import { fieldList } from './field-list';
var setterCache = {};
// tslint:disable-next-line:no-string-literal
setterCache['undefined'] = function (obj) { return obj; };
var defaultValue = function (nextField, options) {
    return options && options.arrays && !isNaN(Number(nextField)) ? [] : {};
};
/**
 * @hidden
 */
export function setter(field) {
    if (setterCache[field]) {
        return setterCache[field];
    }
    var fields = fieldList(field);
    setterCache[field] = function (obj, value, options) {
        var root = obj;
        var depth = fields.length - 1;
        for (var idx = 0; idx < depth && root; idx++) {
            root = root[fields[idx]] = root[fields[idx]] || defaultValue(fields[idx + 1], options);
        }
        root[fields[depth]] = value;
    };
    return setterCache[field];
}
