const express = require("express");
const {Router} = express;
const Contenedor = require("../contenedor")
const router = Router();

const ContenedorProd = new Contenedor("./productos.json");
router.use(express.json());

///Devuelve todos los productos
router.get("/", async (req, res) => {
    const productos = await ContenedorProd.getAll();
    res.json(productos);
})


///Guarda un productos y retorna su ID
router.post("/", async (req, res) => {
    if(!req.query || req.query.admin !== "true"){
        const errorMsj = {
            status: 403,
            error: "No tiene permisos para ejecutar el método PUT /api/productos/:id"
        }
        res.json(errorMsj);
        return;
    }

    const productoSave = {
        ...req.body,
        price: parseInt(req.body.price),
        timestamp: Date.now()
    }
    if(!productoSave.thumbnail){
        productoSave.thumbnail = "https://justmockup.com/wp-content/uploads/edd/2019/08/box-packaging-mockup-free-download.jpg"
    }
    
    console.log(productoSave)
    const id = await ContenedorProd.save(productoSave);
    res.json({id});
})

router.put("/:id", async (req, res) => {
    if(!req.query || req.query.admin !== "true"){
        const errorMsj = {
            status: 403,
            error: "No tiene permisos para ejecutar el método PUT /api/productos/:id"
        }
        res.json(errorMsj);
        return;
    }

    const id = parseInt(req.params.id);
    const productoUpdate = {
        id: id,
        ...req.body
    }
    const respuesta = await ContenedorProd.updateById(productoUpdate);
    res.json(respuesta);
})

router.delete("/:id", async (req, res) =>{
    if(!req.query || req.query.admin !== "true"){
        const errorMsj = {
            status: 403,
            error: "No tiene permisos para ejecutar el método DELETE /api/productos/:id"
        }
        res.json(errorMsj)
        return;
    }
    console.log(req.query)

    const id = parseInt(req.params.id);
    const respuesta = await ContenedorProd.deleteById(id);
    res.json(respuesta);
})

///Devuelve un producto por ID 
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await ContenedorProd.getById(id);
    res.json(producto);
})

///RUTA GET POR DEFAULT
router.get('*',  (req, res) => {
    res.send({
        status: 404,
        mensaje: `El método GET ${req.path} no está implementado`
    })
});

module.exports = router;