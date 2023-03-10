const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Pacific/Tongatapu": [
      [
        -739.3333333333334,
        "-",
        "LMT",
        -2146003200000
      ],
      [
        -740,
        "-",
        "+1220",
        -883699200000
      ],
      [
        -780,
        "-",
        "+13",
        946598400000
      ],
      [
        -780,
        "Tonga",
        "+13/+14",
        null
      ]
    ]
  },
  "rules": {
    "Tonga": [
      [
        1999,
        "only",
        "-",
        "Oct",
        "7",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        2000,
        "only",
        "-",
        "Mar",
        "19",
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
        2000,
        2001,
        "-",
        "Nov",
        "Sun>=1",
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
        2001,
        2002,
        "-",
        "Jan",
        "lastSun",
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
        2016,
        "only",
        "-",
        "Nov",
        "Sun>=1",
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
        2017,
        "only",
        "-",
        "Jan",
        "Sun>=15",
        [
          3,
          0,
          0,
          null
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Pacific/Tongatapu": {
      "long": "Tonga Standard Time",
      "group": "(GMT+13:00) Nuku'alofa"
    }
  }
});