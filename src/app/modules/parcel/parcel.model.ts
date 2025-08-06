import { model, Schema } from "mongoose";
import { IContactInfo, IParcel, ParcelStatus, ParcelTypes, PaymentStatus } from "./parcel.interface";


const contactInfoSchema = new Schema<IContactInfo>({
    name: { type: String, trim: true, required: true },
    phone: { type: Number, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
    address: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true }
}, {
    _id: false,
    versionKey: false
})

const parcelSchema = new Schema<IParcel>({
    trackingNumber: {
        type: String,
        unique: true
    },
    parcelType: {
        type: String,
        enum: Object.values(ParcelTypes),
        required: true
    },
    weight: {
        type: Number,
        required: true,
        min: [0.01, "weight must be positive number"]
    },
    description: { type: String, trim: true },
    sender: { type: contactInfoSchema, required: true },
    receiver: { type: contactInfoSchema, required: true },
    pickDate: { type: Date },
    deliveryDate: { type: Date },
    status: {
        type: String,
        enum: Object.values(ParcelStatus),
        default: ParcelStatus.REQUESTED,
        required: true
    },
    senderUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalCost: { type: Number, required: true, min: [0, "Cost can not be negative"] },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
        required: true
    },
    paymentMethod: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

parcelSchema.pre("save", async function (next) {
    if (this.isNew && !this.trackingNumber) {
        this.trackingNumber = `TRK-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    }
    next();
});

export const Parcel = model<IParcel>('Parcel', parcelSchema);