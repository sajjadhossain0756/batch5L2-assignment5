import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema } from "./user.validation";


const router = Router();

router.post("/register",
    validationRequest(createUserZodSchema),
    UserControllers.createUser);


export const userRoutes = router;