import AppError from "../../errorHelpers/AppError";
import { IParcel } from "./parcel.interface";
import { Parcel } from "./parcel.model";


const createParcel = async (payload: IParcel) => {
    const existParcel = await Parcel.findOne({ trackingNumber: payload.trackingNumber });
    if (existParcel) {
        throw new AppError(401, "A Parcel with this trackingNumber already exists.");
    }

    const parcel = await Parcel.create(payload);

    return parcel
}

export const ParcelServices = {
    createParcel
}