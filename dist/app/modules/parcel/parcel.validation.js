"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelZodSchema = exports.UpdateContactInfoZodSchema = exports.createParcelZodSchema = exports.CreateContactInfoZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const parcel_interface_1 = require("./parcel.interface");
const mongoose_1 = require("mongoose");
// create contactInfo Zod validation sub-schema;
exports.CreateContactInfoZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        message: 'Name must be a string',
    }).trim().min(1, 'Name cannot be empty'),
    phone: zod_1.default.string({
        message: 'Phone must be a string',
    }).trim().min(1, 'Phone cannot be empty'),
    email: zod_1.default.string({
        message: 'Email must be a string',
    }).trim().email('Invalid email address format.').optional(),
    address: zod_1.default.string({
        message: 'Address must be a string',
    }).trim().min(1, 'Address cannot be empty'),
    city: zod_1.default.string({
        message: 'City must be a string',
    }).trim().min(1, 'City cannot be empty'),
});
// create parcel Zod validation schema;
exports.createParcelZodSchema = zod_1.default.object({
    trackingNumber: zod_1.default.string({
        message: 'Tracking number must be a string',
    }).trim().min(1, 'Tracking number cannot be empty').optional(),
    parcelType: zod_1.default.enum(Object.values(parcel_interface_1.ParcelTypes)),
    weight: zod_1.default.number({
        message: 'Weight must be a number',
    }).min(0.01, 'Weight must be a positive number'),
    description: zod_1.default.string({
        message: 'Description must be a string',
    }).trim().optional(),
    sender: exports.CreateContactInfoZodSchema,
    receiver: exports.CreateContactInfoZodSchema,
    pickDate: zod_1.default.string({
        message: 'Pickup date must be a valid date string',
    }).datetime('Invalid date format for pickup date.').optional(),
    deliveryDate: zod_1.default.string({
        message: 'Delivery date must be a valid date string',
    }).datetime('Invalid date format for delivery date.').optional(),
    totalCost: zod_1.default.number({
        message: 'Total cost must be a number',
    }).min(0, 'Total cost cannot be negative').optional(),
    status: zod_1.default.enum(Object.values(parcel_interface_1.ParcelStatus)).optional(),
    senderUser: zod_1.default.string({
        message: 'Sender user ID must be a string',
    }).refine(val => mongoose_1.Types.ObjectId.isValid(val), {
        message: 'Invalid Sender User ID format',
    }),
});
// update contactInfo Zod validation sub-schema;
exports.UpdateContactInfoZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        message: 'Name must be a string',
    }).trim().min(1, 'Name cannot be empty').optional(),
    phone: zod_1.default.string({
        message: 'Phone must be a string',
    }).trim().min(1, 'Phone cannot be empty').optional(),
    email: zod_1.default.string({
        message: 'Email must be a string',
    }).trim().email('Invalid email address format.').optional(),
    address: zod_1.default.string({
        message: 'Address must be a string',
    }).trim().min(1, 'Address cannot be empty').optional(),
    city: zod_1.default.string({
        message: 'City must be a string',
    }).trim().min(1, 'City cannot be empty').optional(),
});
// update parcel Zod validation schema;
exports.updateParcelZodSchema = zod_1.default.object({
    trackingNumber: zod_1.default.string({
        message: 'Tracking number must be a string',
    }).trim().min(1, 'Tracking number cannot be empty').optional(),
    parcelType: zod_1.default.enum(Object.values(parcel_interface_1.ParcelTypes)).optional(),
    weight: zod_1.default.number({
        message: 'Weight must be a number',
    }).min(0.01, 'Weight must be a positive number').optional(),
    description: zod_1.default.string({
        message: 'Description must be a string',
    }).trim().optional(),
    sender: exports.UpdateContactInfoZodSchema.optional(),
    receiver: exports.UpdateContactInfoZodSchema.optional(),
    pickDate: zod_1.default.string({
        message: 'Pickup date must be a valid date string',
    }).datetime('Invalid date format for pickup date.').optional(),
    deliveryDate: zod_1.default.string({
        message: 'Delivery date must be a valid date string',
    }).datetime('Invalid date format for delivery date.').optional(),
    totalCost: zod_1.default.number({
        message: 'Total cost must be a number',
    }).min(0, 'Total cost cannot be negative').optional(),
    status: zod_1.default.enum(Object.values(parcel_interface_1.ParcelStatus)).optional(),
    senderUser: zod_1.default.string({
        message: 'Sender user ID must be a string',
    }).refine(val => mongoose_1.Types.ObjectId.isValid(val), {
        message: 'Invalid Sender User ID format',
    }).optional(),
});
