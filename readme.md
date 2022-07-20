## how to run this project

1. run redis server using docker `docker run -p 6379:6379 redislabs/redisearch:latest`
2. run `npm install`
3. run `npm start`
4. goto: http://localhost:3000/api-docs/ to test api

## project structure

- db/ -> contains redis db model for user
- routers -> contains CRUD api routes for users
- index.js -> main file for this project (express starting point & swagger config)

please make sure port 3000 & 6379 are not in use before running this project.
