let productosDao,
    carritosDao;


const ProductosDaosFirebase = require("./productosDaosFirebase");
const CarritosDaosFirebase = require("./carritosDaosFirebase");
const ProductosDaosMongoDB = require("./productosDaosMongoDB");
const CarritosDaosMongoDB = require("./carritosDaosMongoDB");
const ProductosDaosArchivo = require("./productosDaosArchivo");
const CarritosDaosArchivo = require("./carritosDaosArchivo");

console.log("modo: " + process.env.MODO_PERSISTENCIA)

switch(process.env.MODO_PERSISTENCIA){
    case "firebase":
        
        productosDao = new ProductosDaosFirebase();
        carritosDao = new CarritosDaosFirebase();

        break;

    case "mongodb":

        productosDao = new ProductosDaosMongoDB();
        carritosDao = new CarritosDaosMongoDB();
        break;
    
    case "archivo":

        productosDao = new ProductosDaosArchivo();
        carritosDao = new CarritosDaosArchivo();
        break;
}


module.exports = { 
    productosDao,
    carritosDao
}
