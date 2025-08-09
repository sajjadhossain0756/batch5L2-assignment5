"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validationRequest_1 = require("../../middlewares/validationRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
// create user route;
router.post("/register", (0, validationRequest_1.validationRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserControllers.createUser);
// getAll Users route;  
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.getAllUsers);
// update User route
router.patch("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validationRequest_1.validationRequest)(user_validation_1.updateUserZodSchema), user_controller_1.UserControllers.updateUser);
// delete User route
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserControllers.deleteUser);
exports.userRoutes = router;
