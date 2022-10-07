
module.exports = (sequelize: any, Sequelize: any) => {
    const User = sequelize.define("user", {
      pseudo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pwd: {
        type: Sequelize.STRING
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },

    });  
    return User;
  };