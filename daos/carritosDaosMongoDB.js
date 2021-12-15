const ContenedorMongo = require("../contenedores/contenedorMongo");
const CartModel = require("../models/cartModel");


class CarritosDaoMongo extends ContenedorMongo {

    constructor(){
        super(CartModel);
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
        const carritoMongo = new CartModel({
            ..._carrito
        }) 

        const carrito = await this.save(carritoMongo);
        return carrito;
    }

    async actualizarCarrito(_carrito){
        const res = await this.updateById(_carrito.id, _carrito);
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

module.exports = CarritosDaoMongo;