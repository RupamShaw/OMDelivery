import mongoose from "mongoose"

export const connectDB = async uri => {
  try {
    console.log(uri)
    await mongoose.connect(uri)
    console.log("db connected logo tick")
  } catch (error) {
    console.log("DB error", error)
  }
}
