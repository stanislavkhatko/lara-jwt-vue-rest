
## User Management System

### Objective:

Develop a simple yet robust web application that allows for managing user accounts. This includes functionalities for user registration, login, viewing, editing, and deleting user profiles.

Technical Specifications

- Backend Framework: PHP/Laravel
- Frontend Framework: Vue.js with Vuetify
- Database: MySQL or SQLite (candidate's choice)
- Authentication: Implement JWT (JSON Web Tokens) for authentication.
- TDD Framework: PHPUnit or PEST for Laravel

### Requirements

API Development:

- Design and implement RESTful APIs for user management (Create, Read, Update, Delete).
- Use Laravel to develop these APIs following the TDD approach.
- Ensure API endpoints are secure and accessible only to authenticated users.

### Frontend Development:

- Develop the frontend using Vue.js and Vuetify.
- Implement a login page that authenticates users through the API.
- Create a dashboard for viewing, creating, editing, and deleting users. This should be accessible only to authenticated users.
- Implement form validations on both frontend and backend to ensure data integrity.

### Authentication:

- Implement secure login functionality.
- Use JWT to manage user sessions and protect API routes.

### Testing:

- Write comprehensive unit and feature tests using PHPUnit.
- Tests must cover API endpoints, authentication mechanisms, and front-end interactions.


## Installation

Clone repo
`git clone`

Install dependencies
`composer install`

Copy .env file
`cp .env.example .env`

Add laravel keys
`php artisan key:generate`

Generate JWT secret
`php artisan jwt:secret`

Run db migrations. Local db will be made under database/database.sqlite
`php artisan migrate`

Install npm dependencies
`npm i`

Build sources
`npm run build` - or `npm run dev` for development


Run app with Sail (if Docker installed) or with Valet. The app will be run on port 89
`./vendor/bin/sail up` 

Access app at
`http://localhost:89/`

Or access with Valet. I'll stick to Valet for now
`valet link`

Open with valet
`valet open` or access linked folder in  `{folder-name}.test`

Running API tests
`php artisan test`

Running Frontend tests
`npm run test`


# Development approaches
There are many ways to implement requested task. The frontend of the app could be separated into a Nuxt.js app and hosted separately. Also even being a monolith solution root or predefined web path of Laravel could have 'Users' SPA with own vue-routing system. I'll take the last approach for the sake of mono repo development.

## Missing parts
- refresh token functionality
- extend ttl for jwt token
- proper error validation in multiple places
- Added basic test environment for frontend and simple tests for Login and appStore components. Missing mocks and proper test coverage.







