const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Atlantic/Reykjavik": [
      [
        88,
        "-",
        "LMT",
        -1925078400000
      ],
      [
        60,
        "Iceland",
        "-01/+00",
        -54774000000
      ],
      [
        0,
        "-",
        "GMT",
        null
      ]
    ]
  },
  "rules": {
    "Iceland": [
      [
        1917,
        1919,
        "-",
        "Feb",
        "19",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1917,
        "only",
        "-",
        "Oct",
        "21",
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
        1918,
        1919,
        "-",
        "Nov",
        "16",
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
        1921,
        "only",
        "-",
        "Mar",
        "19",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1921,
        "only",
        "-",
        "Jun",
        "23",
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
        1939,
        "only",
        "-",
        "Apr",
        "29",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1939,
        "only",
        "-",
        "Oct",
        "29",
        [
          2,
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
        "Feb",
        "25",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1940,
        1941,
        "-",
        "Nov",
        "Sun>=2",
        [
          1,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1941,
        1942,
        "-",
        "Mar",
        "Sun>=2",
        [
          1,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1943,
        1946,
        "-",
        "Mar",
        "Sun>=1",
        [
          1,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1942,
        1948,
        "-",
        "Oct",
        "Sun>=22",
        [
          1,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1947,
        1967,
        "-",
        "Apr",
        "Sun>=1",
        [
          1,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1949,
        "only",
        "-",
        "Oct",
        "30",
        [
          1,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1950,
        1966,
        "-",
        "Oct",
        "Sun>=22",
        [
          1,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1967,
        "only",
        "-",
        "Oct",
        "29",
        [
          1,
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
    "Atlantic/Reykjavik": {
      "long": "Greenwich Standard Time",
      "group": "(GMT) Monrovia, Reykjavik"
    }
  }
});