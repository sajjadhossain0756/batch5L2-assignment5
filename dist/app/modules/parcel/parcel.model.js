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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
const contactInfoSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    phone: { type: Number, trim: true },
    email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
    address: { type: String, trim: true },
    city: { type: String, trim: true }
}, {
    _id: false,
    versionKey: false
});
const parcelSchema = new mongoose_1.Schema({
    trackingNumber: {
        type: String,
        unique: true
    },
    parcelType: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelTypes),
        required: true
    },
    weight: {
        type: Number,
        required: true,
        min: [0.01, "weight must be positive number"]
    },
    description: { type: String, trim: true },
    sender: { type: contactInfoSchema },
    receiver: { type: contactInfoSchema },
    pickDate: { type: Date },
    deliveryDate: { type: Date },
    status: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelStatus),
        default: parcel_interface_1.ParcelStatus.REQUESTED,
        required: true
    },
    senderUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalCost: { type: Number, min: [0, "Cost can not be negative"] },
    paymentStatus: {
        type: String,
        enum: Object.values(parcel_interface_1.PaymentStatus),
        default: parcel_interface_1.PaymentStatus.PENDING,
        required: true
    },
    paymentMethod: { type: String }
}, {
    timestamps: true,
    versionKey: false
});
parcelSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew && !this.trackingNumber) {
            this.trackingNumber = `TRK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        }
        this.totalCost = this.weight * 10;
        next();
    });
});
parcelSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.$set && update.$set.weight !== undefined) {
            const newWeight = update.$set.weight;
            update.$set.totalCost = newWeight * 10;
        }
        else if (update.weight !== undefined) {
            const newWeight = update.weight;
            update.totalCost = newWeight * 10;
        }
        next();
    });
});
exports.Parcel = (0, mongoose_1.model)('Parcel', parcelSchema);
