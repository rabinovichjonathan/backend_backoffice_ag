module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", usuarios.create);
  
    // Retrieve all usuarios
    router.get("/", usuarios.findAll);
  
    // Retrieve all published usuarios
    router.get("/published", usuarios.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.post("/login", usuarios.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", usuarios.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", usuarios.delete);
  
    // Delete all usuarios
    router.delete("/", usuarios.deleteAll);
  
    app.use('/api/usuarios', router);
  };