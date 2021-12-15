const express = require("express");
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
        title: "producto nuevooo update",
        price: 350,
        id: "61afedce163c1bd7f845cad2"
    }

    const productoNuevo = {
        title: "producto nuevooo2",
        price: 350,
        id: 5
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
                precio: 100,
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

    //test del DAO de mongoDB

    // respuesta = await ContenedorMongoCarritos.listarCarritos();
    // respuesta = await ContenedorMongoProductos.listarProductos();
    
    // respuesta = await ContenedorMongoCarritos.obtenerCarritoPorId("61af7259cd8ba257bf1570a1");
    // respuesta = await ContenedorMongoProductos.obtenerProductoPorId("61afedc9163c1bd7f845cac0");
    
    // respuesta = await ContenedorMongoCarritos.guardarCarrito(carritoNuevo);
    // respuesta = await ContenedorMongoProductos.guardarProducto(productoNuevo);
    
    // respuesta = await ContenedorMongoCarritos.guardarCarrito(carritoUpdateMongo);
    // respuesta = await ContenedorMongoProductos.actualizarProducto(productoUpdateMongo);
    
    // respuesta = await ContenedorMongoCarritos.eliminarCarritoPorId("61af7259cd8ba257bf1570a1");
    // respuesta = await ContenedorMongoProductos.eliminarProductoPorId("61afedc9163c1bd7f845cac0");
    

    //tests del DAO de productos

    // respuesta = await ContenedorArchivoCarritos.listarCarritos();
    // respuesta = await ContenedorArchivoProductos.listarProductos();
    
    // respuesta = await ContenedorArchivoCarritos.obtenerCarritoPorId(2);
    // respuesta = await ContenedorArchivoProductos.obtenerProductoPorId(20);
    
    // respuesta = await ContenedorArchivoCarritos.guardarCarrito(carritoNuevo);
    // respuesta = await ContenedorArchivoProductos.guardarProducto(productoNuevo);
    
    // respuesta = await ContenedorArchivoCarritos.actualizarCarrito(carritoNuevo);
    // respuesta = await ContenedorArchivoProductos.actualizarProducto(productoNuevo);
    
    // respuesta = await ContenedorArchivoCarritos.eliminarCarritoPorId(6);
    // respuesta = await ContenedorArchivoProductos.eliminarProductoPorId(41);


    console.log(respuesta)
    

    return respuesta;
});

app.get("/productos", async (req, res) => {
    const productos = await ContenedorProd.getAll();
    res.render("index", {seccion: "productos", data: productos});
});


/// --- Inicio del server

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
})