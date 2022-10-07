import { Application } from "express";
import { ValidationError } from "sequelize";
import { ApiException } from "../../TypesOfUsers/exception";
import { TypesOfUsers } from "../../TypesOfUsers/typeofusers";
const bcrypt = require('bcrypt')

const { User } = require('../../db/index')

module.exports = (app: Application) => {
    
    app.put("/api/users/:id", async (req, res) => {
        
      const id = req.params.id;
      const { pseudo, nom, prenom, email, bio } = req.body
     
      if (!req.body.pwd) return res.status(400).json({passwordRequired: true,message : 'Password is required.'})
      
      let hashedPassword = await bcrypt.hash(req.body.pwd, 10);
      User.update({ 
        pseudo : pseudo, 
          nom : nom, 
          prenom : prenom,
         email : email,
        pwd : hashedPassword,
          bio : bio
         
      }, {
        where: { id: id },
      })
        .then(() => {
         return User.findByPk(req.params.id).then((user: TypesOfUsers) => {
            if (user === null){
                
              const message = "Requested user does not exist."
              return res.status(404).json({message})
            }
              const message = `User ${user.pseudo} successfully updated`;
              return res.status(201).json({ message, data: user });
            })
        })
        .catch((error: ApiException) => {
          if(error instanceof ValidationError){
            return res.status(400).json({message: error.message, data : error})
          }
          
          const message = `Impossiblee de mettre a jour le profile.`;
          res.status(500).json({ message, data: error });
        });
    });
  };