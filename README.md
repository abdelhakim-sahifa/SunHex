

![sunhex](https://i.ibb.co/q32LXH2C/sunhex.png "sunhex")

This repository contains the SunHex project, which is divided into two main parts:

- **`api-src`**: This directory contains the source code for the SunHex API, a Node.js-based service for generating and decoding unique identifiers. For more information, please refer to the `README.md` file inside the `api-src` directory.

- **`Drafts`**: This directory contains various drafts and experiments related to the SunHex project. These files are not part of the main application but are kept for reference and future development.


# SunHex API

This is the official documentation for the SunHex API, a Node.js-based service for generating and decoding unique identifiers.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Health Check](#health-check)
  - [Get Available Countries](#get-available-countries)
  - [Generate SIN](#generate-sin)
  - [Decode SIN](#decode-sin)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

To get started with the SunHex API, you need to have Node.js and npm installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abdelhakim-sahifa/sunhex.git
   cd sunhex/api-src
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

You can run the application in two modes:

- **Development mode:**
  ```bash
  npm run dev
  ```
  This will start the server with `nodemon`, which automatically restarts the application when file changes are detected.

- **Production mode:**
  ```bash
  npm start
  ```
  This will start the server in a production environment.

The API will be accessible at `http://localhost:3000`.

## API Endpoints

The SunHex API provides the following endpoints:

### Health Check

- **GET** `/api/health`
  - **Description:** Checks the status of the API.
  - **Response:**
    ```json
    {
      "status": "OK",
      "timestamp": "2025-09-26T10:00:00.000Z"
    }
    ```

### Get Available Countries

- **GET** `/api/countries`
  - **Description:** Retrieves a list of supported countries.
  - **Response:**
    ```json
    {
      "status": "success",
      "countries": ["US", "CA", "GB", "..."]
    }
    ```

### Generate SIN

- **POST** `/api/generate`
  - **Description:** Generates a new SIN based on user data.
  - **Request Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "countryCode": "US",
      "birthYear": 1990,
      "birthMonth": 1,
      "birthDay": 15,
      "gender": "Male",
      "pin": 1234
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "hexCode": "a1b2c3d4e5f6"
    }
    ```

### Decode SIN

- **POST** `/api/decode`
  - **Description:** Decodes a SIN to retrieve user data.
  - **Request Body:**
    ```json
    {
      "hexCode": "a1b2c3d4e5f6",
      "pin": 1234
    }
    ```
  - **Response:**
    ```json
    {
      "status": "success",
      "data": {
        "firstName": "John",
        "lastName": "Doe",
        "country": "United States",
        "birthDate": "1990-01-15",
        "gender": "Male"
      }
    }
    ```

## Dependencies

The SunHex API relies on the following main dependencies:

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **CORS:** A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Serverless-http:** A library for wrapping Express, Koa, and other Node.js frameworks to be used with AWS Lambda and API Gateway.
- **Nodemon:** A utility that monitors for any changes in your source and automatically restarts your server.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.

