const express = require("express");

const productosRoutes = require("./routes/productos");
const carritosRoutes = require("./routes/carrito");
const Contenedor = require("./contenedor")


const ContenedorProd = new Contenedor("./productos.txt");
const app = express();
const port = process.env.PORT || 8080;

/// --- Handlebars config ---

app.set("views", "./views");
app.set("view engine", "ejs");

/// --- MiddleWares ---

app.use(express.urlencoded({extended: false}));
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritosRoutes);

/// --- Rutas ---

app.get("/", (req, res) => {
    res.render("index", {seccion: "form"});
});

app.get("/productos", async (req, res) => {
    const productos = await ContenedorProd.getAll();
    res.render("index", {seccion: "productos", data: productos});
});


/// --- Inicio del server

app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
})