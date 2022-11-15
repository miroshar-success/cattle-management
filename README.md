# My Cattle Log - Livestock App

Repository meant to be just a practice exercise through the creation of a CRUD full-stack app with OAuth2.0 incorporated.

## How to run the front-end:

From the main directory, follow this commands:
cd client/

npm install

npm start

## How to run the back-end:

Create a new database called "Cattle_Tracker_DB" with postgres or in the /api/src/config/config.js file set the appropiate configurations for your own Data Base.
After having the Database prepared to be synced, in the directory /api run the following commands:

\*If you haven't installed the packages yet, run:

npm install

npm run dev

\*If you already installed the packages with the command "npm install", now type the following command to run de back-end:

npm run dev

Now you should have the front and back-end running!

## NOTE:

By default, the front-end will run in the PORT 3000, and the back-end in PORT 3001. You can change this configurations in the file /api/src/config/config.js
