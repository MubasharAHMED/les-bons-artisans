const apiRoutes = {
  products: {
    create: () => "http://127.0.0.1:5000/products",
    readAll: () => "http://127.0.0.1:5000/products",
    update: (id) => `http://127.0.0.1:5000/products/${id}`,
    delete: (id) => `http://127.0.0.1:5000/products/${id}`,
  },
}

export default apiRoutes
