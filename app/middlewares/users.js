function validador(input) {
  const reg = /^[^%\s]{8,}/;
  const reg2 = /[a-zA-Z]/;
  const reg3 = /[0-9]/;
  return reg.test(input) && reg2.test(input) && reg3.test(input);
}
/* Middleware que verifica que la contraseña creada en el login sea alphanumerica */
const passwordValidator = (req, res, next) => {
  try {
    if (validador(req.body.password)) {
      next();
    } else {
      res.status(400).json({
        ok: false,
        err: 'El password debe contener al menos 8 caracteres alphanumericos'
      });
    }
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
};
module.exports = { passwordValidator };
