import { Types } from "mongoose";

export enum ParcelStatus {
    REQUESTED = "REQUESTED",
    PICKED = "PICKED",
    IN_TRANSITE = "IN_TRANSITE",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export enum ParcelTypes {
    DOCUMENT = "DOCUMENT",
    SMALL_PACKAGE = "SMALL_PACKAGE",
    MEDIUM_PACKAGE = "MEDIUM_PACKAGE",
    LARGE_PACKAGE = "LARGE_PACKAGE"
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}

export interface IContactInfo {
    name: string,
    phone: number,
    email?: string,
    address: string,
    city: string,
}

// pacel interface start here;
export interface IParcel {
    trackingNumber : string,
    parcelType: ParcelTypes,
    weight : number,
    description?: string,
    sender: IContactInfo,
    receiver: IContactInfo,
    pickDate: Date,
    deliveryDate: Date,
    status: ParcelStatus,
    senderUser: Types.ObjectId,
    totalCost: number,
    paymentStatus: PaymentStatus,
    paymentMethod?: string,
}

