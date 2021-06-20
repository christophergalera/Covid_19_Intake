const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  // username
  username: {
    type: String,
    required: [true, "Username field is required!"]
  },
  // email
  email: {
    type: String,
    required: [true, "Email field is required!"]
  },
  // password
  password: {
    type: String,
    required: [true, "Password field is required!"],
    minLength: [8, "Password must be at least 8 characters!"]
  }
}, { timestamps: true});

// virtual fields will hold data, but not get added to the MongoDB document
//    you will ONLY use the _fieldName in this section
// any other time, you will refer to it WITHOUT the _
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => this._confirmPassword = value);

// this function is for validating the password and confirm PW are equal
//   next is the next function to run once we are done here
UserSchema.pre("validate", function(next) {
  if(this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match");
  }
  next();
});


// before we save the password into the database, we NEED to encrypt
//    it in a way that no one can undo it!
UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
})

// the collection name in MongoDB will use the string "User", BUT...
//  it will make the string lower case AND plural
//  in this case, it will result in the collection name:  users
// this is true for EVERY model you create
const User = mongoose.model("User", UserSchema);

module.exports = User;