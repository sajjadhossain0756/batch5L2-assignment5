import AppError from "../../errorHelpers/AppError";
import updateInnerObjectField from "../../utils/updateInnerObject";
import { Role } from "../user/user.interface";
import { parcelSearchableFields } from "./parcel.constant";
import { IParcel, ParcelStatus } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import httpStatus from "http-status-codes";


// create parcel start here;
const createParcel = async (payload: IParcel, loginUser: any) => {
    const existParcel = await Parcel.findOne({ trackingNumber: payload.trackingNumber });
    if (existParcel) {
        throw new AppError(401, "A Parcel with this trackingNumber already exists.");
    }
    payload.sender.email = loginUser.email;
    const parcel = await Parcel.create(payload);

    return parcel
}

// get all parcel start here;
const getAllParcels = async (loginUser: any, query: Record<string, string>) => {
    
    const filter = query;
    const searchTerm = query.searchTerm || "";

    delete filter["searchTerm"]
    const searchQuery = {
        $or: parcelSearchableFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
    }
    let parcel;
    let totalParcel
    console.log(filter,searchTerm,query);
    // console.log(loginUser)
    if (loginUser.role === Role.ADMIN) {
        parcel = await Parcel.find(searchQuery).find(filter);
        totalParcel = await Parcel.countDocuments(searchQuery).countDocuments(filter);
    } else if (loginUser.role === Role.SENDER) {
        parcel = await Parcel.find({ 'sender.email': loginUser.email });
        totalParcel = await Parcel.countDocuments({ 'sender.email': loginUser.email });
    } else {
        parcel = await Parcel.find({ 'receiver.email': loginUser.email });
        totalParcel = await Parcel.countDocuments({ 'receiver.email': loginUser.email });
    }

    return {
        meta: {
            total: totalParcel
        },
        data: parcel
    }
}

// update parcel start here;
const updateParcel = async (id: string, payload: IParcel, loginUser: any) => {

    const existParcel = await Parcel.findById(id);

    if (!existParcel) {
        throw new AppError(401, "A Parcel with this id not exists.");
    }
    if (payload?.sender?.email) {
        payload.sender.email = loginUser.email;
    }
    if (payload.status === ParcelStatus.DISPATCHED || payload.status === ParcelStatus.IN_TRANSITE || payload.status === ParcelStatus.DELIVERED) {
        if (loginUser.role === Role.SENDER) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }
    if (payload.status === ParcelStatus.CANCELLED) {
        if (loginUser.role === Role.SENDER) {
            if (existParcel.status === ParcelStatus.DISPATCHED) {
                throw new AppError(httpStatus.FORBIDDEN, "Cannot cancel parcel: It has already been dispatched.");
            }
        }
    }
    // Role === receiver,User only Update status field with value dilivered;
    if (loginUser.role === Role.RECEIVER) {

        const allowedUpdateFields = ['status'];

        const incomingKeys = Object.keys(payload);
        const unauthorizedUpdates = incomingKeys.filter(key => !allowedUpdateFields.includes(key));

        if (unauthorizedUpdates.length > 0) {
            throw new AppError(
                httpStatus.FORBIDDEN,
                `As a Receiver, you can only update the 'status' field. Unauthorized fields: ${unauthorizedUpdates.join(', ')}`
            );
        }

        if (payload.status !== undefined && payload.status !== ParcelStatus.DELIVERED) {
            throw new AppError(httpStatus.FORBIDDEN, "As a Receiver, you can only set the parcel status to 'DELIVERED'.");
        }
        const isRecipient = existParcel.receiver.email === loginUser.email
        if (!isRecipient) { throw new AppError(httpStatus.FORBIDDEN, "You are not the recipient of this parcel."); }
    }

    const updateDoc = updateInnerObjectField(payload);


    const updateParcel = await Parcel.findByIdAndUpdate(id, { $set: updateDoc }, { new: true, runValidators: true });

    return updateParcel;
}

// delete parcel start here;
const deleteParcel = async (id: string, loginUser: any) => {
    const existParcel = await Parcel.findById(id);
    if (!existParcel) {
        throw new AppError(401, "Parcel with this id not exists.");
    }
    if (loginUser.role === Role.SENDER || loginUser.role === Role.RECEIVER) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
    }
    await Parcel.findByIdAndDelete(id);
    return null;
}

export const ParcelServices = {
    createParcel,
    getAllParcels,
    updateParcel,
    deleteParcel
}