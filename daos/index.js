let productosDao,
    carritosDao;


switch(process.env.MODO_PERSISTENCIA){
    case "firebase":
        const { default: ProductosDaosFirebase } = await import("./productosDaosFirebase");
        const { default: CarritosDaosFirebase } = await import("./carritosDaosFirebase");

        productosDao = new ProductosDaosFirebase();
        carritosDao = new CarritosDaosFirebase();
        break;

    case "mongodb":
        const { default: ProductosDaosMongo } = await import("./productosDaosMongoDB");
        const { default: CarritosDaosMongo } = await import("./carritosDaosMongoDB");

        productosDao = new ProductosDaosMongo();
        carritosDao = new CarritosDaosMongo();
        break;
    
    case "archivo":
        const { default: ProductosDaosArchivo } = await import("./productosDaosArchivo");
        const { default: CarritosDaosArchivo } = await import("./carritosDaosArchivo");

        productosDao = new ProductosDaosArchivo();
        carritosDao = new CarritosDaosArchivo();
        break;
}