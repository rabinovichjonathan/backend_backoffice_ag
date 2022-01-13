const db = require("../models/");
const usuarios = db.usuarios;
//const Op = require("sequelize").Op;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.usuario) {
      res.status(400).send({
        message: "usuario can not be empty!"
      });
      return;
    } 
    const usuario = {
      usuario: req.body.usuario,
      clave: req.body.clave
    };

    var condition = { usuario: { [Op.eq]: `${usuario.usuario}` } };

    usuarios.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        usuarios.create(usuario)
        .then(data2 => {
          res.send(data2);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the usuario."
          });
        });
      }else{
        res.status(409).send({
          message: "La usuario a ingresar ya existe!"
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuarios."
      });
    });
};

// Retrieve all usuarios from the database.
exports.findAll = (req, res) => {
  const usuario = req.query.usuario;
  
  var condition = usuario ? { usuario: { [Op.like]: `%${usuario}%` } } : null;

  usuarios.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuarios."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const usuario = req.body.usuario;
  const clave = req.body.clave;

  var condition = { usuario: { [Op.eq]: `${usuario}` },
                    clave: { [Op.eq]: `${clave}`}};

  usuarios.findAll({ where: condition })
    .then(data => {
      if(data.length > 0){
          res.send({token:123456});
      }else{
        res.status(401).send({
          message: "Usuario no existe"
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuarios."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const usuario = req.body.usuario;
  var condition = { usuario: { [Op.eq]: `${usuario}` },
                    usuario_id: { [Op.ne]: `${id}` }
                   };

    usuarios.findAll({ where: condition })
    .then(data => {
     
      if(data.length == 0){
        // Save Tutorial in the database
        usuarios.update(req.body, {
          where: { usuario_id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "usuarios was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update usuarios with id=${id}. Maybe usuarios was not found or req.body is empty!`
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
          message: "El usuario a ingresar ya existe!"
        });
        return;
      }
    })
  
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  usuarios.destroy({
    where: { usuario_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "usuarios was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete usuarios with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete usuarios with id=" + id
      });
    });
};

// Delete all usuarios from the database.
exports.deleteAll = (req, res) => {
  usuarios.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} usuarios were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all usuarios."
      });
    });
};

// Find all published usuarios
exports.findAllPublished = (req, res) => {
  usuarios.findAll({ where: { published: true } })
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