const express = require("express");
require('dotenv').config();
const faker = require("faker");
const productosRoutes = require("./routes/productos");
const carritosRoutes = require("./routes/carrito");

const app = express();
const port = process.env.PORT || 8080;


/// Inicializacion de DAO's

const ProductosDaosFirebase = require("./daos/productosDaosFirebase");
const ProductosDaosMongo = require("./daos/productosDaosMongoDB");
const ProductosDaosArchivo = require("./daos/productosDaosArchivo");
const CarritosDaosFirebase = require("./daos/CarritosDaosFirebase");
const CarritosDaosMongo = require("./daos/carritosDaosMongoDB");
const CarritosDaosArchivo = require("./daos/carritosDaosArchivo");


const ContenedorFirebaseProductos = new ProductosDaosFirebase();
const ContenedorMongoProductos = new ProductosDaosMongo();
const ContenedorArchivoProductos = new ProductosDaosArchivo();
const ContenedorFirebaseCarritos = new CarritosDaosFirebase();
const ContenedorMongoCarritos = new CarritosDaosMongo();
const ContenedorArchivoCarritos = new CarritosDaosArchivo();

const ContenedorCarritosGenerico = require("./daos/index").carritosDao;
const ContenedorProductosGenerico = require("./daos/index").productosDao;



/// --- EJS config ---

app.set("views", "./views");
app.set("view engine", "ejs");

/// --- MiddleWares ---

app.use(express.urlencoded({extended: false}));
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritosRoutes);

/// --- Rutas ---

app.get("/", async (req, res) => {
    res.render("index", {seccion: "form"});

    
    const productoUpdateMongo = {
        id: "61afedce163c1bd7f845cad2",
        title: "producto nuevooo update",
        price: 350
    }

    const productoNuevo = {
        id: 5,
        title: "producto nuevooo2",
        price: 350
    }

    const productoUpdateFirebase = {
        id: "mVS68FU0AETX1nUyNxpB",
        title: "producto nuevooo3",
        price: 500
    }

    const carritoNuevo = {
        id: 40,
        products: [
            {
                id: 1,
                title: "prod X",
                description: "esta es una descripcion",
                SKU: "PRODX",
                thumbnail: "www.aaa.com",
                precio: 10330,
                stock: 4
            },
            {
                id: 2,
                title: "prod yyyy"
            }
        ]
    }

    const carritoUpdateFirebase = {
        id: "26sl1j9QqrKJwfRAGF55",
        products: [
            {
                id: 1,
                title: "prod X",
                description: "esta es una descripcion",
                SKU: "PRODX",
                thumbnail: "www.aaa.com",
                precio: 10330,
                stock: 4
            },
            {
                id: 2,
                title: "prod yyyy"
            }
        ]
    }

    const carritoUpdateMongo = {
        id: "61b95cd8338b2206980f0e05",
        products: [
            {
                id: 1,
                title: "prod X",
                description: "esta es una descripcion",
                SKU: "PRODX",
                thumbnail: "www.bbb.com",
                precio: 100,
                stock: 4
            },
            {
                id: 2,
                title: "prod yyyy"
            }
        ]
    }

    
    
    let respuesta;
    respuesta = await ContenedorProductosGenerico.listarProductos();


    console.log(respuesta)
    

    return respuesta;
});

///esta ruta accede a la DB
app.get("/productos", async (req, res) => {
    const productos = await ContenedorProductosGenerico.listarProductos();
    res.render("index", {seccion: "productos", data: productos});
});


///esta ruta es de productos mock
app.get("/productos-test", async (req, res) => {
    const productos = [];
    for(let i = 0; i < 5; i++){
        productos.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.random.image(),
        })
    }
    console.log(productos)

    // const productos = await ContenedorProd.getAll();
    res.render("index", {seccion: "productos", data: productos});
});

/// --- Inicio del server

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
})