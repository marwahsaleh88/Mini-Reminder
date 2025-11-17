import { Schema, model } from "mongoose";

const reminderSchema = new Schema({

user: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
},

  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",// optional field 
    trim: true // remove spaces from start and end
  },
  date: {
    type: Date,
    required: true
  },
  isCompleted: {  // status of the reminder
    type: Boolean,
    default: false
  },
  notifyByEmail: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    trim: true,

// only required if notifyByEmail is true
    required: function () {

      return this.notifyByEmail; // 
    }
  }
}, { timestamps: true }); // automatically manage createdAt and updatedAt fields

export default model("Reminder", reminderSchema);
