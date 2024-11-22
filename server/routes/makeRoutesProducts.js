import getDb from "../db/db.js"

const makeRoutesProducts = ({ app }) => {
  app.get("/products", async (req, res) => {
    try {
      const db = await getDb()
      const collection = db.collection("products")

      const products = await collection.find({}).toArray()

      res.status(200).json(products)
    } catch (err) {
      console.error("Error while getting products", err)
      res.status(500).json({ error: "Internal Server Error" })
    }
  })

  app.post("/products", async (req, res) => {
    try {
      const db = await getDb()
      const collection = db.collection("products")

      const lastProduct = await collection
        .find({})
        .sort({ _id: -1 })
        .limit(1)
        .toArray()
      const nextId = lastProduct.length > 0 ? lastProduct[0]._id + 1 : 1

      const newProduct = { ...req.body, _id: nextId }

      const result = await collection.insertOne(newProduct)

      res.status(201).json({
        message: "Product created successfully",
        productId: result.insertedId,
      })
    } catch (error) {
      console.error("Error while creating product: ", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  })

  app.put("/products/:id", async (req, res) => {
    try {
      const db = await getDb()
      const collection = db.collection("products")

      const { id } = req.params

      const product = req.body

      await collection.updateOne(
        { _id: parseInt(id) },
        {
          $set: {
            name: product.name,
            type: product.type,
            price: product.price,
            rating: product.rating,
            warranty_years: product.warranty_years,
            available: product.available,
          },
        },
      )

      res.status(200).json({ message: "Product updated successfully." })
    } catch (error) {
      console.error("Error while updating product: ", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  })

  app.delete("/products/:id", async (req, res) => {
    try {
      const db = await getDb()
      const collection = db.collection("products")

      const { id } = req.params

      const result = await collection.deleteOne({ _id: parseInt(id) })
      console.log(result)

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Produit supprimé avec succès." })
      } else {
        res.status(404).json({ error: "Produit non trouvé" })
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit : ", error)
      res.status(500).json({ error: "Erreur interne du serveur" })
    }
  })
}

export default makeRoutesProducts
