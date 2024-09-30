# Java Streams Project

Click on the image to view on YouTube.


[![Video Title](https://i9.ytimg.com/vi_webp/GCMvXJZXTKg/mqdefault.webp?v=66eef3de&sqp=CICA6rcG&rs=AOn4CLA7Q7hbHaXALapmJBUyqtyel8Fv3Q)](https://youtu.be/GCMvXJZXTKg)


A project designed to help users practice the **Java Streams API**. This project is built using **Spring Boot** for the backend and **React** (with Vite) for the frontend.


## Features

- Interactive exercises practice Java Streams.
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
   - Ensure you have Java (version 17 or above) installed.
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