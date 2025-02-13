import {
  fetchUser,
  loginCustomer,
  loginDeliveryPartner,
  refreshToken,
} from "../controllers/auth/auth.js"
import {updateUser} from "../controllers/tracking/user.js"
import {verifyToken} from "../middleware/auth.js"

export const authRoutes = async (fastify, options) => {
  fastify.post("/login/customer", loginCustomer)
  fastify.post("/login/delivery-partner", loginDeliveryPartner)
  fastify.post("/refresh-token", refreshToken)
  fastify.get("/user", {preHandler: [verifyToken]}, fetchUser)
  fastify.put("/user", {preHandler: [verifyToken]}, updateUser)
}
