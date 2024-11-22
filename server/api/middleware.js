const validateSignIn = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" })
  }
  next()
}

export { validateSignIn }
