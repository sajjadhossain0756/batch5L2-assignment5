import dotenv from "dotenv";

dotenv.config();

interface envConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CALLBACK_URL: string,
    EXPRESS_SESSION_SECRET: string,
    FRONTEND_URL: string
}

const loadEnvVariables = (): envConfig => {
    const requireEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV","BCRYPT_SALT_ROUND","JWT_ACCESS_SECRET","JWT_ACCESS_EXPIRES","JWT_REFRESH_SECRET","JWT_REFRESH_EXPIRES","GOOGLE_CLIENT_SECRET","GOOGLE_CLIENT_ID","GOOGLE_CALLBACK_URL","EXPRESS_SESSION_SECRET","FRONTEND_URL"];

    requireEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variables ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string
    }

}

export const envVars = loadEnvVariables();
