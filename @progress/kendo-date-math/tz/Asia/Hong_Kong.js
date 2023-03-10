const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Hong_Kong": [
      [
        -456.7,
        "-",
        "LMT",
        -2056663398000
      ],
      [
        -480,
        "-",
        "HKT",
        -900880200000
      ],
      [
        -480,
        "1:00",
        "HKST",
        -891547200000
      ],
      [
        -510,
        "-",
        "HKT",
        -884217600000
      ],
      [
        -540,
        "-",
        "JST",
        -766627200000
      ],
      [
        -480,
        "HK",
        "HK%sT",
        null
      ]
    ]
  },
  "rules": {
    "HK": [
      [
        1946,
        "only",
        "-",
        "Apr",
        "20",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1946,
        "only",
        "-",
        "Dec",
        "1",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1947,
        "only",
        "-",
        "Apr",
        "13",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1947,
        "only",
        "-",
        "Dec",
        "30",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1948,
        "only",
        "-",
        "May",
        "2",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1948,
        1951,
        "-",
        "Oct",
        "lastSun",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1952,
        1953,
        "-",
        "Nov",
        "Sun>=1",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1949,
        1953,
        "-",
        "Apr",
        "Sun>=1",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1954,
        1964,
        "-",
        "Mar",
        "Sun>=18",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1954,
        "only",
        "-",
        "Oct",
        "31",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1955,
        1964,
        "-",
        "Nov",
        "Sun>=1",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1965,
        1976,
        "-",
        "Apr",
        "Sun>=16",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1965,
        1976,
        "-",
        "Oct",
        "Sun>=16",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1973,
        "only",
        "-",
        "Dec",
        "30",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1979,
        "only",
        "-",
        "May",
        "Sun>=8",
        [
          3,
          30,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1979,
        "only",
        "-",
        "Oct",
        "Sun>=16",
        [
          3,
          30,
          0,
          null
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Asia/Hong_Kong": {
      "long": "China Standard Time",
      "group": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    }
  }
});