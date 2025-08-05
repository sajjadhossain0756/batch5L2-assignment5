import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleZodError } from "../helpers/handleZodError";
import { handleCastError } from "../helpers/handleCastError";


export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    // if (envVars.NODE_ENV === 'development') {
    //     console.log("error file",err.code);
    // }
    let statusCode = 500;
    let message = "Something went wrong!!";
    let errorSources: TErrorSources[] = [];

    // 1.duplicate error
    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    // 2.CastError 
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    // Zod error validation
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }
    // JavaScript Error validation 
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }


    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === 'development' ? err.stack : null,
        stack: envVars.NODE_ENV === 'development' ? err.stack : null
    })
    next();
}