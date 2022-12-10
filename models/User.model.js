const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    // token: {
    //   type: String,
    // },
    decks: [{
      type: Schema.Types.ObjectId,
      ref: 'Cards',
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;

//model for answer session for one day and then calculate outcome