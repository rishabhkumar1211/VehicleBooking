Vehicle Rental Backend
This is the backend service for the Vehicle Rental application. It provides APIs to manage vehicle rentals, allowing users to view available vehicles and book them for specified date ranges, ensuring no overlapping bookings.

Table of Contents
Technologies Used
Project Structure
Setup Instructions
Database
API Documentation
Seeding Initial Data
Error Handling
License
Technologies Used
Node.js: JavaScript runtime for server-side logic
Express.js: Web framework for building APIs
SQLite: Lightweight SQL database
Sequelize: ORM for interacting with SQLite
Body-Parser: Middleware for parsing request bodies
CORS: Middleware for handling cross-origin requests
Project Structure
plaintext
Copy code
/backend
├── app.js                 # Main application file
├── database.js            # Database connection setup
├── models                 # Database models directory
│   ├── VehicleType.js     # Model for vehicle types
│   ├── Vehicle.js         # Model for individual vehicles
│   └── Booking.js         # Model for booking records
├── routes                 # Directory for route files
│   └── vehicleRoutes.js   # Route handlers for vehicle and booking endpoints
├── seedData.js            # Script for seeding initial data into the database
└── README.md              # Project documentation file
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/vehicle-rental-backend.git
cd vehicle-rental-backend
Install Dependencies:

bash
Copy code
npm install
Setup the Database:

The application uses SQLite, which stores data in a file named database.sqlite in the project root.
You don't need to install a separate database server for SQLite.
Seed Initial Data: Run the following command to create initial vehicle types and vehicles in the database.

bash
Copy code
node seedData.js
Start the Server:

bash
Copy code
node app.js
The server should be running on http://localhost:3000.

Database
The application uses SQLite as the database. Sequelize ORM is used to manage models and database interactions.

VehicleType: Stores different vehicle types (e.g., SUV, Sedan, Cruiser).
Vehicle: Stores specific vehicle entries under each vehicle type.
Booking: Stores bookings with date ranges, associated with specific vehicles.
API Documentation
1. Get Vehicle Types by Wheels
Endpoint: GET /api/vehicle-types/:wheels
Description: Returns vehicle types based on wheel count (2 for bikes, 4 for cars).
Example: GET /api/vehicle-types/4
Response:json
[
  {
    "id": 1,
    "name": "SUV",
    "wheels": 4
  },
  ...
]
2. Get Vehicles by Type ID
Endpoint: GET /api/vehicles/:typeId
Description: Returns vehicles under a specific vehicle type.
Example: GET /api/vehicles/1
Response:json
[
  {
    "id": 1,
    "model": "Toyota Highlander",
    "typeId": 1
  },
  ...
]
3. Book a Vehicle
Endpoint: POST /api/book-vehicle
Description: Books a vehicle for a specified date range. Checks for overlapping bookings.
Body:json
{
  "vehicleId": 1,
  "startDate": "2024-11-10",
  "endDate": "2024-11-15"
}
Response:
Success: "Booking confirmed!"
Error: "Vehicle is already booked for the selected dates."
Seeding Initial Data
Run the seedData.js script to populate the database with initial values. It will create:

Three vehicle types (hatchback, SUV, sedan) and two bike types (cruiser, sports).
A few vehicles associated with each type.
Command:bash
node seedData.js
Error Handling
The application provides error messages for:
Invalid Input: For example, non-integer values for wheels.
Database Errors: Issues with database connections or queries.
Booking Overlap: Attempting to book a vehicle for dates that conflict with an existing booking.
License
This project is licensed under the MIT License.
