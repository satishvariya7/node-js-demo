const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/users");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, minlength: 3 },
  gender: { type: String, require: true },
  age: { type: Number, require: true },
  contact: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true, minlength: 6 },
});

const users = mongoose.model("logged-users", userSchema);

const database_modules = {
  addUsers: async (user) => {
    const data = await new users(user);
    return data.save();
  },
  existEmail: async (email) => {
    return await users.findOne({ email: email });
  },
  loginUser: async (email, password) => {
    const data = await users.findOne({ email: email, password: password });
    if (data) return data.toObject();
    else return false;
  },
  getUser: async (id) => {
    const objectId = mongoose.isValidObjectId(id);
    if (objectId) {
      return await users.findOne({ _id: id });
    } else return false;
  },
};

module.exports = database_modules;
