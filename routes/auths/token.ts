import { Application } from "express";
import { ValidationError } from "sequelize";
//import { ApiException } from "../../types/exception";
import { TypesOfUsers } from "../../TypesOfUsers/typeofusers";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../db/index')

let refreshTokens : any = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c']


module.exports = (app: Application) => {
    app.post("/api/auths/token", (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err : Error, user : any) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign({name: user.pseudo}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        res.json({accessToken: accessToken})
        })
    })
};