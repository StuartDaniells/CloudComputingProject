const express =  require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');                        //cross site scripting
// const fs = require('fs');                         // Access server file system 
const path = require("path");
const peopleRoutes = require("./routes/people");
const encryption = require("bcryptjs")                // encrypting passwords in database

/* ---------------------------- Global Variables ---------------------------- */
const connectionString = "mongodb://localhost:27017/PortfolioList"
const PORT = 9000;                                                      // Port number constant

/* -------------------------- init app & middleware ------------------------- */
const app = express(); 
// To be use by the handler methods in POST PUT, etc  
app.use(express.json());                                              // allows us to parse requests coming in, to json format
app.use(cors());                                   // allows cross site scripting - client communication with db

let db;                    // database data for cards display

/* -------------------------------------------------------------------------- */
/*               Connection to "PortfolioList" db in "Cluster"                */
/* -------------------------------------------------------------------------- */

MongoClient.connect(connectionString)               // Promises - async
.then((client) => {   
   db = client.db();                                                  // getting all database data
   app.listen(PORT, () => console.log('Server Started.'));            
})
.catch(err => console.log("Error Occured: \n", err));


/* ----------------------- Serving static image files ----------------------- */
app.use('/images', express.static(path.join(__dirname, 'images')));             // next() is built in to go to next middleware if present


/* --- Serving the css & JS files for each portfolio as static file -- */
app.use('/portfolios', express.static(path.join(__dirname, 'portfolios')));        // making all files (not .html) from 'portfolios' dir static

/* ----- Serving the production code from the react build folder - as a static web server ------*/
app.use('/portfolios/asif', express.static(path.join(__dirname, 'portfolios', 'asif', 'build')));

/* --------------------- On localHost Home page load -------------------- */
// -> returns all the documents in PortfolioList/users collection

app.get('/cardData', (req,res) => {
   let usersList = [];
   
   // Promise-async, 
   // getting all documents in the "users" collection 
   // datatype is cursor (obj. pointing to all documents in collection)
   db.collection('users')
      .find({})                                                              //cursor
      .project({_id: 0, name: 1, portfolio_link: 1, username: 1, imageUrl: 1})
      .forEach(product => usersList.push(product))                      //each Document
      .then(() => {
         res.status(200).json(usersList);                               //json stringify each document and send to client
      })
      .catch(() => {
         res.status(500).json({error: 'Could not fetch documents from mongo database'});
      });                                                                  // end db collection fetch
});


/* ------------------------ get individual portfolios ----------------------- */
app.use('/portfolios', peopleRoutes);


/* -------------------------------------------------------------------------- */
/*        POST method - sending new user data to the DB - Sign Up Page        */
/* -------------------------------------------------------------------------- */

app.post('/registerUser', async (req, res) => {
   const {fullName, email, password} = req.body;                           // is a json body - to be created as a doc. in new collection
   
   const encryptedPass = await encryption.hash(password, 10)                    // encrypt the password entered from form

   try{
      /* --------------------- Checking if user already exists -------------------- */
      const user = await db.collection("NewSignUps").findOne({email});
      if(user){
         return res.send({error: "User already exists"})
      }

      /* ------------------------ Inserting new unique user ----------------------- */
      await db.collection('NewSignUps')
               .insertOne({
                  fullName: fullName, 
                  email: email, 
                  password: encryptedPass
               })
               .then(result => res.status(201).json(result))                      // request has succeeded and led to creation of a resource in DB
               .catch((err) => res.status(500).json({err: "Could not create a new user document."}))
      console.log("User successfully added to database!");
   }
   catch(error){
      res.send({status: error});
   }
});


/* -------------------------------------------------------------------------- */
/*         POST method - checking user data from the DB - SignIn Page         */
/* -------------------------------------------------------------------------- */

app.post('/logInUser', async (req, res) => {
   const { email, password} = req.body;                           // is a json body - to be created as a doc. in new collection

   /* --------------------- Checking if email already exists -------------------- */
   const newUser = await db.collection("NewSignUps").findOne({email});
   const oldUser = await db.collection("users").findOne({email});

   if ((newUser === null) && (oldUser === null)){
      return res.send({error: "User not found"});
   }

   /* ------------------ Check if password matches - decrypted ----------------- */
   // NewSignUps - collection
   if(newUser === null){
      if (await encryption.compare(password, oldUser.password)) {
         // request successful
         if(res.status(201))  {
            return res.json({status: "ok", data: "Signed in successfully"});
         }
         else {
            return res.json({error: "error occured in sending data"});
         }
      }
   } 
   // else users - collection
   else{                                              
      if (await encryption.compare(password, newUser.password)){
         // request successful
         if(res.status(201))  {
            return res.json({status: "ok", data: "Signed in successfully"});
         }
         else {
            return res.json({error: "error occured in sending data"});
         }
      }
   }
   res.json({status: "error", error: "Invalid password"});
});