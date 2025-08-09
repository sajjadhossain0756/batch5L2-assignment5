"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRoutes = void 0;
const express_1 = require("express");
const parcel_controller_1 = require("./parcel.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validationRequest_1 = require("../../middlewares/validationRequest");
const parcel_validation_1 = require("./parcel.validation");
const router = (0, express_1.Router)();
// get all parcel route
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER, user_interface_1.Role.RECEIVER), parcel_controller_1.ParcelControllers.getAllParcels);
// create parcel route
router.post('/create', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), (0, validationRequest_1.validationRequest)(parcel_validation_1.createParcelZodSchema), parcel_controller_1.ParcelControllers.createParcel);
// create parcel route
router.patch('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER, user_interface_1.Role.RECEIVER), (0, validationRequest_1.validationRequest)(parcel_validation_1.updateParcelZodSchema), parcel_controller_1.ParcelControllers.updateParcel);
// delete parcel route
router.delete('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.deleteParcel);
exports.ParcelRoutes = router;
