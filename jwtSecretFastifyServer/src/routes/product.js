// categoryRoutes using getAllCategories function from server/src/controllers/product/category.js
import {getAllCategories} from "../controllers/product/category.js"
// productRoutes using getAllProducts function from server/src/controllers/product/product.js
import {getProductsByCategoryId} from "../controllers/product/product.js"

export const categoryRoutes = async (fastify, options) => {
  fastify.get("/categories", getAllCategories)
}

export const productRoutes = async (fastify, options) => {
  fastify.get("/products/:categoryId", getProductsByCategoryId)
}
