import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { ParcelServices } from "./parcel.service";


// create parcel start here;
const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginUserToken = req.user;
    const result = await ParcelServices.createParcel(payload, loginUserToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel created successfully",
        data: result
    })
})

// get all parcel start here;
const getAllParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const query = req.query;
    const result = await ParcelServices.getAllParcels(req.user, query as Record<string,string>);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Retrived all Parcel successfully",
        data: result
    })
})

// get one parcel start here;
const getOneParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelTrackingNumber = req.params.trackingNumber;
    const loginUserToken = req.user;

    const result = await ParcelServices.getOneParcel(parcelTrackingNumber, loginUserToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get one Parcel successfully",
        data: result
    })
})

// update parcel start here;
const updateParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.id;
    const loginUserToken = req.user;
    const payload = req.body

    const result = await ParcelServices.updateParcel(parcelId, payload, loginUserToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel updated successfully",
        data: result
    })
})

// update parcel start here;
const deleteParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.id;
    const loginUserToken = req.user;

    const result = await ParcelServices.deleteParcel(parcelId, loginUserToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Parcel deleted successfully",
        data: result
    })
})


export const ParcelControllers = {
    createParcel,
    getAllParcels,
    updateParcel,
    getOneParcel,
    deleteParcel
}