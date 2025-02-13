import {
  confirmOrder,
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order/order.js"
import {verifyToken} from "../middleware/auth.js"

export const orderRoutes = async (fastify, options) => {
  // use fastify hooks to protect routes
  fastify.addHook("preHandler", async (req, reply) => {
    const isAuthenticated = await verifyToken(req, reply)
    console.log("isAuthenticated", isAuthenticated)
    if (!isAuthenticated) {
      return reply.status(401).send({message: "Unauthorized"})
    }
  })
  fastify.post("/order", createOrder)
  fastify.get("/order", getOrders)
  fastify.get("/order/:orderId", getOrderById)
  fastify.put("/order/:orderId/status", updateOrderStatus)
  fastify.put("/order/:orderId/confirm", confirmOrder)
}
