// for admin js controller
import AdminJS from "adminjs"
import AdminJSFastify from "@adminjs/fastify"
import * as AdminJSMongoose from "@adminjs/mongoose"
import {dark, light, noSidebar} from "@adminjs/themes"

import * as Models from "../models/index.js"
import {authenticate, COOKIE_PASSWORD, sessionStore} from "./config.js"

AdminJS.registerAdapter(AdminJSMongoose)

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["role", "isActivated", "phone"],
        filterProperties: ["role", "phone"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["role", "isActivated", "email"],
        filterProperties: ["role", "email"],
      },
    },
    {
      resource: Models.Product,
    },
    {
      resource: Models.Order,
    },
    {
      resource: Models.Category,
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["role", "isActivated", "email"],
        filterProperties: ["role", "email"],
      },
    },
    {
      resource: Models.Branch,
    },
    {
      resource: Models.Counter,
    },
  ],

  rootPath: "/admin",
  loginPath: "/admin/login",
  logoutPath: "/admin/logout",
  branding: {
    companyName: "OM Grocery Delivery",
    withMadeWithLove: false,
  },
  dashboard: {
    handler: async () => {
      return {some: "output"}
    },
  },
  cookiePassword: COOKIE_PASSWORD,
  authenticate,
  sessionStore,
  theme: dark,
  availableThemes: [dark, light, noSidebar],
  defaultTheme: "dark",
})
export const buildAdminRouter = async app => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: COOKIE_PASSWORD,
      authenticate,
      cookieName: "adminjs",
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
    }
  )
}
