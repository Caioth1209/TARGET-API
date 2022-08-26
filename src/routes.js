// routes -> arquivo de configuracao das rotas

const {Router} = require("express");

const routes = new Router();

const EmployeeController = require("./app/controllers/EmployeeController");

// rotas

routes.post("/create", EmployeeController.create);
routes.get("/", (req, res) => {
    return res.status(200).json({
        msg: "Chegou aqui"
    })
});


module.exports = routes;