# Project Name: Sports Facility Booking Platform

This README file provides instructions for setting up and running the application locally.

## Live URL
 ```url
   https://l2-a6-recipe-sharing-server.vercel.app/api
   ```
## Features

### User Authentication and Authorization

- **Sign Up**: Allow users to register with the platform.
- **Login**: Enable users to authenticate and receive JWT tokens.
- **Authentication Middleware**: Verify JWT tokens and restrict access to authenticated routes.
- **Authorization Middleware**: Restrict access to routes based on user roles (admin vs. user).

### Facility Management

- **Create Facility (Admin Only)**: Add new facilities.
- **Update Facility (Admin Only)**: Modify facility details.
- **Soft Delete Facility (Admin Only)**: Mark facilities as deleted without removing them from the database.
- **Get All Facilities**: Retrieve a list of all facilities.

### Booking Management

- **Check Availability**: Verify available time slots for booking.
- **Create Booking (User Only)**: Allow users to book facilities.
- **View All Bookings (Admin Only)**: Retrieve all bookings.
- **View Bookings by User (User Only)**: Get bookings for the authenticated user.
- **Cancel Booking (User Only)**: Allow users to cancel their bookings.

### Error Handling

- **Global Error Handling Middleware**: Catch and handle errors globally.
- **Handle Validation Errors**: Ensure proper handling of validation errors with appropriate responses.
- **Handle Duplicate Entries**: Detect and handle attempts to create duplicate entries.
- **Handle Not Found Routes**: Implement a global handler for unmatched routes and return a "Not Found" response.


## Technologies Used
- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

# Getting Started

## Prerequisites

* **Software:**
    * Node.js (version 20.11.1 or higher)
    * npm Package Manager

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Anamul9901/new-add-ts.git
   ```

2. **Navigate to my project directory**
```bash
 cd new-add-ts
```

3. **Install dependencies**

    install the required dependencies using npm:

   ```bash
   npm install
   npm install express --save
   npm install mongoose --save
   npm install typescript --save-dev
   npm install cors
   npm install dotenv
   npm install zod
   npm install typescript-eslint
   npm install --save-dev eslint-config-prettier
   npm install ts-node-dev --save-dev
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   npx eslint --init
   ```

4. **Add ENV file**

Add you `.env` file on the root

Add this environment variables on this `.env` file. 
And also add your mongoDB  `DATABASE_URL`.
```bash
NODE_ENV= development
PORT=5000
DATABASE_URL= <<your mongoDB database url>>
```



## Running the application

1. **Start the development server**

   Run the following command to start the development server:

   ```bash
   npm run build
   npm run start:dev
   ```

   This will typically start the server on port 5000 by default

2. **Access the application**

   Open your web browser and navigate to http://localhost:5000 to access the running application.

## Contributing

This format provides clear instructions for running my application locally.