var setData = require('@progress/kendo-angular-intl').setData;
setData({
    name: "so-KE",
    likelySubtags: {
        so: "so-Latn-SO"
    },
    identity: {
        language: "so",
        territory: "KE"
    },
    territory: "KE",
    numbers: {
        symbols: {
            decimal: ".",
            group: ",",
            list: ";",
            percentSign: "%",
            plusSign: "+",
            minusSign: "-",
            exponential: "E",
            superscriptingExponent: "×",
            perMille: "‰",
            infinity: "∞",
            nan: "MaL",
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
                "n%"
            ],
            groupSize: [
                3
            ]
        },
        currency: {
            patterns: [
                "$n"
            ],
            groupSize: [
                3
            ],
            "unitPattern-count-other": "n $"
        },
        accounting: {
            patterns: [
                "$n",
                "($n)"
            ],
            groupSize: [
                3
            ]
        }
    }
});

