import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import axios from "axios"
import apiRoutes from "./apiRoutes.js"
import ProductTable from "./components/business/ProductTable.jsx"
import ProductDialog from "./components/ui/ProductDialog.jsx"

function App() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios(apiRoutes.products.readAll())

      setProducts(data)
    })()
  }, [])

  const handleEdit = (product = null) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (selectedProduct) {
        await axios.put(apiRoutes.products.update(selectedProduct._id), values)

        setProducts((prev) =>
          prev.map((product) =>
            product._id === selectedProduct._id
              ? { ...product, ...values }
              : product,
          ),
        )
      } else {
        const response = await axios.post(apiRoutes.products.create(), values)

        setProducts((prev) => [
          ...prev,
          { ...values, _id: response.data.productId },
        ])
      }

      resetForm()
      setOpen(false)
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(apiRoutes.products.update(id))

      setProducts((prev) => prev.filter((product) => product._id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error)
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h3"
        color="primary"
        sx={{ textAlign: "center", marginBottom: 3 }}
      >
        Les produits
      </Typography>

      <ProductTable
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <ProductDialog
        open={open}
        selectedProduct={selectedProduct}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </Box>
  )
}

export default App
