
import { Application } from "express"
import { TypesOfUsers } from "../../TypesOfUsers/typeofusers";
import { ApiException } from "../../TypesOfUsers/exception";
import {Response, Request, NextFunction} from 'express'
const { User } = require('../../db/index')

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

module.exports = (app : Application) => {
    app.get('/api/users/:id', (req, res) => {
      User.findByPk(req.params.id)
        .then((user : TypesOfUsers )=> {
          if (user === null){
            const message = "L'utilisateur recherché n'existe pas"
            return res.status(404).json({message})
          }
  
          const message : string = 'Utilisateur trouvé.'
          res.json({ message, data: user })
        })
        .catch((error : ApiException ) => {
          const message = "Cannot find user."
          res.status(500).json({message, data: error})
        })
    })
  }

 