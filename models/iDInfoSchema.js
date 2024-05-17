const mongoose = require("mongoose");

const iDInfoSchema = mongoose.Schema(
  {
    refNo: {
      type: String,
      required: [true, "Please enter Ref No"],
    },
    aadhar: {
      type: String,
      required: [true, "Please enter Aadhar ID"],
      unique: true,
    },
    voterId: {
      type: String,
      required: [true, "Please enter Voter ID"],
      unique: true,
    },
    mobileNo: {
      type: Number,
      required: [true, "Please enter Mobile number"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    age: {
      type: Number,
      required: [true, "Please enter age"],
    },
    place: {
      type: String,
      required: [true, "Please enter place"],
    },
    district: {
      type: String,
      required: [true, "Please enter district"],
    },
  },
  {
    timestamps: true,
  }
);

const IDInfo = mongoose.model("IDInfo", iDInfoSchema);

module.exports = IDInfo;
