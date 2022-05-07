# My Website (v3.0)

Portfolio Site (MERN Stack)

My portfolio site, made with React, Express, Node.js and MongoDB.

## Core Features

- Contact Form utilizes SendGrid API to send emails
- Users can login and register for blog
- User authorization via JWT Tokens.

## Notes

Be sure to create a src/.env file set the following Environment Variable for development mode as well as production when pushed to server (eg. Netlify...etc).

1. PORT
2. MONGO_URI (MongoDB connection String)
3. JWT_SECRET (JWT Secret String)
4. SENDGRID_API_KEY (for contact form)

Set base backend URL in frontend/index.js

> axios.defaults.baseURL = "backend/url"

## Scripts

To start frontend development server

> yarn client

To build frontend for production

> yarn build

To start backend (with nodemon)

> yarn server

## Tags

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
