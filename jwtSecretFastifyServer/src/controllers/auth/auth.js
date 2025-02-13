// auth controller
// use import in full project
import "dotenv/config"
import jwt from "jsonwebtoken"
import {DeliveryPartner, Customer} from "../../models/user.js"

const generateTokens = user => {
  const accessToken = jwt.sign(
    {userId: user.id, role: user.role},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    }
  )
  const refreshToken = jwt.sign(
    {userId: user.id, role: user.role},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
  )
  return {accessToken, refreshToken}
}

export const loginCustomer = async (req, reply) => {
  try {
    const {phone, name} = req.body
    let customer = await Customer.findOne({phone})
    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
        name: name ?? `Customer ${phone}`,
      })
      await customer.save()

      // return reply.status(400).json({message: "User not found"})
    }
    const {accessToken, refreshToken} = generateTokens(customer)
    //  return reply.status(200).json({tokens})
    return reply.send({
      message: "Login successful",
      accessToken,
      refreshToken,
      customer,
    })
  } catch (error) {
    reply.status(500).json({message: error.message}) // this gives error  "reply.status(...).json is not a function"
    // reply.status(500).send({message: error.message}) // this gives error  "reply.status(...).json is not a function"
    // reply.send({message: error.message}) // this crashes app
  }
}

export const loginDeliveryPartner = async (req, reply) => {
  try {
    const {email} = req.body
    let deliveryPartner = await DeliveryPartner.findOne({email})
    if (!deliveryPartner) {
      return reply.status(400).json({message: "DeliveryPartner not found"})
    }
    // const isMatch = await bcrypt.compare(
    //   req.body.password,
    //   deliveryPartner.password
    // )
    const isMatch = deliveryPartner.password

    if (!isMatch) {
      return reply.status(400).json({message: "Invalid credentials"})
    }
    const {accessToken, refreshToken} = generateTokens(deliveryPartner)
    return reply.send({
      message: "Login successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    })
  } catch (error) {
    reply.status(500).json({message: error.message})
  }
}

export const refreshToken = async (req, reply) => {
  const {refreshToken} = req.body
  if (!refreshToken) {
    return reply.status(403).json({message: "Access denied, token missing!"})
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    let user
    // first check role of user
    if (decoded.role === "Customer") {
      user = await Customer.findById(decoded.userId)
    } else if (decoded.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decoded.userId)
    } else {
      return reply.status(403).json({message: "Invalid Role"})
    }

    if (!user) {
      return reply.status(403).json({message: "User not found"})
    }
    const {accessToken, refreshToken: newRefreshToken} = generateTokens(user)
    return reply.send({
      message: "Token refreshed",
      accessToken,
      refreshToken: newRefreshToken,
    })
  } catch (error) {
    return reply.status(403).json({message: "Invalid Refresh token"})
  }
}

export const fetchUser = async (req, reply) => {
  try {
    const {userId, role} = req.user
    let user
    if (role === "Customer") {
      user = await Customer.findById(userId)
    } else if (role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId)
    } else {
      return reply.status(403).json({message: "Invalid Role"})
    }
    if (!user) {
      return reply.status(404).json({message: "User not found"})
    }
    return reply.send({
      message: "User fetched successfully",
      user,
    })
  } catch (error) {
    reply.status(500).json({message: error.message})
  }
}
