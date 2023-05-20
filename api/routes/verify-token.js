const express = require('express');
const router = express.Router();
const Token = require("../services/token");

router.get('/:token', function(request, response) {
  const token = Token.verify(request.params.token);
  if(token.verified)
  {
    response.status(200);
    response.json(token);
  }
  else {
    response.status(401);
    response.json(token);
  }
});

module.exports = router;
