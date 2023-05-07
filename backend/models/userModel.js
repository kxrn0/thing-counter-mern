const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.sign_up = async function (name, password) {
  if (!name || !password) throw new Error("Please fill in all fields!");

  if (name.length < 3)
    throw new Error("Please enter a name with more than three characters!");

  if (!validator.isStrongPassword(password))
    throw new Error("Please use a strong enough password!");

  const exists = await this.findOne({ name });

  if (exists) throw new Error("Name already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new this({ name, password: hash });

  await user.save();

  return user;
};

UserSchema.statics.log_in = async function (name, password) {
  if (!name || !password) throw new Error("Please fill in all fields");

  const user = await this.findOne({ name });

  console.log("user:");
  console.log(user);
  console.log("------------------");

  if (!user)
    throw new Error(
      "Username not found, please mind capitalization and spelling!"
    );

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Wrong Password!");

  return user;
};

module.exports = mongoose.model("User", UserSchema);
