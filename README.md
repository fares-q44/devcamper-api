
# DevCamper API

The DevCamper API is the backend for the DevCamper website, providing information about bootcamps and relevant data. The API includes authentication and password reset functionality.

## API Endpoints

The following endpoints are example of available endpoints n the API:

- `/api/v1/bootcamps`: Get all bootcamps, create a new bootcamp
- `/api/v1/bootcamps/:id`: Get a single bootcamp, update a bootcamp, delete a bootcamp
- `/api/v1/bootcamps/:id/photo`: Upload a photo for a bootcamp
- `/api/v1/courses`: Get all courses, create a new course
- `/api/v1/courses/:id`: Get a single course, update a course, delete a course
- `/api/v1/auth/register`: Register a new user
- `/api/v1/auth/login`: Login a user
- `/api/v1/auth/logout`: Logout a user
- `/api/v1/auth/me`: Get the current user's profile
- `/api/v1/auth/forgotpassword`: Request a password reset
- `/api/v1/auth/resetpassword/:resettoken`: Reset a user's password

## Authentication

The API requires authentication for some endpoints. To authenticate, send a POST request to `/api/v1/auth/login` with a JSON body containing the user's email and password. The response will include a JWT token that should be included in the headers of subsequent requests.

## Setting Up and Running the Project

To set up the project, follow these steps:

1. Clone the repository to your local machine
2. Install dependencies by running `npm install`
3. Create a `.env` file with the necessary environment variables (e.g. `PORT`, `MONGO_URI`, `JWT_SECRET`)
4. Start the server by running `npm start`

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Contributing

To contribute to the project, please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and test thoroughly
4. Submit a pull request to the `main` branch

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or concerns about the project, please email fares.q46@gmail.com
