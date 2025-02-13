import {orderRoutes} from "./order.js"
import {productRoutes, categoryRoutes} from "./product.js"
import {authRoutes} from "./auth.js"

const prefix = "/api"

export const registerRoutes = async (fastify, options) => {
  fastify.register(authRoutes, {prefix})
  fastify.register(orderRoutes, {prefix})
  fastify.register(productRoutes, {prefix})
  fastify.register(categoryRoutes, {prefix})
}
