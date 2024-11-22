import { validateSignIn } from "../api/middleware.js"
import config from "../config.js"
import getDb from "../db/db.js"
import bcrypt from "bcrypt"

const makeRoutesSign = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    try {
      const db = await getDb()
      const users = db.collection("users")

      const existingUser = await users.findOne({ email })
      if (existingUser) {
        return res.status(409).send({ error: "User already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = { email, password: hashedPassword }
      const result = await usersCollection.insertOne(user)

      res.status(201).send({
        message: "User created successfully",
        userId: result.insertedId,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: "Internal server error" })
    }
  })

  post("/sign-in", validateSignIn, async (req, res) => {
    const { email, password } = req.body

    try {
      const db = await getDb()
      const users = db.collection("users")

      const user = await users.findOne({ email })
      if (!user) {
        return res.status(401).send({ error: "Invalid credentials" })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return res.status(401).send({ error: "Invalid credentials" })
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.security.session.jwt.secret,
        { expiresIn: config.security.session.jwt.expiresIn },
      )

      res.send({ token })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: "Internal server error" })
    } finally {
      await client.close()
    }
  })
}

export default makeRoutesSign
