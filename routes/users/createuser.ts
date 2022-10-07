import { count } from "console";
import { Application } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { ApiException } from "../../TypesOfUsers/exception";
import { TypesOfUsers } from "../../TypesOfUsers/typeofusers";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/index')
console.log(User);
function isEmpty(obj: any) {
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

module.exports = (app: Application) => {
  app.post("/api/users", async (req, res) => {
    const { pseudo, nom, prenom, email } = req.body
    if(isEmpty(req.body)){
      res.status(400).json({'message': "Paramètres manquants."})
    } else {
      const findUser = await User.findOne({ where: { email: email } })
      if(!findUser){
        let hashedPassword = await bcrypt.hash(req.body.pwd, 10);
        User.create({ 
            pseudo : pseudo, 
            pwd : hashedPassword, 
            nom : nom, 
            prenom : prenom,  
            email : email, 
        }).then((user: any) => {
            const message: string = `Utilsateur ${pseudo} créée.`;
            return res.status(201).json({ message, data: user });
            })
          .catch((error : ApiException) => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data : error})
            }
            const message = `Echec lors de la création.`
            res.status(500).json({message, data : error})
          });
      } else {
        res.status(200).json({'message': "Utilisateur existant."})
      }
    }
  });
};