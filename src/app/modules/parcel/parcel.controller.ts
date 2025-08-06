import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { ParcelServices } from "./parcel.service";


const createParcel = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const result = await ParcelServices.createParcel(req.body);
     sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel created successfully",
        data: result
     })
})


export const ParcelControllers = {
    createParcel
}