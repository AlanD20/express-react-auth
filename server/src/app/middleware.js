const prisma = require('./prisma');
const { Status } = require('@prisma/client');

const RejectResponse = (response) => {
  response.status(401).json({
    message: `You are not authorized!`,
    status: 'failed',
    code: 401,
  });
};

const isAuth = async (request, response, next) => {
  const authorization = request.headers['authorization'];

  if (!authorization) {
    return RejectResponse(response);
  }

  const bearer = authorization.split(' ')[1];

  const session = await prisma.session.findFirst({
    where: {
      token: bearer,
    },
    include: {
      user: true,
    },
  });

  if (!session || session.user.status === Status.BLOCKED) {
    return RejectResponse(response);
  }

  request.token = bearer;
  next();
};

module.exports = {
  isAuth,
};
