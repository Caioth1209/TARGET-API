const Employee = require("../models/Employee");
const dolarApi = require("../../services/dolarApi")

class EmployeeController{

    async create(req,res){
       
        let employeeExist = await Employee.find(
            {id: req.body.id}
        ).exec();

        if (employeeExist.length>0) {
            return res.status(400).json({
                error: true,
                message: "Esse funcionário já existe!"
            })
        }

        const {id, name, salary, age, role, email} = req.body;

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

        const id = req.params.id;

        await Employee.findOne({
            id: id
        })
        .then(async (data) =>{
            if (data == null) {
                return res.status(200).json({
                    error: false,
                    message: "Esse funcionário não existe!"
                })
            } 

            const dolarValue = await dolarApi.get("/")
            .then((res)=>{
                return res.data;
            })
            .then((data)=>{
                return data.USDBRL.bid;
            })

            data.salary = (parseInt(data.salary) * parseInt(dolarValue)).toFixed(2).toString()

            return res.status(200).json({
                error: false,
                funcionario: data
            })
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: `Erro: ${err}`
            })
        });
    }

    // precisa retornar o salário em real
    async showAll(req,res){

        const dolarValue = await dolarApi.get("/")
        .then((res)=>{
            return res.data;
        })
        .then((data)=>{
            return data.USDBRL.bid;
        })

        await Employee.find()
        .then((data) =>{
            if (data.length == 0) {
                return res.status(200).json({
                    error: false,
                    message: "Não existem funcionários cadastrados!"
                })
            } 

            data.forEach((e)=>{
                e.salary = (parseInt(e.salary) * parseInt(dolarValue)).toFixed(2).toString();
            })

            return res.status(200).json({
                error: false,
                funcionarios: data
            })
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: `Erro: ${err}`
            })
        });
    }

    async update(req,res){
       
        await Employee.find({id: req.body.id})
        .then((data) =>{
            if (data.length == 0) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar atualizar. Funcionário não existe!"
                })
            }
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: `Erro: ${err}`
            })
        });

        const {id, name, salary, age, role, email} = req.body;

        const data = {id, name, salary, age, role, email};

        await Employee.findOneAndUpdate({id: id}, data)
        .then(()=>{
            return res.status(200).json({
                error: false,
                message: "Funcionário atualizado com sucesso!",
            }) 
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: err.message
            })
        })

    }

    async delete(req,res){

        await Employee.find({id: req.body.id})
        .then((data) =>{
            if (data.length == 0) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar deletar. Funcionário não existe!"
                })
            }
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: `Erro: ${err}`
            })
        });

        const {id} = req.body;

        await Employee.deleteOne({id: id})
        .then(()=>{
            return res.status(200).json({
                error: false,
                message: "Funcionário deletado com sucesso!",
            }) 
        })
        .catch((err)=>{
            return res.status(400).json({
                error: true,
                message: err.message
            })
        })
    }
}

module.exports = new EmployeeController();