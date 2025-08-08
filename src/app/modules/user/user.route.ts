import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validationRequest } from "../../middlewares/validationRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";


const router = Router();

// create user route;
router.post("/register",
    validationRequest(createUserZodSchema),
    UserControllers.createUser);

// getAll Users route;  
router.get("/all-users", 
    checkAuth(Role.ADMIN), 
    UserControllers.getAllUsers);

// update User route
router.patch("/:id", 
    checkAuth(...Object.values(Role)), 
    validationRequest(updateUserZodSchema), 
    UserControllers.updateUser)

// delete User route
router.delete("/:id", 
    checkAuth(Role.ADMIN), 
    UserControllers.deleteUser)    


export const userRoutes = router;