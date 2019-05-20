const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwb = require("jsonwebtoken");
const authConfig = require("../config/auth");

function generateToken(params = {}) {
  return jwb.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .send({ error: "Usuário já existe com esse email" });
    }

    console.log(req.body);
    const user = await User.create(req.body);
    user.password = undefined;
    
    res.send({
      user,
      token: generateToken({ id: user.id })
    });
  } catch (error) {
    return res.status(400).send({ error: " Algo deu errado na aplicação" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "Usuário não existe" });
  }
  // await usa por que é uma função syncrona
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Erro:Senha não existe" });
  }

  user.password = undefined;

  const token = jwb.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400
  });

  res.send({
    user,
    token: generateToken({ id: user.id })
  });
});

/**
 * todas as rotas definidas acima vão ser prifixadas com /auth
 */

module.exports = exp => exp.use("/auth", router);
