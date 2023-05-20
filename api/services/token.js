const secret = "123456"; // this must be confidential and secured
const jwt = require("jsonwebtoken");

const create = (data)=>{
  return jwt.sign({data: data}, secret);
}

const verify = (token)=>{
  try {
      const decoded = jwt.verify(token, secret);
      return {
        verified: true,
        data: decoded
      }
  } catch(err) {
    return {
      verified: false
    }
  }
}

module.exports = {
  create,
  verify
}
