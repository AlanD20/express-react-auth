const { PrismaClient } = require('@prisma/client');

global.prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query'],
    errorFormat: 'minimal',
  });

module.exports = global.prisma;
