import Category from "../../models/category.js"

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find()
    return res.send(categories)
  } catch (error) {
    // handle error 500
    return res.status(500).send({message: "Internal server error", error})
  }
}
