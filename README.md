

![sunhex](https://i.ibb.co/q32LXH2C/sunhex.png "sunhex")

addd 
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)](https://sunhex.vercel.app/)
[![GitHub stars](https://img.shields.io/github/stars/abdelhakim-sahifa/SunHex?style=social)](https://github.com/abdelhakim-sahifa/SunHex/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/abdelhakim-sahifa/SunHex?style=social)](https://github.com/abdelhakim-sahifa/SunHex/network/members)
[![License](https://img.shields.io/github/license/abdelhakim-sahifa/SunHex)](https://github.com/abdelhakim-sahifa/SunHex/blob/main/LICENSE)


This is the official documentation for the SunHex, a Next.js application for generating and decoding unique identifiers.

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
   cd sunhex
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
  This will start the Next.js development server with hot-reloading enabled.

- **Production mode:**
  ```bash
  npm run build
  npm start
  ```
  This will build the application for production and then start the production server.

The application will be accessible at `http://localhost:3000`.

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

The SunHex application relies on the following main dependencies:

- **Next.js:** A React framework for building full-stack web applications.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **Font Awesome:** A popular icon toolkit for web projects.

## License

This project is licensed under the ISC License. See the `LICENSE.md` file for more details.

