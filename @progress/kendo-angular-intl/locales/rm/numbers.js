var setData = require('@progress/kendo-angular-intl').setData;
setData({
    name: "rm",
    likelySubtags: {
        rm: "rm-Latn-CH"
    },
    identity: {
        language: "rm"
    },
    territory: "CH",
    numbers: {
        symbols: {
            decimal: ".",
            group: "’",
            list: ";",
            percentSign: "%",
            plusSign: "+",
            minusSign: "−",
            exponential: "E",
            superscriptingExponent: "×",
            perMille: "‰",
            infinity: "∞",
            nan: "NaN",
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
                "nEn"
            ],
            groupSize: []
        },
        percent: {
            patterns: [
                "n %"
            ],
            groupSize: [
                3
            ]
        },
        currency: {
            patterns: [
                "n $"
            ],
            groupSize: [
                3
            ],
            "unitPattern-count-one": "n $",
            "unitPattern-count-other": "n $"
        },
        accounting: {
            patterns: [
                "n $"
            ],
            groupSize: [
                3
            ]
        }
    },
    currencyData: {
        CHF: {
            _rounding: "0",
            _digits: "2",
            _cashRounding: "5"
        }
    }
});
