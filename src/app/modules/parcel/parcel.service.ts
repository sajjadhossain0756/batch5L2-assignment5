import AppError from "../../errorHelpers/AppError";
import { IParcel } from "./parcel.interface";
import { Parcel } from "./parcel.model";


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
const getAllParcels = async (loginUser: any) => {
    // const filter = query;
    let parcel;
    let totalParcel

    console.log(loginUser)
    if (loginUser.role === 'ADMIN') {
        parcel = await Parcel.find({});
        totalParcel = await Parcel.countDocuments();
    } else {
        parcel = await Parcel.find({ 'sender.email': loginUser.email });
        totalParcel = await Parcel.countDocuments({ 'sender.email': loginUser.email });
    }

    return {
        meta: {
            total: totalParcel
        },
        data: parcel
    }
}

// create parcel start here;
const updateParcel = async (id: string, payload: IParcel, loginUser: any) => {

    const existParcel = await Parcel.findById(id);

    if (!existParcel) {
        throw new AppError(401, "A Parcel with this id not exists.");
    }
    if(payload?.sender?.email){
        payload.sender.email = loginUser.email;
    }

    const updateParcel = await Parcel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    return updateParcel;
}

export const ParcelServices = {
    createParcel,
    getAllParcels,
    updateParcel
}