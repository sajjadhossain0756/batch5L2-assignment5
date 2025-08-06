import { Router } from "express";
import { ParcelControllers } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/validationRequest";
import { createParcelZodSchema } from "./parcel.validation";


const router = Router();

router.post('/create', 
    checkAuth(Role.ADMIN,Role.SENDER),
    validationRequest(createParcelZodSchema),
    ParcelControllers.createParcel);


export const ParcelRoutes = router;