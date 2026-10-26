# Cinematic Hub — beginner-friendly full-stack movie website

## Features
- Browse movies from MySQL through Spring Boot REST APIs
- Search by title/cast, filter by genre, sort by rating or release year
- Individual movie detail pages and trailer links
- Browser-saved favorites/watchlist
- Add, edit, delete movie records from the Manage Movies page
- Responsive desktop/mobile design
- Sample movies inserted automatically on first startup

## Requirements
Java 21, Maven 3.9+, Node.js 20+, npm, and MySQL Server 8.4.

## Setup
1. In MySQL Workbench, run `CREATE DATABASE cinematic_hub;`
2. Check `backend/src/main/resources/application.properties`. Default username/password are `root` / `root`; change them to your MySQL credentials.
3. Terminal 1:
   `cd backend`
   `mvn spring-boot:run`
4. Terminal 2:
   `cd frontend`
   `npm install`
   `npm run dev`
5. Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

## Main files explained
- `Movie.java`: fields for a movie; JPA/Hibernate maps this class to a MySQL table.
- `MovieRepository.java`: Spring Data JPA database queries.
- `MovieService.java`: application logic.
- `MovieController.java`: REST API endpoints.
- `DataSeeder.java`: inserts demo records only when the table is empty.
- `frontend/src/api.js`: Axios requests to backend.
- `frontend/src/App.jsx`: pages, search, watchlist, movie form.
- `frontend/src/styles.css`: page design and responsive layout.

## API
GET `/api/movies?search=space&genre=Sci-Fi`
GET `/api/movies/{id}`
POST `/api/movies`
PUT `/api/movies/{id}`
DELETE `/api/movies/{id}`

POST/PUT JSON fields: `title`, `genre`, `releaseYear`, `rating`, `duration`, `overview`, `posterUrl`, `backdropUrl`, `castNames`, `trailerUrl`.

## Notes
The trailer button opens a trailer link/search page; it does not host video. Favorites are stored in your browser and do not require login. Real accounts, payment, and live cinema ticket booking are not included. Movie poster URLs need an internet connection.
Troubleshooting: if database login fails, fix the username/password in `application.properties`; if frontend cannot connect, ensure backend runs on port 8080 and frontend on port 5173.
