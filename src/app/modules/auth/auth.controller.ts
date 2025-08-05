import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";
import { setAuthCookie } from "./setCookie";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    const { accessToken, refreshToken } = loginInfo;
    const tokenInfo = { accessToken, refreshToken }
    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `User loged in Successfully`,
        success: true,
        data: {
            accessToken: loginInfo.accessToken,
            refreshToken: loginInfo.refreshToken,
            user: loginInfo.user
        }
    })

    // if(tokenInfo.accessToken){
    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    // }
    // if(tokenInfo.refreshToken){
    // res.cookie("refreshToken", tokenInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    // }

})

// logout user start here;
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: `User Successfully logout`,
        success: true,
        data: null,
    })
})

export const AuthControllers = {
    credentialsLogin,
    logout
}