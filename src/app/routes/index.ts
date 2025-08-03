import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import app from "../../app";


export const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    }
]

moduleRoutes.forEach((route)=>{
    app.use(route.path,route.route)
})