import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"
import apiRoutes from "./apiRoutes.js"

const validationSchema = Yup.object({
  name: Yup.string().required("Le nom du produit est requis"),
  type: Yup.string().required("Le type du produit est requis"),
  price: Yup.number()
    .required("Le prix est requis")
    .min(0, "Le prix ne peut pas être négatif"),
  rating: Yup.number()
    .required("La note est requise")
    .min(0, "La note ne peut pas être inférieure à 0")
    .max(5, "La note ne peut pas être supérieure à 5"),
  warranty_years: Yup.number()
    .required("Les années de garantie sont requises")
    .min(0, "La garantie doit être d'au moins 0 an"),
  available: Yup.boolean().required("La disponibilité est requise"),
})

const initialValues = {
  name: "",
  type: "",
  price: 0,
  rating: 0,
  warranty_years: 0,
  available: false,
}

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

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nom</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Prix</strong>
              </TableCell>
              <TableCell>
                <strong>Note</strong>
              </TableCell>
              <TableCell>
                <strong>Garantie (Années)</strong>
              </TableCell>
              <TableCell>
                <strong>Disponibilité</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.rating} / 5</TableCell>
                <TableCell>{product.warranty_years}</TableCell>
                <TableCell
                  sx={{
                    color: product.available ? "green" : "red",
                  }}
                >
                  {product.available ? "En stock" : "Non disponible"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleEdit(product)}
                    size="small"
                    sx={{ textTransform: "none", marginRight: 1 }}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit()}
                >
                  Ajouter un Produit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedProduct ? "Modifier Produit" : "Ajouter Produit"}
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={selectedProduct || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Nom"
                  focused
                  fullWidth
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  name="type"
                  label="Type"
                  fullWidth
                  margin="normal"
                  error={touched.type && Boolean(errors.type)}
                  helperText={touched.type && errors.type}
                />
                <Field
                  as={TextField}
                  name="price"
                  label="Prix"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
                <Field
                  as={TextField}
                  name="rating"
                  label="Note"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={touched.rating && Boolean(errors.rating)}
                  helperText={touched.rating && errors.rating}
                />
                <Field
                  as={TextField}
                  name="warranty_years"
                  label="Années de garantie"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={
                    touched.warranty_years && Boolean(errors.warranty_years)
                  }
                  helperText={touched.warranty_years && errors.warranty_years}
                />

                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <FormControlLabel
                    control={
                      <Field
                        as={Checkbox}
                        name="available"
                        checked={values.available}
                        onChange={() =>
                          setFieldValue("available", !values.available)
                        }
                        color="primary"
                      />
                    }
                    label="En stock"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    marginTop: 3,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    color="secondary"
                    variant="outlined"
                  >
                    Annuler
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {selectedProduct ? "Modifier" : "Ajouter"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default App
