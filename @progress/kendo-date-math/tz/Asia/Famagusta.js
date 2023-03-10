const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Famagusta": [
      [
        -135.8,
        "-",
        "LMT",
        -1518912000000
      ],
      [
        -120,
        "Cyprus",
        "EE%sT",
        904608000000
      ],
      [
        -120,
        "EUAsia",
        "EE%sT",
        1473292800000
      ],
      [
        -180,
        "-",
        "+03",
        1509238800000
      ],
      [
        -120,
        "EUAsia",
        "EE%sT",
        null
      ]
    ]
  },
  "rules": {
    "Cyprus": [
      [
        1975,
        "only",
        "-",
        "Apr",
        "13",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1975,
        "only",
        "-",
        "Oct",
        "12",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1976,
        "only",
        "-",
        "May",
        "15",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1976,
        "only",
        "-",
        "Oct",
        "11",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1977,
        "only",
        "-",
        "Sep",
        "25",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1978,
        "only",
        "-",
        "Oct",
        "2",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1979,
        1997,
        "-",
        "Sep",
        "lastSun",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1981,
        1998,
        "-",
        "Mar",
        "lastSun",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ]
    ],
    "EUAsia": [
      [
        1981,
        "max",
        "-",
        "Mar",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        60,
        "S"
      ],
      [
        1979,
        1995,
        "-",
        "Sep",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        0,
        "-"
      ],
      [
        1996,
        "max",
        "-",
        "Oct",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Asia/Famagusta": {
      "long": null,
      "group": null
    }
  }
});