const ContenedorFirebase = require("../contenedores/contenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor(){
        super("productos");
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

    async guardarProducto(_elemento){
        const elemento = await this.save(_elemento);
        return elemento;
    }

    async actualizarProducto(_elemento){
        const res = await this.updateById(_elemento);
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

module.exports = ProductosDaoFirebase;