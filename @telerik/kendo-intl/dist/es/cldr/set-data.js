import { cldr } from './info';

export default function setData(data) {
    var locale = data.name;
    var info = cldr[locale] = cldr[locale] || {};
    if (data.likelySubtags) {
        var supplemental = cldr.supplemental = cldr.supplemental || {};
        supplemental.likelySubtags = Object.assign(supplemental.likelySubtags || {}, data.likelySubtags);
    }

    var numbers = info.numbers;

    Object.assign(info, data);

    if (numbers && data.numbers) {
        info.numbers = Object.assign({}, numbers, data.numbers);
    }
}