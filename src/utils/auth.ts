import config from '@config'
import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

const {
    HOST,
    PORT,
    USER,
    PASSWORD,
    DB,
} = config.database

const {
    BETTER_AUTH_URL
} = config.auth

export const auth = betterAuth({
    database: new Pool({
        host: HOST,
        port: Number(PORT),
        user: USER,
        password: PASSWORD,
        database: DB
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    trustedOrigins: [BETTER_AUTH_URL],
})