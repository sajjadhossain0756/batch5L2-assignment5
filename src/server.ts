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

// handled sigterm error;
process.on("SIGTERM", () => {
    console.log("Sigterm error detected... Server is shutting down....");

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    } else {
        process.exit(1);
    }

    setTimeout(() => {
        process.exit();
    }, 3000);
})
// handle unhandledRejection error;
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection error detected... Server is shutting down...", error);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    } else {
        process.exit(1);
    }

    setTimeout(() => {
        process.exit();
    }, 3000);
})
// handled UncaughtException error;
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception error detected... server is shutting down...", error);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
    setTimeout(() => {
        process.exit(1);
    }, 3000);
})