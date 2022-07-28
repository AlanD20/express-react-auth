const prisma = require('../app/prisma');
const { Status } = require('@prisma/client');
const { validator } = require('../app/validator');
const JWTToken = require('../app/JWTToken');

const SessionController = async (req, res) => {
  return validator(
    {
      schema: 'session',
      response: res,
      body: req.body,
    },
    async ({ token }) => {
      if (!token) {
        return {
          error: 'No token is provided.',
        };
      }

      const session = await prisma.session.findFirst({
        where: { token },
        include: { user: true },
      });

      if (!session) {
        return {
          error: 'Invalid session',
        };
      }

      const check = JWTToken.verify(token);

      if (!check) {
        return {
          error: 'Token is invalid',
        };
      }

      if (session.user.status === Status.BLOCKED) {
        return {
          error: 'Your account is blocked!',
        };
      }

      return {
        data: {
          user: {
            token,
            name: session.user.name,
            email: session.user.email,
          },
        },
        message: 'Token is valid',
      };
    }
  );
};

module.exports = SessionController;
