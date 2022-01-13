module.exports = (sequelize, Sequelize) => {
    const usuarios = sequelize.define("usuarios_back", {
      usuario_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      usuario: {
        type: Sequelize.STRING
      },
      clave: {
        type: Sequelize.STRING
      }
    });
  
    return usuarios;
  };