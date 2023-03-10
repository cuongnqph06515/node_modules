const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Matamoros": [
      [
        400,
        "-",
        "LMT",
        -1514767200000
      ],
      [
        360,
        "-",
        "CST",
        599529600000
      ],
      [
        360,
        "US",
        "C%sT",
        631065600000
      ],
      [
        360,
        "Mexico",
        "C%sT",
        1293753600000
      ],
      [
        360,
        "US",
        "C%sT",
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
    ],
    "Mexico": [
      [
        1939,
        "only",
        "-",
        "Feb",
        "5",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1939,
        "only",
        "-",
        "Jun",
        "25",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1940,
        "only",
        "-",
        "Dec",
        "9",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1941,
        "only",
        "-",
        "Apr",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1943,
        "only",
        "-",
        "Dec",
        "16",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "W",
        ""
      ],
      [
        1944,
        "only",
        "-",
        "May",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1950,
        "only",
        "-",
        "Feb",
        "12",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1950,
        "only",
        "-",
        "Jul",
        "30",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1996,
        2000,
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
        1996,
        2000,
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
        2001,
        "only",
        "-",
        "May",
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
        2001,
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
        2002,
        "max",
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
        2002,
        "max",
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
      ]
    ]
  },
  "titles": {
    "America/Matamoros": {
      "long": "Central Standard Time",
      "group": "(GMT-06:00) Central Time (US & Canada)"
    }
  }
});