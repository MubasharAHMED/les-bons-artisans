import "dotenv/config"
import express from "express"
import cors from "cors"
import seedDb from "./db/seed.js"
import makeRoutesProducts from "./routes/makeRoutesProducts.js"
import makeRoutesSign from "./routes/makeRoutesUser.js"

const app = express()

app.use(cors())
app.use(express.json())

makeRoutesSign({ app })
makeRoutesProducts({ app })

const startApp = async () => {
  const shouldSeed = process.argv.includes("--seed")

  if (shouldSeed) {
    console.log("Adding seeds...")
    try {
      await seedDb()
    } catch (err) {
      console.error("Error while seeding database", err)
      return
    }
  }

  const port = process.env.PORT || 5000

  app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}

startApp()
