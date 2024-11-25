const { PrismaClient } = require('@prisma/client')
global.prisma = global.prisma || new PrismaClient()
module.exports = global.prisma