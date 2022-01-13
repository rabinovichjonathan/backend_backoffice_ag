const db = require("../models/");
const categorias = db.categorias;
const productos = db.productos;
//const Op = require("sequelize").Op;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.producto) {
      res.status(400).send({
        message: "Producto can not be empty!"
      });
      return;
    } 
    const producto = {
      producto: req.body.producto,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      cantidad_unidades: req.body.cantidad_unidades,
      foto_producto: req.body.foto_producto,
      destacado: req.body.destacado,
      categoria_id: req.body.categoria_id
    };
    

    var condition = { producto: { [Op.eq]: `${producto.producto}` } };

    productos.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        productos.create(producto)
        .then(data2 => {
          res.send(data2);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the producto."
          });
        });
      }else{
        res.status(409).send({
          message: "El producto a ingresar ya existe!"
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving productos."
      });
    });
};

// Retrieve all productos from the database.
exports.findAll = (req, res) => {
  const producto = req.query.producto;
  
  var condition = producto ? { producto: { [Op.like]: `%${producto}%` } } : null;
  productos.belongsTo(categorias, {foreignKey: "categoria_id"})
  productos.findAll({where: condition, include: [categorias] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorias."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  productos.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find categorias with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving categorias with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const producto ={
    producto: req.body.producto,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    cantidad_unidades: req.body.cantidad_unidades,
    foto_producto: req.body.foto_producto,
    destacado: req.body.destacado
  }  
  var condition = { producto: { [Op.eq]: `${producto.producto}` },
                    producto_id: { [Op.ne]: `${id}` }
                   };

    productos.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        productos.update(req.body, {
          where: { producto_id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Productos was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update productos with id=${id}. Maybe productos was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating producto with id=" + id
            });
          });
      }else{
        res.status(409).send({
          message: "El producto a ingresar ya existe!"
        });
        return;
      }
    })
  
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  productos.destroy({
    where: { producto_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Producto was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Producto with id=${id}. Maybe Producto was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Producto with id=" + id
      });
    });
};

// Delete all categorias from the database.
exports.deleteAll = (req, res) => {
  productos.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} productos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all productos."
      });
    });
};

// Find all published categorias
exports.findAllPublished = (req, res) => {
  productos.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving productos."
      });
    });
};