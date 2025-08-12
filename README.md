
# Express + TypeScript + Mongoose + MongoDB

## Parcel Management System

A robust and scalable backend application for managing parcel deliveries, featuring user authentication, role-based access control, and comprehensive parcel tracking functionalities.In this system a Sender can 
create a parcel and see all parcel which are he created only. A receiver Role user can see all upcoming 
parcel which are booked for him/her.When he will get parcel in his hand,then he can update the pacel status
delivered only.A sender can cancel their parcel until the parcel status will be dispatched.

## Project live link:
* https://batch5-l2-assignment5.vercel.app

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
### 3. **Create a** .env **file:**
Create a file named .env in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials
```bash
PORT=yourPort
DATABASE_URL=mongodb+srv://<your_mongo_user>:<your_mongo_password>@<your_cluster_url>/<your_database_name>?retryWrites=true&w=majority
#JWT
BCRYPT_SALT_ROUND=yourRoundNumber
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=yourExpiresIn
# google cloud 
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=youCallbackURL
# frontend url
FRONTEND_URL=yourFrontendURL

```
* **MongoDB Atlas:** Ensure your database user has the correct permissions and your current IP address is whitelisted in MongoDB Atlas Network Access.

* **Google OAuth:** Make sure http://localhost:5000/api/v1/auth/google/callback is added as an **Authorized redirect URI** for your Web Application Client ID in your Google Cloud Console.

### Running the Project
To start the development server:

```bash
npm run dev
# OR
yarn dev
```
The server will typically run on http://localhost:yourPort.

## 📋 API Endpoints
Here are some example API endpoints. Replace http://localhost:yourPortNumber/api/v1 with your actual base URL.

### Authentication & Users
* ```bash POST /api/v1/auth/register```

   * **Description:** Register a new user with email and password.

   * **Body:**
```bash
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
}
```
* ```bash POST /api/v1/auth/login```

   * **Description:** Log in a user with email and password.

   * **Body:**
```bash
 {
  "email": "john.doe@example.com",
  "password": "StrongPassword123!"
 }
```
* ```bash GET /api/v1/auth/google```

  * **Description:** Initiate Google OAuth login.

* ```bash GET /api/v1/auth/google/callback```

  * **Description:** Google OAuth callback URL (handled by Passport.js).

* ```bash PATCH /api/v1/users/reset-password```

  * **Description:** Reset a user's password. (Requires authentication, send token in headers)
  * **Body:**
```bash
 {
  "oldPassword": "CurrentPassword123!",
  "newPassword": "NewStrongPassword456!"
 }
```  
* ```bash PATCH /api/v1/users/:id```

  * **Description:** Update user details (requires authentication and authorization).

  * **Body:** Partial<IUser> data.

* ```bash GET /api/v1/users```

  * **Description:** Get all users (Admin/Super Admin only).

### Parcel Management
* ```bash POST /api/v1/parcels```

* **Description:** Create a new parcel delivery order.

* **Body:** IParcel data (refer to parcel.interface.ts for structure).

* ```bash GET /api/v1/parcels```

* **Description:** Get all parcels (filtered by user role).

* ```bash GET /api/v1/parcels/:id```

* **Description:** Get a single parcel by ID.

* ```bash PATCH /api/v1/parcels/:id```

* **Description:** Update parcel details (authorization based on role/fields).

* **Body:** Partial<IParcel> data.

* ```bash DELETE /api/v1/parcels/:id```

* **Description:** Delete a parcel (Admin/Dispatcher only).

