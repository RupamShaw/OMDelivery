import "dotenv/config"
import mongoose from "mongoose"
import Product from "./src/models/products.js"
import Category from "./src/models/category.js"
import {categories, products} from "./seedData.js"

const seed = async () => {
  try {
    console.log("script uri", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI)
    await Product.deleteMany({})
    await Category.deleteMany({})

    const categoryDocs = await Category.insertMany(categories)
    //[{category1: category.id}, ...]
    const categoryMap = categoryDocs.reduce((acc, category) => {
      acc[category.name] = category._id
      return acc
    }, {})

    await Product.insertMany(
      products.map(product => ({
        ...product,
        category: categoryMap[product.category],
      }))
    )

    console.log("Data seeded successfully")
  } catch (error) {
    console.log("error seeding db", error)
  } finally {
    mongoose.connection.close()
  }
}

seed()
