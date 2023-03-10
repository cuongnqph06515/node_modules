import { isString } from '../common';
import toDate from './to-date';

export default function parseDate(intlService, date) {
    var result;
    if (isString(date)) {
        result = intlService.parseDate(date) || toDate(date);
    } else {
        result = toDate(date);
    }
    return result;
}
