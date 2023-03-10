const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Copenhagen": [
      [
        -50.333333333333336,
        "-",
        "LMT",
        -2493072000000
      ],
      [
        -50.333333333333336,
        "-",
        "CMT",
        -2398291200000
      ],
      [
        -60,
        "Denmark",
        "CE%sT",
        -857253600000
      ],
      [
        -60,
        "C-Eur",
        "CE%sT",
        -781048800000
      ],
      [
        -60,
        "Denmark",
        "CE%sT",
        347068800000
      ],
      [
        -60,
        "EU",
        "CE%sT",
        null
      ]
    ]
  },
  "rules": {
    "Denmark": [
      [
        1916,
        "only",
        "-",
        "May",
        "14",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1916,
        "only",
        "-",
        "Sep",
        "30",
        [
          23,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1940,
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
        1945,
        "only",
        "-",
        "Apr",
        "2",
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
        1945,
        "only",
        "-",
        "Aug",
        "15",
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
        1946,
        "only",
        "-",
        "May",
        "1",
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
        1946,
        "only",
        "-",
        "Sep",
        "1",
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
        1947,
        "only",
        "-",
        "May",
        "4",
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
        1947,
        "only",
        "-",
        "Aug",
        "10",
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
        1948,
        "only",
        "-",
        "May",
        "9",
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
        1948,
        "only",
        "-",
        "Aug",
        "8",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ],
    "C-Eur": [
      [
        1916,
        "only",
        "-",
        "Apr",
        "30",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1916,
        "only",
        "-",
        "Oct",
        "1",
        [
          1,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1917,
        1918,
        "-",
        "Apr",
        "Mon>=15",
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
        1917,
        1918,
        "-",
        "Sep",
        "Mon>=15",
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
        1940,
        "only",
        "-",
        "Apr",
        "1",
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
        1942,
        "only",
        "-",
        "Nov",
        "2",
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
        1943,
        "only",
        "-",
        "Mar",
        "29",
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
        1943,
        "only",
        "-",
        "Oct",
        "4",
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
        1944,
        1945,
        "-",
        "Apr",
        "Mon>=1",
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
        1944,
        "only",
        "-",
        "Oct",
        "2",
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
        1945,
        "only",
        "-",
        "Sep",
        "16",
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
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
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
        1977,
        "only",
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
        1978,
        "only",
        "-",
        "Oct",
        "1",
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
        1979,
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
        1981,
        "max",
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
        "max",
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
    ],
    "EU": [
      [
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
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
        1977,
        "only",
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
        1978,
        "only",
        "-",
        "Oct",
        "1",
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
    "Europe/Copenhagen": {
      "long": "Romance Standard Time",
      "group": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
    }
  }
});