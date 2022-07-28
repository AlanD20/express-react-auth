const prisma = require('../app/prisma');
const { validator } = require('../app/validator');
const { Status } = require('@prisma/client');
const { destroySession } = require('../app/session');

const UserController = {
  Logout: async (req, res) => {
    await destroySession(req.token);

    return res.status(200).json({
      message: 'Logout successful',
      status: 'succses',
      code: 200,
    });
  },
  All: async (req, res) => {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
    });

    return res.status(200).json({
      data: { users },
      message: 'Users retrieved.',
      status: 'success',
      code: 200,
    });
  },
  Block: async (req, res) => {
    validator(
      {
        schema: 'id',
        response: res,
        body: req.body,
      },
      async ({ id: userIds }) => {
        await prisma.user.updateMany({
          where: {
            id: {
              in: userIds,
            },
          },
          data: {
            status: Status.BLOCKED,
          },
        });

        return {
          data: {
            users: {
              status: Status.BLOCKED,
            },
          },
          message: 'Blocked Successfully',
        };
      }
    );
  },
  Unblock: async (req, res) => {
    validator(
      {
        schema: 'id',
        response: res,
        body: req.body,
      },
      async ({ id: userIds }) => {
        await prisma.user.updateMany({
          where: {
            id: {
              in: userIds,
            },
          },
          data: {
            status: Status.ACTIVE,
          },
        });

        return {
          data: {
            users: {
              status: Status.ACTIVE,
            },
          },
          message: 'Unblocked Successfully',
        };
      }
    );
  },
  Destroy: async (req, res) => {
    validator(
      {
        schema: 'id',
        response: res,
        body: req.body,
      },
      async ({ id: userIds }) => {
        await prisma.user.deleteMany({
          where: {
            id: {
              in: userIds,
            },
          },
        });

        return {
          message: 'Deleted Successfully',
        };
      }
    );
  },
};

module.exports = UserController;
