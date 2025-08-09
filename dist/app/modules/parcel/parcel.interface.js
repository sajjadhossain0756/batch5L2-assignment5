"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.ParcelTypes = exports.ParcelStatus = void 0;
var ParcelStatus;
(function (ParcelStatus) {
    ParcelStatus["REQUESTED"] = "REQUESTED";
    ParcelStatus["DISPATCHED"] = "DISPATCHED";
    ParcelStatus["IN_TRANSITE"] = "IN_TRANSITE";
    ParcelStatus["DELIVERED"] = "DELIVERED";
    ParcelStatus["CANCELLED"] = "CANCELLED";
})(ParcelStatus || (exports.ParcelStatus = ParcelStatus = {}));
var ParcelTypes;
(function (ParcelTypes) {
    ParcelTypes["DOCUMENT"] = "DOCUMENT";
    ParcelTypes["SMALL_PACKAGE"] = "SMALL_PACKAGE";
    ParcelTypes["MEDIUM_PACKAGE"] = "MEDIUM_PACKAGE";
    ParcelTypes["LARGE_PACKAGE"] = "LARGE_PACKAGE";
})(ParcelTypes || (exports.ParcelTypes = ParcelTypes = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
