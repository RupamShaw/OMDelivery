import Order from "../../models/order.js"
import Branch from "../../models/branch.js"
import {Customer, DeliveryPartner} from "../../models/user.js"
export const createOrder = async (req, reply) => {
  try {
    const {userId} = req.user
    const {items, branch, totalPrice} = req.body
    const customerData = await Customer.findById(userId)
    if (!customerData) {
      return reply.status(404).send({message: "Customer not found"})
    }

    const branchData = await Branch.findById(branch)

    const newOrder = new Order({
      customer: userId,
      items: items.map(item => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      branch,
      totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "No address available",
      },
      pickupLocation: {
        latitude: branchData.location.latitude,
        longitude: branchData.location.longitude,
        address: branchData.address || "No address available",
      },
    })

    const saveOrder = await newOrder.save()

    return reply.status(201).send(saveOrder)
  } catch (error) {
    return reply.status(500).send({message: "Failed to create order", error})
  }
}
// this confirmOrder done by deliveryPartner
export const confirmOrder = async (req, reply) => {
  try {
    const {orderId} = req.params
    const {userId} = req.user
    //TODO: check user is deliveryPartner or Customer
    const {deliveryPersonLocation} = req.body
    const deliveryPerson = await DeliveryPartner.findById(userId)
    if (!deliveryPerson) {
      return reply.status(404).send({
        message: " Delivery Person not found",
      })
    }
    const order = await Order.findById(orderId)
    if (!order)
      return reply.status(404).send({
        message: " Order not found",
      })

    if (order.status !== "available") {
      return reply.status(404).send({
        message: " Order is not available",
      })
    }

    order.status = "confirmed"
    order.deliveryPartner = userId
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation.latitude,
      longitude: deliveryPersonLocation.longitude,
      address: deliveryPersonLocation.address || " ",
    }

    await order.save()
    // people who have subscribed this orderId
    req.server.io.to(orderId).emit("orderConfirmed", order)

    // goes to deliveryPartner
    return reply.send(order)
  } catch (error) {
    return reply
      .status(500)
      .send({message: `Failed to confirm order ${error.message}`})
  }
}

// update once order is delivered or cancelled
export const updateOrderStatus = async (req, reply) => {
  try {
    const {orderId} = req.params
    const {status, deliveryPersonLocation} = req.body
    const {userId} = req.user
    const deliveryPartner = await DeliveryPartner.findById(userId)
    if (!deliveryPartner) {
      return reply.status(404).send({message: "Delivery person not found"})
    }
    const order = await Order.findById(orderId)
    if (!order) {
      return reply.status(404).send({message: "Order not found"})
    }
    if (order.status === "delivered" || order.status === "cancelled") {
      return reply.status(400).send({
        message:
          "Order is already delivered or cancelled it cannot be updated again",
      })
    }

    // only deliveryPartner update the status of its own orderId
    if (order.deliveryPartner.toString() !== userId) {
      return reply.status(403).send({message: "Unauthorized"})
    }

    order.status = status
    order.deliveryPersonLocation = deliveryPersonLocation
    await order.save()
    req.server.io.to(orderId).emit("liveTrackingUpdates", order)
    return reply.send(order)
  } catch (error) {
    return res
      .status(500)
      .send({message: "Failed to update order status", error})
  }
}

export const getOrders = async (req, reply) => {
  try {
    const {status, customerId, deliveryPartnerId, branchId} = req.query
    const query = {}
    if (status) query.status = status
    if (customerId) query.customer = customerId
    if (deliveryPartnerId) query.deliveryPartner = deliveryPartnerId
    if (branchId) query.branch = branchId
    const orders = await Order.find(query).populate(
      "customer branch items.item deliveryPartner"
    )
    return reply.send(orders)
    // const order = await Order.findById(orderId)
    // if (!order) {
    //   return reply.status(404).send({message: "Order not found"})
    // }
    // return reply.send(order)
  } catch (error) {
    return reply.status(500).send({message: "Failed to retrieve orders", error})
  }
}

export const getOrderById = async (req, reply) => {
  try {
    const {orderId} = req.params
    const order = await Order.findById(orderId).populate(
      "customer branch items.item deliveryPartner"
    )
    if (!order) {
      return reply.status(404).send({message: "Order not found"})
    }
    return reply.send(order)
  } catch (error) {
    return reply.status(500).send({message: "Failed to retrieve order", error})
  }
}
