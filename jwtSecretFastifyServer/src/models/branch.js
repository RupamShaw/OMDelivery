import mongoose from "mongoose"
import {DeliveryPartner} from "./user.js"
// Branch schema
const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DeliveryPartner,
  },
})
const Branch = mongoose.model("Branch", branchSchema)
export default Branch
