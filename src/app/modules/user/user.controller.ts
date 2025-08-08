import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";

// create user function;
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "user created successfully",
        data: user
    })
})

// getAllUsers function
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `All User Retrived Successfully`,
        success: true,
        data: result.data,
        meta: result.meta
    })
})

// updateUser function
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body

    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `User updated Successfully`,
        success: true,
        data: user
    })
})

// deleteUser function
const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user;

    const user = await UserServices.deleteUser(userId, verifiedToken as JwtPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `User deleted Successfully`,
        success: true,
        data: user
    })
})


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}