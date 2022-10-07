module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("user", {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
            },
            pseudo: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg : concatRequiredMessage('Pseudo')},
                    notEmpty : { msg : concatRequiredMessage('Pseudo')}
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate : {
                    isEmail:true, 
                    notNull: { msg : concatRequiredMessage('Email')},
                    notEmpty: { msg : concatRequiredMessage('Email')}
                }
            },
            pwd: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg : concatRequiredMessage('Pwd')},
                    notEmpty : { msg : concatRequiredMessage('Pwd')}
                }
            },
            nom: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg : concatRequiredMessage('Nom')},
                    notEmpty : { msg : concatRequiredMessage('Nom')}
                }
            },
            prenom: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg : concatRequiredMessage('Prenom')},
                    notEmpty : { msg : concatRequiredMessage('Prenom')}
                }
            },
            bio: {
                type: Sequelize.STRING,
                allowNull: true
            },
    });
  
    return User;
  };

  const concatRequiredMessage = (data : string) => {
    return `${data} is required`
}