module.exports = app => {
    const productos = require("../controllers/productos.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", productos.create);
  
    // Retrieve all categorias
    router.get("/", productos.findAll);
  
    // Retrieve all published categorias
    router.get("/published", productos.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", productos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", productos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", productos.delete);
  
    // Delete all categorias
    router.delete("/", productos.deleteAll);
  
    app.use('/api/productos', router);
  };