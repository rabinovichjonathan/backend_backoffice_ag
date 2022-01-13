const db = require("../models/");
const categorias = db.categorias;
//const Op = require("sequelize").Op;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.categoria) {
      res.status(400).send({
        message: "Categoria can not be empty!"
      });
      return;
    } 
    const categoria = {
      categoria: req.body.categoria
    };

    var condition = { categoria: { [Op.eq]: `${categoria.categoria}` } };

    categorias.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        categorias.create(categoria)
        .then(data2 => {
          res.send(data2);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the categoria."
          });
        });
      }else{
        res.status(409).send({
          message: "La categoría a ingresar ya existe!"
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorias."
      });
    });
};

// Retrieve all categorias from the database.
exports.findAll = (req, res) => {
  const categoria = req.query.categoria;
  
  var condition = categoria ? { categoria: { [Op.like]: `%${categoria}%` } } : null;

  categorias.findAll({ where: condition })
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

  categorias.findByPk(id)
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
  const categoria = req.body.categoria;
  var condition = { categoria: { [Op.eq]: `${categoria}` },
                    categoria_id: { [Op.ne]: `${id}` }
                   };

    categorias.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        categorias.update(req.body, {
          where: { categoria_id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "categorias was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update categorias with id=${id}. Maybe categorias was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });
      }else{
        res.status(409).send({
          message: "La categoría a ingresar ya existe!"
        });
        return;
      }
    })
  
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  categorias.destroy({
    where: { categoria_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "categorias was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete categorias with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete categorias with id=" + id
      });
    });
};

// Delete all categorias from the database.
exports.deleteAll = (req, res) => {
  categorias.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Categorias were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categorias."
      });
    });
};

// Find all published categorias
exports.findAllPublished = (req, res) => {
  categorias.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};