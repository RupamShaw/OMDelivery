import "dotenv/config"
import fastifySocketIO from "fastify-socket.io"
import fastify from "fastify"
import fastifySession from "@fastify/session"

import {PORT} from "./src/config/config.js"
import {registerRoutes} from "./src/routes/index.js"
import {buildAdminRouter} from "./src/config/setup.js"
import {connectDB} from "./src/config/connect.js"
import {admin} from "./src/config/setup.js"

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  const app = fastify()

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  })

  await registerRoutes(app)
  await buildAdminRouter(app)
  app.listen({port: PORT, host: "0.0.0.0"}, (err, _addr) => {
    if (err) {
      console.log(err)
    } else {
      console.log(
        `Server listening on port http://localhost:${PORT}${admin.options.rootPath}`
      )
    }
  })
  app.ready().then(() => {
    app.io.on("connection", socket => {
      console.log("user connected")
      socket.on("joinRoom", orderId => {
        socket.join(orderId)
        console.log(`user joined room ${orderId}`)
      })
      socket.on("disconnect", () => {
        console.log("user disconnected")
      })
    })
  })
}
start()
