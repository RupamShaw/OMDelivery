import mongoose from "mongoose"
// Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
})

const Products = mongoose.model("Products", productSchema)
export default Products
