import { isPresent, isString, isArray } from '../utils';
import { isCompositeFilterDescriptor } from './filter-descriptor.interface';
var operatorMap = function (key) { return ({
    "!=": "neq",
    "<": "lt",
    "<=": "lte",
    "==": "eq",
    ">": "gt",
    ">=": "gte",
    equal: "eq",
    equals: "eq",
    equalto: "eq",
    ge: "gte",
    greater: "gt",
    greaterthan: "gt",
    greaterthanequal: "gte",
    isempty: "isempty",
    isequalto: "eq",
    isgreaterthan: "gt",
    isgreaterthanorequalto: "gte",
    islessthan: "lt",
    islessthanorequalto: "lte",
    isnotempty: "isnotempty",
    isnotequalto: "neq",
    isnull: "isnull",
    le: "lte",
    less: "lt",
    lessthan: "lt",
    lessthanequal: "lte",
    ne: "neq",
    notequal: "neq",
    notequals: "neq",
    notequalto: "neq",
    notsubstringof: "doesnotcontain"
}[key.toLowerCase()] || key); };
var normalizeOperator = function (descriptor) {
    if (descriptor.filters) {
        descriptor.filters = descriptor.filters.map(function (filter) {
            var result = Object.assign({}, filter);
            if (!isCompositeFilterDescriptor(filter) && isString(filter.operator)) {
                result.operator = operatorMap(filter.operator);
            }
            if (isCompositeFilterDescriptor(filter)) {
                normalizeOperator(result);
            }
            return result;
        });
    }
};
var normalizeDescriptor = function (descriptor) {
    if (!isCompositeFilterDescriptor(descriptor)) {
        return {
            filters: isArray(descriptor) ? descriptor : [descriptor],
            logic: "and"
        };
    }
    return Object.assign({}, descriptor);
};
// tslint:disable:max-line-length
/**
 * Converts a [FilterDescriptor]({% slug api_kendo-data-query_filterdescriptor %}) into a [CompositeFilterDescriptor]({% slug api_kendo-data-query_compositefilterdescriptor %}). If a `CompositeFilterDescriptor` is passed, no modifications will be made.
 *
 * @param {CompositeFilterDescriptor | FilterDescriptor} descriptor - The descriptor that will be normalized.
 * @returns {CompositeFilterDescriptor} - The normalized descriptor.
 */
// tslint:enable:max-line-length
export var normalizeFilters = function (descriptor) {
    if (isPresent(descriptor)) {
        descriptor = normalizeDescriptor(descriptor);
        normalizeOperator(descriptor);
    }
    return descriptor;
};
