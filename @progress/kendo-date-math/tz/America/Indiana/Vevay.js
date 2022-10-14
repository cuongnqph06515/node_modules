const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Indiana/Vevay": [
      [
        340.2666666666667,
        "-",
        "LMT",
        -2717667616000
      ],
      [
        360,
        "US",
        "C%sT",
        -495064800000
      ],
      [
        300,
        "-",
        "EST",
        -86400000
      ],
      [
        300,
        "US",
        "E%sT",
        126144000000
      ],
      [
        300,
        "-",
        "EST",
        1167523200000
      ],
      [
        300,
        "US",
        "E%sT",
        null
      ]
    ]
  },
  "rules": {
    "US": [
      [
        1918,
        1919,
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1918,
        1919,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1942,
        "only",
        "-",
        "Feb",
        "9",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "W",
        ""
      ],
      [
        1945,
        "only",
        "-",
        "Aug",
        "14",
        [
          23,
          0,
          0,
          "u"
        ],
        60,
        "P",
        ""
      ],
      [
        1945,
        "only",
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1967,
        2006,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1967,
        1973,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1974,
        "only",
        "-",
        "Jan",
        "6",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1975,
        "only",
        "-",
        "Feb",
        "23",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1976,
        1986,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1987,
        2006,
        "-",
        "Apr",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        2007,
        "max",
        "-",
        "Mar",
        "Sun>=8",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        2007,
        "max",
        "-",
        "Nov",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ]
    ]
  },
  "titles": {
    "America/Indiana/Vevay": {
      "long": "US Eastern Standard Time",
      "group": "(GMT-05:00) Indiana (East)"
    }
  }
});