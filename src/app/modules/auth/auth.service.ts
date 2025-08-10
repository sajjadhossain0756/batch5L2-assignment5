import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserToken } from "../../utils/userToken";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";


// manually email and password login it replaced by passport-local login
const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const userTokens = createUserToken(isUserExist);

    const { password: userPassword, ...rest } = isUserExist.toObject()
    
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}

// reset password fanctionality start here;
const resetPassword = async (oldPassword: string,newPassword: string,decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }
    // new password validation start here;
    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/;

    if(!passwordValidationRegex.test(newPassword)){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
    }

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword,user!.password as string)
    if(!isOldPasswordMatch){
        throw new AppError(httpStatus.UNAUTHORIZED,"old password does not match");
    } 

    const isNewPasswordSameAsOld = await bcryptjs.compare(newPassword, user!.password as string);
    if (isNewPasswordSameAsOld) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password cannot be the same as the old password.");
    }


    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save()
}

export const AuthServices = {
    credentialsLogin,
    resetPassword
}