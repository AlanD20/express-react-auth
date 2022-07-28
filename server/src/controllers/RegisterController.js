const prisma = require('../app/prisma');
const { validator } = require('../app/validator');
const bcrypt = require('bcrypt');
const { createSession } = require('../app/session');

const RegisterController = async (req, res) => {
  return validator(
    {
      schema: 'register',
      response: res,
      body: req.body,
    },
    async ({ name, email, password }) => {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return {
        message: 'Register successful',
      };
    }
  );
};

module.exports = RegisterController;
