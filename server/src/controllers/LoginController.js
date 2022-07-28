const prisma = require('../app/prisma');
const { Status } = require('@prisma/client');
const { validator } = require('../app/validator');
const bcrypt = require('bcrypt');
const { createSession } = require('../app/session');
const LoginController = async (req, res) => {
  return validator(
    {
      schema: 'login',
      response: res,
      body: req.body,
    },
    async ({ email, password }) => {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return {
          error: 'User does not exist!',
        };
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return {
          error: 'Password is incorrect!',
        };
      }

      if (user.status === Status.BLOCKED) {
        return {
          error: 'Your account is blocked!',
        };
      }
      const token = await createSession(user.id, user.email);

      return {
        data: {
          user: {
            token,
            name: user.name,
            email: user.email,
            status: user.status,
          },
        },
        message: 'Login successful',
      };
    }
  );
};

module.exports = LoginController;
