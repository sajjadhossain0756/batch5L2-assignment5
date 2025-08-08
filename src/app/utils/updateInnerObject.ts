import { IParcel } from "../modules/parcel/parcel.interface";


// this function can give access update a single field in Nested Object field;
const updateInnerObjectField = (payload:IParcel) =>{
     const updateDoc: Record<string, any> = {}; 

    // Handle top-level fields directly
    if (payload.trackingNumber !== undefined) updateDoc.trackingNumber = payload.trackingNumber;
    if (payload.parcelType !== undefined) updateDoc.parcelType = payload.parcelType;
    if (payload.weight !== undefined) updateDoc.weight = payload.weight;
    if (payload.description !== undefined) updateDoc.description = payload.description;
    if (payload.pickDate !== undefined) updateDoc.pickDate = payload.pickDate;
    if (payload.deliveryDate !== undefined) updateDoc.deliveryDate = payload.deliveryDate;
    if (payload.status !== undefined) updateDoc.status = payload.status;
    if (payload.senderUser !== undefined) updateDoc.senderUser = payload.senderUser;
    if (payload.totalCost !== undefined) updateDoc.totalCost = payload.totalCost;
    if (payload.paymentStatus !== undefined) updateDoc.paymentStatus = payload.paymentStatus;
    if (payload.paymentMethod !== undefined) updateDoc.paymentMethod = payload.paymentMethod;

    // Handle nested 'sender' fields using dot notation
    if (payload.sender !== undefined) {
        if (payload.sender.name !== undefined) updateDoc['sender.name'] = payload.sender.name;
        if (payload.sender.phone !== undefined) updateDoc['sender.phone'] = payload.sender.phone;
        if (payload.sender.email !== undefined) updateDoc['sender.email'] = payload.sender.email;
        if (payload.sender.address !== undefined) updateDoc['sender.address'] = payload.sender.address;
        if (payload.sender.city !== undefined) updateDoc['sender.city'] = payload.sender.city;
    }

    // Handle nested 'receiver' fields using dot notation
    if (payload.receiver !== undefined) { // Assuming 'receiver' is the correct field name
        if (payload.receiver.name !== undefined) updateDoc['receiver.name'] = payload.receiver.name;
        if (payload.receiver.phone !== undefined) updateDoc['receiver.phone'] = payload.receiver.phone;
        if (payload.receiver.email !== undefined) updateDoc['receiver.email'] = payload.receiver.email;
        if (payload.receiver.address !== undefined) updateDoc['receiver.address'] = payload.receiver.address;
        if (payload.receiver.city !== undefined) updateDoc['receiver.city'] = payload.receiver.city;
    }
    return updateDoc;
}

export default updateInnerObjectField;