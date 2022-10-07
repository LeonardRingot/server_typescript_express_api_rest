const {DataTypes,  Sequelize } = require('sequelize')
const UsersModels = require('../UsersModels/usersmodels')
const TypesOfUsers = require ('../TypesofUsers/typeofusers')
import users from './users'
//On se connecte a notre BDD
const sequelize = new Sequelize (
    'bdd_api_rest',
    'postgres',
    'root',
    {
        host:'localhost',
        dialect:'postgres',
        port: 5432,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true
      }
    }
)

sequelize.authenticate()
    .then(() => console.log('Liaison etablie'))
    .catch((error : Error) => console.error(`Error: ${error}`)
    )
const db = {Sequelize: '', users: ''};
db.Sequelize = sequelize;
db.users = require("./user.model.ts")(sequelize, Sequelize);

const User = UsersModels(sequelize, DataTypes)

const initDb = () => {

        return sequelize.sync({force: true}).then(()=> {
            
            users.map((user: typeof TypesOfUsers) => {
                User.create({
                    pseudo: user.pseudo,
                    nom: user.nom,
                    prenom: user.prenom,
                    pwd: user.pwd,
                    email: user.email,
                    bio: user.bio
                    
                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
            })
            console.log('BDD créer')
    })
}

module.exports = {
    initDb,
    User,
    db
}