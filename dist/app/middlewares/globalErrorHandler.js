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
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicateError_1 = require("../helpers/handleDuplicateError");
const handleZodError_1 = require("../helpers/handleZodError");
const handleCastError_1 = require("../helpers/handleCastError");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const handleValidationError_1 = require("../helpers/handleValidationError");
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (envVars.NODE_ENV === 'development') {
    //     console.log("error file",err.code);
    // }
    let statusCode = 500;
    let message = "Something went wrong!!";
    let errorSources = [];
    // 1.duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // 2.CastError 
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // 3.validation error
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Zod error validation
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Manual and default AppError validation
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // JavaScript Error validation 
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === 'development' ? err.stack : null,
        stack: env_1.envVars.NODE_ENV === 'development' ? err.stack : null
    });
    next();
});
exports.globalErrorHandler = globalErrorHandler;
