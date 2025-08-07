import z from "zod";
import { ParcelStatus, ParcelTypes } from "./parcel.interface";
import { Types } from "mongoose";


// create contactInfo Zod validation sub-schema;
export const CreateContactInfoZodSchema = z.object({
    name: z.string({
        message: 'Name must be a string',
    }).trim().min(1, 'Name cannot be empty'),
    phone: z.string({
        message: 'Phone must be a string',
    }).trim().min(1, 'Phone cannot be empty'),
    email: z.string({
        message: 'Email must be a string',
    }).trim().email('Invalid email address format.').optional(),
    address: z.string({
        message: 'Address must be a string',
    }).trim().min(1, 'Address cannot be empty'),
    city: z.string({
        message: 'City must be a string',
    }).trim().min(1, 'City cannot be empty'),
});

// create parcel Zod validation schema;
export const createParcelZodSchema = z.object({
    trackingNumber: z.string({
        message: 'Tracking number must be a string',
    }).trim().min(1, 'Tracking number cannot be empty').optional(),
    parcelType: z.enum(Object.values(ParcelTypes)),
    weight: z.number({
        message: 'Weight must be a number',
    }).min(0.01, 'Weight must be a positive number'),
    description: z.string({
        message: 'Description must be a string',
    }).trim().optional(),
    sender: CreateContactInfoZodSchema,
    receiver: CreateContactInfoZodSchema,
    pickDate: z.string({
        message: 'Pickup date must be a valid date string',
    }).datetime('Invalid date format for pickup date.').optional(),
    deliveryDate: z.string({
        message: 'Delivery date must be a valid date string',
    }).datetime('Invalid date format for delivery date.').optional(),
    totalCost: z.number({
    message: 'Total cost must be a number',
  }).min(0, 'Total cost cannot be negative').optional(),
    status: z.enum(Object.values(ParcelStatus)).optional(),
    senderUser: z.string({
        message: 'Sender user ID must be a string',
    }).refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid Sender User ID format',
    }),
})

// update contactInfo Zod validation sub-schema;
export const UpdateContactInfoZodSchema = z.object({
    name: z.string({
        message: 'Name must be a string',
    }).trim().min(1, 'Name cannot be empty').optional(),
    phone: z.string({
        message: 'Phone must be a string',
    }).trim().min(1, 'Phone cannot be empty').optional(),
    email: z.string({
        message: 'Email must be a string',
    }).trim().email('Invalid email address format.').optional(),
    address: z.string({
        message: 'Address must be a string',
    }).trim().min(1, 'Address cannot be empty').optional(),
    city: z.string({
        message: 'City must be a string',
    }).trim().min(1, 'City cannot be empty').optional(),
});

// update parcel Zod validation schema;
export const updateParcelZodSchema = z.object({
    trackingNumber: z.string({
        message: 'Tracking number must be a string',
    }).trim().min(1, 'Tracking number cannot be empty').optional(),
    parcelType: z.enum(Object.values(ParcelTypes)).optional(),
    weight: z.number({
        message: 'Weight must be a number',
    }).min(0.01, 'Weight must be a positive number').optional(),
    description: z.string({
        message: 'Description must be a string',
    }).trim().optional(),
    sender: UpdateContactInfoZodSchema.optional(),
    receiver: UpdateContactInfoZodSchema.optional(),
    pickDate: z.string({
        message: 'Pickup date must be a valid date string',
    }).datetime('Invalid date format for pickup date.').optional(),
    deliveryDate: z.string({
        message: 'Delivery date must be a valid date string',
    }).datetime('Invalid date format for delivery date.').optional(),
    totalCost: z.number({
    message: 'Total cost must be a number',
  }).min(0, 'Total cost cannot be negative').optional(),
    status: z.enum(Object.values(ParcelStatus)).optional(),
    senderUser: z.string({
        message: 'Sender user ID must be a string',
    }).refine(val => Types.ObjectId.isValid(val), {
        message: 'Invalid Sender User ID format',
    }).optional(),
})