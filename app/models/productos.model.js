module.exports = (sequelize, Sequelize) => {
    const productos = sequelize.define("productos", {
      producto_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      producto: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.FLOAT
      },
      cantidad_unidades: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      foto_producto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      destacado: {
        type: Sequelize.BOOLEAN,
        allowNull: true, 
        defaultValue: false
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'categoria_id'
        }
      }
    });
  
    return productos;
  };