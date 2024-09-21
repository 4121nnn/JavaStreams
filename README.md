# Java Streams Project

[![Video Title](https://i9.ytimg.com/vi_webp/GCMvXJZXTKg/mqdefault.webp?v=66eef3de&sqp=CIjpu7cG&rs=AOn4CLDWNfoEXTjO8yP3N8cmY9Oq1IntCw)](https://youtu.be/GCMvXJZXTKg)

A project designed to help users practice and master the **Java Streams API**. This project is built using **Spring Boot** for the backend and **React** (with Vite) for the frontend, along with a range of modern technologies.


## Features

- Interactive exercises to learn and practice Java Streams.
- **Spring Boot** backend with REST APIs.
- **React** frontend built using **Vite** for fast development and optimized builds.
- **Email/password registration and login** functionality.
- **Spring Security** integrated with **OAuth2** login via Google and GitHub.
- **JWT-based authentication** with stateless session management.
- **MySQL** for data persistence with **Spring Data JPA**.

## Tech Stack

- **Backend**: Spring Boot, Spring Security, Spring Data JPA, OAuth2 (Google, GitHub), JWT
- **Frontend**: React, Vite
- **Database**: MySQL
- **Build Tools**: Maven (for Spring Boot)
- **Other**: Docker

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/4121nnn/javastreams.git
    ```

2. Navigate to the project directory:

    ```bash
    cd javastreams
    ```

3. **Backend Setup (Spring Boot)**:
   - Ensure you have Java (version 21 or above) installed.
   - Create a MySQL database:

    ```sql
    CREATE DATABASE streams;
    ```

   - Configure your `application.yml` or `application.properties` with your MySQL credentials:

    ```yaml
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/streams
        username: your_username
        password: your_password
      jpa:
        hibernate:
          ddl-auto: update
    ```

   - Run the following commands to start the backend:

    ```bash
    ./mvnw spring-boot:run
    ```

4. **Frontend Setup (React + Vite)**:
   - Navigate to the `frontend` folder:

    ```bash
    cd frontend
    ```

   - Install dependencies and start the frontend:

    ```bash
    npm install
    npm run dev
    ```

5. The application will be accessible at `http://localhost:3000`.

## Security

- **JWT Authentication**: The project uses JSON Web Tokens (JWT) to secure API requests and enforce stateless session management.
- **Email/Password Authentication**: Users can register and log in using their email and password. Upon successful authentication, JWT tokens are issued.
- **OAuth2 Login**: Users can also log in via **Google** and **GitHub** OAuth2 providers. Upon successful login, JWT tokens are issued.
## Database Migrations

## Usage

- Visit the homepage to start solving exercises related to Java Streams.
- The backend provides the APIs to fetch exercises and submit solutions.
- React handles the frontend rendering for a dynamic, responsive user experience.

## Docker Support

A `Dockerfile` is provided to easily build and deploy the project. To build and run the Docker container:

