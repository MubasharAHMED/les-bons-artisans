import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  TextField,
} from "@mui/material"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

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

const ProductDialog = (props) => {
  const { open, selectedProduct, handleClose, handleSubmit } = props

  return (
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
                error={touched.warranty_years && Boolean(errors.warranty_years)}
                helperText={touched.warranty_years && errors.warranty_years}
              />

              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
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
  )
}

export default ProductDialog
