const prisma = require('./prisma');
const JWTToken = require('./JWTToken');

const destroySession = async ({ token, userId }) => {
  const sessions = await prisma.session.deleteMany({
    where: { token, userId },
  });

  return Boolean(sessions);
};

const createSession = async (userId, userEmail) => {
  await destroySession({ userId });

  const newToken = JWTToken.create(userId, userEmail);
  await prisma.session.create({
    data: {
      userId,
      token: newToken,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastLogin: new Date().toISOString(),
    },
  });

  return newToken;
};

module.exports = {
  destroySession,
  createSession,
};
