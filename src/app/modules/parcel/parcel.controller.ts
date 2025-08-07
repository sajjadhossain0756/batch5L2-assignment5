import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { ParcelServices } from "./parcel.service";


// create parcel start here;
const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ParcelServices.createParcel(req.body, req.user);
    console.log(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel created successfully",
        data: result
    })
})

// get all parcel start here;
const getAllParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await ParcelServices.getAllParcels(req.user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrived all Parcel successfully",
        data: result
    })
})


export const ParcelControllers = {
    createParcel,
    getAllParcels
}