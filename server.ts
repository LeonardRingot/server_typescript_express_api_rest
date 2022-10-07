
require('dotenv').config()
const cors = require('cors');
const express = require ('express');

const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));

const sequelize = require ('./db/index')
import {Response, Request, NextFunction} from 'express'
import { ApiException } from './TypesOfUsers/exception'

app.use(express.json())



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur lancer sur Port ${port}`)
})
const db = require("./app/models");
const User = db.users;
const Op = db.Sequelize.Op;
db.sequelize.sync()
.then(() => {
console.log("Synced db.");
})
.catch((err: any) => {
console.log("Failed to sync db: " + err.message);
});

require('./routes/users/createuser')(app)
require('./routes/users/findById')(app)
require('./routes/users/updateuser')(app)
require('./routes/auths/login')(app)
require('./routes/auths/token')(app)

//import { TypesOfUsers } from "./TypesOfUsers/typeofusers";
//const { User } = require('./db/index')
const jwt = require('jsonwebtoken')
function authenticateToken(req : Request, res : Response, next : NextFunction) {
  console.log("PASSSS");
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let message = 'No token given'
    if (token == null) return res.status(401).send({message})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err : Error, user : any) => {
        message = 'Expired token.'
        if (err) return res.status(403).send({tokenIsExpired: true, message : message, data : err})
        //req.user = user
        next()
    })
}
app.get('/auths/login', authenticateToken, (req : Request, res : Response) => {
    User.findByPk(req.params.id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${req.params.id}.`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + req.params.id
      });
    });
})