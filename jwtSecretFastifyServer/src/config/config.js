import fastifySession from "@fastify/session"
import fastifyCookie from "@fastify/cookie"
import ConnectMongoDBSession from "connect-mongodb-session"
import "dotenv/config"
import {Admin} from "../models/index.js"

export const PORT = process.env.PORT || 3000

export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD

const MongoDBStore = ConnectMongoDBSession(fastifySession) // Create a MongoDBStore instance

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
})
sessionStore.on("error", error => {
  console.error("session store error", error)
})

// only Admin access  to the admin panel
export const authenticate = async (email, password) => {
  // for first time
  if (email && password) {
    console.log
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return Promise.resolve({email, password})
    } else {
      return null
    }
  }
  // uncomment when created admin manually
  // if (email && password) {
  //   // first time no admin user in the database
  //   const user = await Admin.findOne({email})
  //   if (!user) {
  //     return null
  //   }

  //   if (user.password === password) {
  //     Promise.resolve({email, password})
  //   } else {
  //     return null
  //   }
  // }
  return null
}
