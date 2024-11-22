import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

const ProductTable = (props) => {
  const { products, handleEdit, handleDelete } = props

  return (
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
  )
}

export default ProductTable
