// import all models using import syntax
import {Customer, DeliveryPartner, Admin, User} from "./user.js"
import Order from "./order.js"
import Category from "./category.js"
import Branch from "./branch.js"
import Product from "./products.js"
import Counter from "./counter.js"

// bundle all models in an object and export it
export {
  Admin,
  Branch,
  Category,
  Customer,
  Counter,
  DeliveryPartner,
  Product,
  Order,
  User,
}
