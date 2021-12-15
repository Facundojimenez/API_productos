const ContenedorArchivo = require("../contenedores/contenedorArchivo");

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(){
        super(__dirname + "/archivos/carritos.json");
    }

    async listarCarritos(){
        const carritos = await this.getAll();
        return carritos;
    }

    async obtenerCarritoPorId(_id){
        const carritos = await this.getById(_id);
        return carritos
    }

    async guardarCarrito(_carrito){
        const carrito = await this.save(_carrito);
        return carrito;
    }

    async actualizarCarrito(_carrito){
        const res = await this.updateById(_carrito);
        return res;
    }

    async eliminarCarritoPorId(_id){
        const res = await this.deleteById(_id);
        return res;
    }

    async eliminarTodosLosProductos(){
        const res = await this.deleteAll();
        return res;
    }
}

module.exports = CarritosDaoArchivo;