import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
email: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  unique: true
}
,password: {
  type: String,
  required: true,
  minlength: 6
}
,
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

// password hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password comparison during login
userSchema.methods.authenticate = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// hide password when sending
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
