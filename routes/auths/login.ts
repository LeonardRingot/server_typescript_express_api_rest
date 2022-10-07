import { Application } from "express";
import { METHODS } from "http";
import { ValidationError } from "sequelize";
import { ApiException } from "../../TypesOfUsers/exception";
import { TypesOfUsers } from "../../TypesOfUsers/typeofusers";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/index')

module.exports = (app: Application) => {
  app.post("/api/auths/login", (req, res) => {
    User.findAll()
    .then(async (users: any) => {
        
        const user = users.find((user : TypesOfUsers) => user.email == req.body.email)

        if (user == null) {
            return res.status(400).send('Utilisateur introuvable')
        }
        let message : string = ''
        if (await bcrypt.compare(req.body.pwd, user.pwd)) {
            message = "Connecté"
            console.log(process.env.ACCESS_TOKEN_SECRET);
            const accessToken = jwt.sign({ name: user.pseudo }, process.env.ACCESS_TOKEN_SECRET)
            const refreshToken = jwt.sign({ name: user.pseudo }, process.env.REFRESH_TOKEN_SECRET)
            const data = {accessToken: accessToken, refreshToken: refreshToken}
            return res.status(200).json({ message, data: user.id, token: data});
        } else {
            message = "MDP incorrect"
            console.log('mauvais mdp');
            return message;
        }
        res.json(message)
    })
    .catch((error : ApiException) => {
            console.log(error);
            const message = `Could not get users list.`
            res.status(500).json({message, data : error})
        })
    })
};