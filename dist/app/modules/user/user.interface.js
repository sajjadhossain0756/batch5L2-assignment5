"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.IsActive = void 0;
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["SENDER"] = "SENDER";
    Role["RECEIVER"] = "RECEIVER";
})(Role || (exports.Role = Role = {}));
