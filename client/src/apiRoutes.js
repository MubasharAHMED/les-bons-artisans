const apiRoutes = {
  products: {
    create: () => "http://127.0.0.1:5000/products",
    readAll: () => "http://127.0.0.1:5000/products",
    update: (id) => `http://127.0.0.1:5000/products/${id}`,
    delete: (id) => `http://127.0.0.1:5000/products/${id}`,
  },
  sign: {
    signUp: () => "http://127.0.0.1:5000/sign-in",
    signIn: () => "http://127.0.0.1:5000/sign-up",
  },
}

export default apiRoutes
