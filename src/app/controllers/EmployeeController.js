const Employee = require("../models/Employee");

// depois procurar api de cotação
const cotacaoDolarReal = 5.09;

class EmployeeController{

    async create(req,res){
        const {id, name, salary, age, role, email} = req.body;

        // let employeeExist = await Employee.findOne({
        //     id: id
        // });

        // if (employeeExist) {
        //     return res.status(400).json({
        //         msg: "Funcionário já existe!"
        //     })
        // }

        const data = {id, name, salary, age, role, email};

        await Employee.create(data, (err)=>{
            if (err) {
                return res.status(400).json({ 
                    error: true,
                    message: `Erro ao tentar inserir funcionário no banco! ${err}`
                });
            }

            return res.status(200).json({
                error: false,
                message: "Funcionário cadastrado com sucesso!"
            })
        })
    }

    // precisa retornar o salário em real
    async showById(req,res){

    }

    // precisa retornar o salário em real
    async showAll(req,res){

    }

    async update(req,res){

    }

    async delete(req,res){

    }
}

module.exports = new EmployeeController();