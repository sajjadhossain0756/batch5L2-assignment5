"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
// create user zod schema;
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        message: "Name Must be a String and required"
    })
        .min(2, { message: "Name too short. Minimum  character should be 2." })
        .max(50, { message: "Name too long. Maximum character can be 50." }),
    email: zod_1.default
        .string({
        message: "Email Must be a String and required"
    })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: zod_1.default
        .string({
        message: "Password Must be a String and required"
    })
        .min(8, { message: "Password must be at least 8 character long" })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase character.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    phone: zod_1.default
        .string({ message: "Phone Number Must be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for bangladesh.Format +8801(012345678),"
    }).optional(),
    address: zod_1.default
        .string({ message: "address Must be String" })
        .max(200, { message: "address can not exceed 200 characters." })
        .optional()
});
// update user zod schema;
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        message: "Name Must be a String",
    })
        .min(2, { message: "Name too short. Minimum  character should be 2." })
        .max(50, { message: "Name too long. Maximum character can be 50." }).optional(),
    password: zod_1.default
        .string({
        message: "Password Must be a String"
    })
        .min(8, { message: "Password must be at least 8 character long" })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase character.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }).optional(),
    phone: zod_1.default
        .string({ message: "Phone Number Must be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for bangladesh.Format +8801(012345678),"
    }).optional(),
    role: zod_1.default
        .enum(Object.values(user_interface_1.Role))
        .optional(),
    isActive: zod_1.default
        .enum(Object.values(user_interface_1.IsActive))
        .optional(),
    isDeleted: zod_1.default
        .boolean({ message: "isDeleted Must be boolean" })
        .optional(),
    isVerified: zod_1.default
        .boolean({ message: "isVerified Must be boolean" })
        .optional(),
    address: zod_1.default
        .string({ message: "address Must be String" })
        .max(200, { message: "address can not exceed 200 characters." })
        .optional(),
});
