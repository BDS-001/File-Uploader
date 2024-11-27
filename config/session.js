const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const passport = require('./passport')
const session = require('express-session');
const prisma = require('../prisma/prismaClient')

function setupSession(app) {
    const secret = process.env.SESSION_SECRET
    if (!secret) {
        throw new Error('SESSION_SECRET environment variable is required');
    }

    app.use(session({ 
        secret: secret, 
        resave: false, 
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 10 * 60 * 1000,
                dbRecordIdIsSessionId: true
            }
    ),
    }));
    app.use(passport.session());
}

module.exports = setupSession