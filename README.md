
# Express + TypeScript + Mongoose + MongoDB

## Parcel Management System

A robust and scalable backend application for managing parcel deliveries, featuring user authentication, role-based access control, and comprehensive parcel tracking functionalities.In this system a Sender can 
create a parcel and see all parcel which are he created only. A receiver Role user can see all upcoming 
parcel which are booked for him/her.When he will get parcel in his hand,then he can update the pacel status
delivered only.A sender can cancel their parcel until the parcel status will be dispatched.

## Project live link:
* https://batch5-l2-assignment4-gpe6.vercel.app/

## ✨ Features

* ## User Management:

* **User Registration & Authentication:** Secure email/password and Google OAuth 2.0 sign-up/login.Default
 a user Role will be Sender.If he want to be a receiver role, he can update their Role.

* **Password Management:** Reset password functionality.

* **Profile Management:** Users can manage their own profiles.

* **Role-Based Access Control (RBAC):** Differentiated permissions for various user types.

* ## Parcel Management:

* **Create Parcels:** Senders can create new delivery orders with detailed information.

* **Parcel Tracking:** Real-time updates on parcel status (e.g., REQUESTED, PICKED_UP, IN_TRANSIT, DELIVERED, CANCELLED).

* ## View Parcels:

* **Admin/Dispatcher:** View all parcels.

* **Sender:** View only parcels they have sent.

* **Receiver:** View only parcels addressed to them.


* ## Update Parcels:

* **Admin/Dispatcher:** Full control over all parcel fields and statuses.


* **Sender:** Cancel pending parcels (with restrictions if already dispatched).

* **Receiver:** Mark parcel as DELIVERED (for their own parcels).

* ## Delete Parcels: Admin/Dispatcher only.

## 🚀 Technologies Used

* **Backend Framework:** Node.js with Express.js

* **Database:** MongoDB

* **ORM:** Mongoose

* **Authentication:** Passport.js (Local Strategy, Google OAuth2.0 Strategy)

* **Password Hashing:** bcryptjs

* **Validation:** Zod

* **Environment Variables:** dotenv

* **Deployment:** Vercel

* **TypeScript:** A superset of JavaScript that adds static typing.


## 🛠️ Getting Started
Follow these steps to set up and run the project locally.

### Prerequisites
* Node.js (LTS version recommended)
* npm or Yarn (package manager)
* MongoDB Atlas Account (for a cloud database) or local MongoDB instance
* Google Cloud Project (for Google OAuth)

### Installation

### 1. Clone the Repository:
```bash
git clone https://github.com/sajjadhossain0756/batch5L2-assignment5.git
cd batch5L2-assignment5 # or your project directory name
```
### 2. Install dependencies:
```bash
npm install
# OR
yarn install
```