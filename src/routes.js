// routes -> arquivo de configuracao das rotas

const {Router} = require("express");

const routes = new Router();

const EmployeeController = require("./app/controllers/EmployeeController");

// rotas

// rota para criar um funcionario
routes.post("/create", EmployeeController.create);

// rota para atualizar as informacoes de um funcionario
routes.post("/update", EmployeeController.update);

// rota para apagar as informacoes de um funcionario
routes.post("/delete", EmployeeController.delete);

// rota para buscar as informacoes de todos os funcionarios
routes.get("/showAll", EmployeeController.showAll);

// rota para buscar as informacoes de um funcionario
routes.get("/showById/:id", EmployeeController.showById);


module.exports = routes;