var setData = require('@progress/kendo-angular-intl').setData;
setData({
    name: "lo",
    likelySubtags: {
        lo: "lo-Laoo-LA"
    },
    identity: {
        language: "lo"
    },
    territory: "LA",
    numbers: {
        symbols: {
            decimal: ",",
            group: ".",
            list: ";",
            percentSign: "%",
            plusSign: "+",
            minusSign: "-",
            exponential: "E",
            superscriptingExponent: "×",
            perMille: "‰",
            infinity: "∞",
            nan: "ບໍ່​ແມ່ນ​ໂຕ​ເລກ",
            timeSeparator: ":"
        },
        decimal: {
            patterns: [
                "n"
            ],
            groupSize: [
                3
            ]
        },
        scientific: {
            patterns: [
                "n"
            ],
            groupSize: []
        },
        percent: {
            patterns: [
                "n%"
            ],
            groupSize: [
                3
            ]
        },
        currency: {
            patterns: [
                "$n",
                "$-n"
            ],
            groupSize: [
                3
            ],
            "unitPattern-count-other": "n $"
        },
        accounting: {
            patterns: [
                "$n",
                "$-n"
            ],
            groupSize: [
                3
            ]
        }
    },
    currencyData: {
        LAK: {
            _rounding: "0",
            _digits: "0"
        }
    }
});

