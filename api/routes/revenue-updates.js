var express = require('express');
var router = express.Router();

router.get("/",(request,response)=>{
  let earning = [];
  let expenses = [];

  let year = request.params.year;
  for(let i=1;i<=12;i++)
  {
    let randomOne = Math.floor(Math.random()*25369);
    earning.push(randomOne);
    let randomTwo = Math.floor(Math.random()*19632);
    expenses.push(randomTwo);
  }

  response.json({
    months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    earning: earning,
    expenses: expenses
  })
});

module.exports = router;
