import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ParcelRoutes } from "../modules/parcel/parcel.route";


export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/parcel",
        route: ParcelRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})