const mongo = require('mongoose');
const { Schema } = mongo;

const userSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    mobile: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

userSchema.pre("save",async function(next){
  const user = await mongo.model('User').findOne({
    email: this.email
  });
  if(user)
  {
    next("Username already exist");
  }
  else {
    next();
  }
});

module.exports = mongo.model('User', userSchema);
