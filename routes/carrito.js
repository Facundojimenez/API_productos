const express = require("express");
const {Router} = express;
const Contenedor = require("../contenedor");
const router = Router();

router.use(express.json());
const ContenedorCarrito = new Contenedor("./carritos.json");
const ContenedorProd = new Contenedor("./productos.json");

router.post("/", async (req, res) => {
    const carritoSave = {
        timestamp: Date.now(),
        productos: req.body.productos
    }
    const id = await ContenedorCarrito.save(carritoSave);
    res.json({id});
})

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const respuesta = await ContenedorCarrito.deleteById(id);
    res.json(respuesta)
})

router.get("/:id/productos", async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito = await ContenedorCarrito.getById(id);
    if(!carrito){
        res.json({ 
            status: 404,
            mensaje: "No se encontró el carrito"
        })
        return;
    }
    res.json(carrito.productos);
})

router.post("/:id/productos", async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProductoElim = parseInt(req.body.id);
    
    const carrito = await ContenedorCarrito.getById(idCarrito);
    const producto = await ContenedorProd.getById(idProductoElim);
    if(!carrito){
        res.json({ 
            status: 404,
            mensaje: "No se encontró el carrito"
        })
        return;
    }
    if(!producto){
        res.json({ 
            status: 404,
            mensaje: "No se encontró el producto"
        })
        return;
    }



    carrito.productos.push(producto);
    await ContenedorCarrito.updateById(carrito);
    res.json({
        status: 200,
        mensaje: "carrito actualizado",
        carrito: {
            ...carrito
        }
    })

})

router.delete("/:id/productos/:id_prod", async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProductoElim = parseInt(req.params.id_prod);
    const carrito = await ContenedorCarrito.getById(idCarrito);

    if(!carrito){
        res.json({ 
            status: 404,
            mensaje: "No se encontró el carrito"
        })
        return;
    }

    carrito.productos = carrito.productos.filter(producto => producto.id !== idProductoElim)
    await ContenedorCarrito.updateById(carrito);
    res.json({
        status: 200,
        mensaje: "carrito actualizado",
        carrito: {
            ...carrito
        }
    })

})

///RUTA GET POR DEFAULT
router.get('*',  (req, res) => {
    res.send({
        status: 404,
        mensaje: `El método GET ${req.path} no está implementado`
    })
});


module.exports = router;