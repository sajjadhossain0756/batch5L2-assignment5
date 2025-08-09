"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.DB_URL);
        console.log("connect to mongodb Database!!!");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is listening to http://localhost:${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
// handled sigterm error;
process.on("SIGTERM", () => {
    console.log("Sigterm error detected... Server is shutting down....");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
    setTimeout(() => {
        process.exit();
    }, 3000);
});
// handle unhandledRejection error;
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection error detected... Server is shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
    setTimeout(() => {
        process.exit();
    }, 3000);
});
// handled UncaughtException error;
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception error detected... server is shutting down...", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
    setTimeout(() => {
        process.exit(1);
    }, 3000);
});
