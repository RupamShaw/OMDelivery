import Product from "../../models/products.js"
// getProductByCategory is a function that takes a category id as an argument and returns all products that belong to that category.
export const getProductsByCategoryId = async (req, reply) => {
  const {categoryId} = req.params
  try {
    const products = await Product.find({category: categoryId})
      .select("-category")
      .exec()
    return reply.send(products)
  } catch (error) {
    return reply.status(500).send({message: "Internal server error", error})
  }
}
