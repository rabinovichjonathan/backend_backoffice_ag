module.exports = (sequelize, Sequelize) => {
    const categorias = sequelize.define("categorias", {
      categoria_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      categoria: {
        type: Sequelize.STRING
      }
    });
  
    return categorias;
  };