
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export enum Role {
    ADMIN = "ADMIN",
    SENDER = "SENDER",
    RECEIVER = "RECEIVER"
}

export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}

export interface IUser {
    name: string,
    email: string,
    password?: string,
    phone?: number,
    picture?: string,
    address?: string,
    isDeleted?: boolean,
    isVerified?: boolean,
    isActive?: IsActive,
    role: Role,
    authProvider: IAuthProvider[]
}