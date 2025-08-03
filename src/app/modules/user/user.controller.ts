import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserServices.createUser(req.body);

        res.status(200).json({
            message: "user created successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

export const UserControllers = {
    createUser
}