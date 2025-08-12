import { Router } from "express";
import { ParcelControllers } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/validationRequest";
import { createParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";


const router = Router();

// get all parcel route
router.get('/',
    checkAuth(Role.ADMIN,Role.SENDER,Role.RECEIVER),
    ParcelControllers.getAllParcels);

// create parcel route
router.post('/create', 
    checkAuth(Role.ADMIN,Role.SENDER),
    validationRequest(createParcelZodSchema),
    ParcelControllers.createParcel);

// get one parcel by trackingNumber;
router.get('/:trackingNumber', 
    checkAuth(Role.ADMIN,Role.SENDER,Role.RECEIVER),
    ParcelControllers.getOneParcel);    
 
// update parcel route
router.patch('/:id', 
    checkAuth(Role.ADMIN,Role.SENDER,Role.RECEIVER),
    validationRequest(updateParcelZodSchema),
    ParcelControllers.updateParcel);

// delete parcel route
router.delete('/:id', 
    checkAuth(Role.ADMIN),
    ParcelControllers.deleteParcel);    


export const ParcelRoutes = router;