var express = require('express');
var router = express.Router();
const data = [
  {
    "id": 1,
    "email": "ersaurav@gmail.com",
    "mobile": 9199987267
  },
  {
    "id": 2,
    "email": "rohan@gmail.com",
    "mobile": 216515165
  },
  {
    "id": 3,
    "email": "sikha@gmail.com",
    "mobile": 9600230
  },
  {
    "id": 4,
    "email": "priya@gmail.com",
    "mobile": 3698546
  },
  {
    "id": 5,
    "email": "bikram@gmail.com",
    "mobile": 51056166
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json(data)
});

module.exports = router;
