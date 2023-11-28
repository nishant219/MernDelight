# MernDelight - Recipe App 👨‍💻 

## Client
The client application is hosted at [Link](https://client-reunion.vercel.app/).

## Server API
The server API can be accessed at [Link](https://backend-reunion.vercel.app/api/list-properties).

This is a recipe application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to sign up, log in, log out and perform CRUD operations on recipes. The project consists of two controllers: the user controller for authentication and the recipe controller.

## Features
- User authentication (sign up, log in, and log out)
- Recipe management (create, read, update, and delete recipes)
- Saving and retrieving saved recipes
- User authentication middleware for protected routes
- API documentation using Swagger UI

## Dependencies
kindly check the package.json file for all the dependencies

## Installation
Install the dependencies:
npm install
```
git clone <repository_url>
cd <project_directory>
npm install
```

Configure the environment variables:
- Update the necessary values in the `.env` file, such as the database connection URL.

Create a .env file in the root directory and add the following variables:


The application will start running on http://localhost:${port}.
Please refer to the API documentation using Swagger UI for more details on request and response formats.


## Routes
- `POST /signup`: Create a new user account.
- `POST /login`: Log in to an existing user account.
- `GET /logout`: Log out the current user.
- `GET /:recipeId`: Get a recipe by its ID.
- `PUT /save`: Save a recipe.
- `GET /savedRecipes/ids/:userId`: Get saved recipe IDs for a user.
- `GET /savedRecipes/:userId`: Get saved recipes for a user.
- `DELETE /delete/:recipeId`: Delete a recipe by its ID.
- `PUT /update/:recipeId`: Update a recipe by its ID.



## Image Gallery
Here are some of the route images:

| Image | Description |
|-------|-------------|
| <img src="https://github.com/nishant219/recipeApp/assets/72811435/da7e8e69-a52a-41b7-92a8-5cceb8771332" alt="Image 1" height="100" width="300" /> | This is the create route image |
| <img src="https://github.com/nishant219/recipeApp/assets/72811435/a6aafdfe-8781-4ec7-a7db-85fa68902539" alt="Image 2" height="100" width="300" /> | This is the save recipe route image |
| <img src="https://github.com/nishant219/recipeApp/assets/72811435/0536a7f7-8d56-41c1-bd43-56bec91aafb1" alt="Image 3" height="100" width="300" /> | This is the delete recipe by ID route image |
| <img src="https://github.com/nishant219/recipeApp/assets/72811435/fee7d95e-76ae-4fca-b346-71c753c0162d" alt="Image 1" height="100" width="300" /> | This is the get all recipe route image |






## Contributing
Contributions to the projects are welcome! Please follow these steps:
1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature or fix.
3. 🛠️ Make your changes and commit them.
4. 🚀 Push your changes to your fork.
5. 🔄 Create a pull request to the main repository.

Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue. Please follow the contribution guidelines.

👨‍💻 **Author**: Nishant (@nishant219)



