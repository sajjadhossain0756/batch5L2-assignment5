import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IAuthProvider, IUser, Role } from "./user.interface"
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";


// create user start here
const createUser = async (payload: Partial<IUser>) => {

        const { email, password, ...rest } = payload;

        const isUserExist = await User.findOne({ email });
        // if (isUserExist) {
        //     throw new Error("User already exist")
        // }

        const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }
        const user = await User.create({
            email,
            password: hashedPassword,
            auths: [authProvider],
            ...rest
        })

        return user;
}

// get all user start here;
const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments()

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
}

// update user start here;
const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const isUserExist = await User.findById(userId);

    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND,"User not Found")
    }

    if (payload.role) {
        if (decodedToken.role === Role.SENDER || decodedToken.role === Role.RECEIVER) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.SENDER || decodedToken.role === Role.RECEIVER) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true , runValidators: true})

    return newUpdatedUser
}

export const UserServices = {
    createUser,
    getAllUsers,
    updateUser
}