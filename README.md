Vehicle Rental Backend
This backend API provides functionality for a vehicle rental application, allowing users to view and book vehicles with date overlap checks to prevent double bookings.

Technologies Used
Node.js with Express for server-side logic and routing
SQLite as the database with Sequelize ORM
CORS and Body-Parser middleware
Getting Started
Installation
Clone the repository:
bash
git clone https://github.com/yourusername/vehicle-rental-backend.git
cd vehicle-rental-backend
Install dependencies:
bash
npm install

Seed the database with initial data:
bash
node seedData.js

Start the server:
bash
node app.js
The API will be running on http://localhost:3000.

API Endpoints
Get Vehicle Types by Wheels:
GET /api/vehicle-types/:wheels
Returns a list of vehicle types (e.g., 2 wheels for bikes, 4 wheels for cars).

Get Vehicles by Type ID:
GET /api/vehicles/:typeId
Returns vehicles based on the specified type.

Book a Vehicle:
POST /api/book-vehicle
Books a vehicle for a date range. Checks for existing bookings to avoid conflicts.
