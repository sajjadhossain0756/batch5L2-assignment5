import { Router } from "express";
import { ParcelControllers } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/validationRequest";
import { createParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";


const router = Router();

// get all parcel route
router.get('/',
    checkAuth(Role.ADMIN,Role.SENDER),
    ParcelControllers.getAllParcels);

// create parcel route
router.post('/create', 
    checkAuth(Role.ADMIN,Role.SENDER),
    validationRequest(createParcelZodSchema),
    ParcelControllers.createParcel);
 
// create parcel route
router.patch('/:id', 
    checkAuth(Role.ADMIN,Role.SENDER),
    validationRequest(updateParcelZodSchema),
    ParcelControllers.updateParcel);    


export const ParcelRoutes = router;