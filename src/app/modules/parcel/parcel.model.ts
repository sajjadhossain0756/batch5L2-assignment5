import { model, Schema } from "mongoose";
import { IContactInfo, IParcel, ParcelStatus, ParcelTypes, PaymentStatus } from "./parcel.interface";


const contactInfoSchema = new Schema<IContactInfo>({
    name: { type: String, trim: true},
    phone: { type: Number,trim: true },
    email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
    address: { type: String, trim: true },
    city: { type: String, trim: true}
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
    sender: { type: contactInfoSchema},
    receiver: { type: contactInfoSchema },
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
    totalCost: { type: Number, min: [0, "Cost can not be negative"] },
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
    this.totalCost = this.weight * 10;
    next();
});

parcelSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() as Record<string, any>;
    
    if (update.$set && update.$set.weight !== undefined) {
        const newWeight = update.$set.weight as number;
        update.$set.totalCost = newWeight * 10; 
    } else if (update.weight !== undefined) { 
        const newWeight = update.weight as number;
        update.totalCost = newWeight * 10;
    }
    next();
})

export const Parcel = model<IParcel>('Parcel', parcelSchema);