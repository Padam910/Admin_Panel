const express = require('express');
const router = express.Router();
const {
  create,
  fetch,
  deleteNote
} = require("../controller/notes");

router.post('/',create);

router.get('/:id',fetch);

router.delete('/:id',deleteNote);

module.exports = router;
