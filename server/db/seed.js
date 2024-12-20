import getDb from "./db.js"

const seedDb = async () => {
  try {
    const db = await getDb()
    const collection = db.collection("products")

    const products = [
      {
        _id: 1,
        name: "AC1 Phone1",
        type: "phone",
        price: 200.05,
        rating: 3.8,
        warranty_years: 1,
        available: true,
      },
      {
        _id: 2,
        name: "AC2 Phone2",
        type: "phone",
        price: 147.21,
        rating: 1,
        warranty_years: 3,
        available: false,
      },
      {
        _id: 3,
        name: "AC3 Phone3",
        type: "phone",
        price: 150,
        rating: 2,
        warranty_years: 1,
        available: true,
      },
      {
        _id: 4,
        name: "AC4 Phone4",
        type: "phone",
        price: 50.2,
        rating: 3,
        warranty_years: 2,
        available: true,
      },
    ]

    await collection.deleteMany({})

    const result = await collection.insertMany(products)
    console.log(`${result.insertedCount} products inserted !`)
  } catch (err) {
    console.error("Erro while inserting data", err)
  }
}

export default seedDb
