import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";


const router = Router();

router.post("/register",
    validationRequest(createUserZodSchema),
    UserControllers.createUser);
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);


export const userRoutes = router;