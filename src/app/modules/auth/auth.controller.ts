import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.service";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    // passport.authenticate("local", async (err: any, user: any, info: any) => {

    //     if (err) {
    //         // ** we can not use it;
    //         // throw new AppError(401,"error is occured")
    //         // next(err)
    //         // return new AppError(401, err)

    //         // ** we can use it
    //         return next(new AppError(401, err))
    //         // return next(err)
    //     }
    //     if (!user) {
    //         return next(new AppError(401, info.message))
    //     }

    //     // const userTokens = await createUserToken(user);

    //     // delete user.toObject().password

    //     const { password: pass, ...rest } = user.toObject()

    //     // set cookie in browser function;
    //     // setAuthCookie(res, userTokens);

    //     sendResponse(res, {
    //         statusCode: httpStatus.OK,
    //         message: `User loged in Successfully`,
    //         success: true,
    //         data: {
    //             accessToken: userTokens.accessToken,
    //             refreshToken: userTokens.refreshToken,
    //             user: rest
    //         }
    //     })
    // })(req, res, next)

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

export const AuthControllers = {
    credentialsLogin
}