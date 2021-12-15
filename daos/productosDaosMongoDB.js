const ContenedorMongo = require("../contenedores/contenedorMongo");
const ProductModel = require("../models/productModel");


class ProductosDaoMongo extends ContenedorMongo {

    constructor(){
        super(ProductModel);
    }


    async listarProductos(){
        const productos = await this.getAll();
        console.log(productos);
        return productos;
    }

    async obtenerProductoPorId(_id){
        const productos = await this.getById(_id);
        return productos;
    }

    async guardarProducto(_producto){

        const productoMongo = new ProductModel({
            ..._producto
        }) 

        const producto = await this.save(productoMongo);
        return producto;
    }

    async actualizarProducto(_producto){
        const res = await this.updateById(_producto);
        return res;
    }

    async eliminarProductoPorId(_id){
        const res = await this.deleteById(_id);
        return res;
    }

    async eliminarTodosLosProductos(){
        const res = await this.deleteAll();
        return res;
    }

}

module.exports = ProductosDaoMongo;