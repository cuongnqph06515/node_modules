const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Barbados": [
      [
        238.48333333333335,
        "-",
        "LMT",
        -1420156800000
      ],
      [
        238.48333333333335,
        "-",
        "BMT",
        -1167696000000
      ],
      [
        240,
        "Barb",
        "A%sT",
        null
      ]
    ]
  },
  "rules": {
    "Barb": [
      [
        1977,
        "only",
        "-",
        "Jun",
        "12",
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
        1977,
        1978,
        "-",
        "Oct",
        "Sun>=1",
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
        1978,
        1980,
        "-",
        "Apr",
        "Sun>=15",
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
        1979,
        "only",
        "-",
        "Sep",
        "30",
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
        1980,
        "only",
        "-",
        "Sep",
        "25",
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
    "America/Barbados": {
      "long": "SA Western Standard Time",
      "group": "(GMT-04:00) La Paz"
    }
  }
});