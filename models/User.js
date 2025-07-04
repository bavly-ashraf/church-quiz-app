const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, select: false},
  birthday: Date,
  mobile: String,
  instance_id: String,
  country_id: String,
  city_id: String
});

userSchema.pre('save', async function () {
   const { password } = this;
   if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      this.password = hashedPassword;
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;