module.exports = app => {
    const categorias = require("../controllers/categorias.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", categorias.create);
  
    // Retrieve all categorias
    router.get("/", categorias.findAll);
  
    // Retrieve all published categorias
    router.get("/published", categorias.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", categorias.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", categorias.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", categorias.delete);
  
    // Delete all categorias
    router.delete("/", categorias.deleteAll);
  
    app.use('/api/categorias', router);
  };