# RealTimeDocs

## There are four main components to this project:
1. document-dashboard - a ReactJS frontend built using Vite
2. document-server - a NodeJS backend which utilizes Express for handling HTTP requests
3. MongoBD - database used for storing user data and plaintext documents
3. share-db - for real time syncing of documents between document-dashboard, document-server and MongoDb

# Set Up Guide
Ensure you have npm installed. The node version I used while creating this is v22.8.0

## document-dashboard
```
cd document-dashboard
npm install
npm run dev
```
## document-server
```
cd document-server
npm install
npm start
```
## mongo-db
```
docker compose up -d
```
You should now have a working project! 
