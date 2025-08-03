import { Server } from "http";
import mongoose from "mongoose"
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("connect to mongodb Database!!!");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to http://localhost:${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();