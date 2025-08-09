"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const updateInnerObject_1 = __importDefault(require("../../utils/updateInnerObject"));
const user_interface_1 = require("../user/user.interface");
const parcel_interface_1 = require("./parcel.interface");
const parcel_model_1 = require("./parcel.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// create parcel start here;
const createParcel = (payload, loginUser) => __awaiter(void 0, void 0, void 0, function* () {
    const existParcel = yield parcel_model_1.Parcel.findOne({ trackingNumber: payload.trackingNumber });
    if (existParcel) {
        throw new AppError_1.default(401, "A Parcel with this trackingNumber already exists.");
    }
    payload.sender.email = loginUser.email;
    const parcel = yield parcel_model_1.Parcel.create(payload);
    return parcel;
});
// get all parcel start here;
const getAllParcels = (loginUser) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter = query;
    let parcel;
    let totalParcel;
    console.log(loginUser);
    if (loginUser.role === user_interface_1.Role.ADMIN) {
        parcel = yield parcel_model_1.Parcel.find({});
        totalParcel = yield parcel_model_1.Parcel.countDocuments();
    }
    else if (loginUser.role === user_interface_1.Role.SENDER) {
        parcel = yield parcel_model_1.Parcel.find({ 'sender.email': loginUser.email });
        totalParcel = yield parcel_model_1.Parcel.countDocuments({ 'sender.email': loginUser.email });
    }
    else {
        parcel = yield parcel_model_1.Parcel.find({ 'receiver.email': loginUser.email });
        totalParcel = yield parcel_model_1.Parcel.countDocuments({ 'receiver.email': loginUser.email });
    }
    return {
        meta: {
            total: totalParcel
        },
        data: parcel
    };
});
// update parcel start here;
const updateParcel = (id, payload, loginUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existParcel = yield parcel_model_1.Parcel.findById(id);
    if (!existParcel) {
        throw new AppError_1.default(401, "A Parcel with this id not exists.");
    }
    if ((_a = payload === null || payload === void 0 ? void 0 : payload.sender) === null || _a === void 0 ? void 0 : _a.email) {
        payload.sender.email = loginUser.email;
    }
    if (payload.status === parcel_interface_1.ParcelStatus.DISPATCHED || payload.status === parcel_interface_1.ParcelStatus.IN_TRANSITE || payload.status === parcel_interface_1.ParcelStatus.DELIVERED) {
        if (loginUser.role === user_interface_1.Role.SENDER) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.status === parcel_interface_1.ParcelStatus.CANCELLED) {
        if (loginUser.role === user_interface_1.Role.SENDER) {
            if (existParcel.status === parcel_interface_1.ParcelStatus.DISPATCHED) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Cannot cancel parcel: It has already been dispatched.");
            }
        }
    }
    // Role === receiver,User only Update status field with value dilivered;
    if (loginUser.role === user_interface_1.Role.RECEIVER) {
        const allowedUpdateFields = ['status'];
        const incomingKeys = Object.keys(payload);
        const unauthorizedUpdates = incomingKeys.filter(key => !allowedUpdateFields.includes(key));
        if (unauthorizedUpdates.length > 0) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `As a Receiver, you can only update the 'status' field. Unauthorized fields: ${unauthorizedUpdates.join(', ')}`);
        }
        if (payload.status !== undefined && payload.status !== parcel_interface_1.ParcelStatus.DELIVERED) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "As a Receiver, you can only set the parcel status to 'DELIVERED'.");
        }
        const isRecipient = existParcel.receiver.email === loginUser.email;
        if (!isRecipient) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not the recipient of this parcel.");
        }
    }
    const updateDoc = (0, updateInnerObject_1.default)(payload);
    const updateParcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, { $set: updateDoc }, { new: true, runValidators: true });
    return updateParcel;
});
// delete parcel start here;
const deleteParcel = (id, loginUser) => __awaiter(void 0, void 0, void 0, function* () {
    const existParcel = yield parcel_model_1.Parcel.findById(id);
    if (!existParcel) {
        throw new AppError_1.default(401, "Parcel with this id not exists.");
    }
    if (loginUser.role === user_interface_1.Role.SENDER || loginUser.role === user_interface_1.Role.RECEIVER) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    yield parcel_model_1.Parcel.findByIdAndDelete(id);
    return null;
});
exports.ParcelServices = {
    createParcel,
    getAllParcels,
    updateParcel,
    deleteParcel
};
