const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  message: {
    type: Object,
    required: false,
  },
  prKey: {
    type: Object,
    required: false,
  },
  puKey: {
    type: Object,
    require: false,
  },
  signature: {
    type: Object,
    require: false,
  },
  seq: {
    type: Object,
    require: false,
  },
  isVerify: {
    type: Object,
    require: false,
  },
});

module.exports = mongoose.model("signatureContent", SignatureSchema);
