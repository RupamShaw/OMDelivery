import "dotenv/config"
import jwt from "jsonwebtoken"

export const verifyToken = async (req, reply) => {
  const headerToken = req.headers["authorization"]
  console.log("headerToken", headerToken)
  if (!headerToken) {
    return reply
      .status(403)
      .send({message: "A token is required for authentication"})
  }
  if (!headerToken.startsWith("Bearer ")) {
    return reply.status(401).send({message: "Invalid token"})
  }
  const token = headerToken.split("Bearer ")[1]
  console.log("token", token, "----", process.env.ACCESS_TOKEN_SECRET)
  try {
    const result = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
      //   function (err, result) {
      //   if (err) {
      //     console.log(err)
      //     return reply.status(403).send({message: "Invalid --or expired Token"})
      //   }
      //   req.user = result
      //   console.log("result", result)
      //   return true
      // }
    )
    req.user = result
    console.log("result", result)
    return true
  } catch (error) {
    return reply.status(403).send({message: "Invalid or expired Token"})
  }
}
