var express = require("express");
var GPIB = require("linux-gpib");

const gpib = GPIB(0);
let dmm = gpib.connect({ pad: 13 });

const router = express.Router(); // 새로 생겼어요!

let voltages = [
  { volt: 100 },
  { volt: 200 },
  { volt: 300 },
  { volt: 400 },
  { volt: 500 },
  { volt: 600 },
];

let currents = [
  { curr: 20 },
  { curr: 30 },
  { curr: 40 },
  { curr: 50 },
  { curr: 60 },
  { curr: 70 },
];

router.get("/volt/ac", (req, res) => {
  dmm
    .query("MEAS:VOLT:AC?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/volt/dc", (req, res) => {
  dmm
    .query("MEAS:VOLT:DC?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/curr/ac", (req, res) => {
  dmm
    .query("MEAS:CURR:AC?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/curr/dc", (req, res) => {
  dmm
    .query("MEAS:CURR:DC?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/res/2w", (req, res) => {
  dmm
    .query("MEAS:RES?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/res/4w", (req, res) => {
  dmm
    .query("MEAS:FRES?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
router.get("/freq", (req, res) => {
  dmm
    .query("MEAS:FREQ?")
    .then((response) => {
      let data = [];
      return data;
    })
    .then((data) => {
      res.json(data);
      dmm.disconnect();
    });
});
module.exports = router;