const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Moscow": [
      [
        -150.28333333333333,
        "-",
        "LMT",
        -2808604800000
      ],
      [
        -150.28333333333333,
        "-",
        "MMT",
        -1688256000000
      ],
      [
        -151.31666666666666,
        "Russia",
        "%s",
        -1593820800000
      ],
      [
        -180,
        "Russia",
        "%s",
        -1522713600000
      ],
      [
        -180,
        "Russia",
        "MSK/MSD",
        -1491177600000
      ],
      [
        -120,
        "-",
        "EET",
        -1247529600000
      ],
      [
        -180,
        "Russia",
        "MSK/MSD",
        670384800000
      ],
      [
        -120,
        "Russia",
        "EE%sT",
        695786400000
      ],
      [
        -180,
        "Russia",
        "MSK/MSD",
        1301191200000
      ],
      [
        -240,
        "-",
        "MSK",
        1414288800000
      ],
      [
        -180,
        "-",
        "MSK",
        null
      ]
    ]
  },
  "rules": {
    "Russia": [
      [
        1917,
        "only",
        "-",
        "Jul",
        "1",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "MST",
        ""
      ],
      [
        1917,
        "only",
        "-",
        "Dec",
        "28",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "MMT",
        ""
      ],
      [
        1918,
        "only",
        "-",
        "May",
        "31",
        [
          22,
          0,
          0,
          null
        ],
        120,
        "MDST",
        ""
      ],
      [
        1918,
        "only",
        "-",
        "Sep",
        "16",
        [
          1,
          0,
          0,
          null
        ],
        60,
        "MST"
      ],
      [
        1919,
        "only",
        "-",
        "May",
        "31",
        [
          23,
          0,
          0,
          null
        ],
        120,
        "MDST"
      ],
      [
        1919,
        "only",
        "-",
        "Jul",
        "1",
        [
          0,
          0,
          0,
          "u"
        ],
        60,
        "MSD"
      ],
      [
        1919,
        "only",
        "-",
        "Aug",
        "16",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "MSK"
      ],
      [
        1921,
        "only",
        "-",
        "Feb",
        "14",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "MSD"
      ],
      [
        1921,
        "only",
        "-",
        "Mar",
        "20",
        [
          23,
          0,
          0,
          null
        ],
        120,
        "+05"
      ],
      [
        1921,
        "only",
        "-",
        "Sep",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "MSD"
      ],
      [
        1921,
        "only",
        "-",
        "Oct",
        "1",
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
        1984,
        "-",
        "Apr",
        "1",
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
        1981,
        1983,
        "-",
        "Oct",
        "1",
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
        1984,
        1995,
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1985,
        2010,
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1996,
        2010,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Europe/Moscow": {
      "long": "Russian Standard Time",
      "group": "(GMT+03:00) Moscow, St. Petersburg, Volgograd"
    }
  }
});