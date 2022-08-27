const Employee = require("../models/Employee");
const dolarApi = require("../../services/dolarApi");
const yup = require('yup');


class EmployeeController{
    
    async create(req,res){
       
        try {
            let employeeExist = await Employee.find(
                {id: req.body.id}
            ).exec();
    
            if (employeeExist.length>0) {
                return res.status(400).json({
                    error: true,
                    message: "Esse funcionário já existe!"
                })
            }
    
            let schema = yup.object().shape({
                id: yup.string().matches(/^\d+$/).required(),
                name: yup.string().required(),
                salary: yup.number().required(),
                age: yup.string().matches(/^\d+$/).required(),
                role: yup.string().required(),
                email: yup.string().email().required(),  
            });
    
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ 
                    error: true,
                    message: "Dados inválidos!"
                });
            }
    
            const {id, name, salary, age, role, email} = req.body;

            if (parseInt(age) < 18) {
                return res.status(400).json({ 
                    error: true,
                    message: "Idade inválida!"
                });
            }
    
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
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao atualizar! ${err}`
            })
        }

    }

    async showById(req,res){

        try {
            const id = req.params.id;

            Employee.findOne({
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

                data.salary = (data.salary * parseFloat(dolarValue)).toFixed(2);

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
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: `Erro ao buscar por id! ${err}`
            })
        }
    }

    async showAll(req,res){

        try {
            const dolarValue = await dolarApi.get("/")
            .then((res)=>{
                return res.data;
            })
            .then((data)=>{
                return data.USDBRL.bid;
            })

            Employee.find()
            .then((data) =>{
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        message: "Não existem funcionários cadastrados!"
                    })
                } 

                data.forEach((e)=>{
                    e.salary = (e.salary * parseFloat(dolarValue)).toFixed(2);
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
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao buscar! ${err}`
            })
        }
    
    }

    async update(req,res){

        try{

            if (Object.keys(req.body).length == 1) {
                return res.status(400).json({ 
                    error: true,
                    message: "É necessário pelo menos um campo além do id para atualizar!"
                });   
            }

            await Employee.find({id: req.body.id})
            .then((data) =>{
                if (data.length == 0) {
                    return res.status(400).json({
                        error: true,
                        message: "Erro ao tentar atualizar. Funcionário não existe!"
                    })
                } else {
                    return data[0];
                }
            })
            .catch((err)=>{
                return res.status(400).json({
                    error: true,
                    message: `Erro: ${err}`
                })
            });

            let schema = yup.object().shape({
                id: yup.string().matches(/^\d+$/).required(),
                name: yup.string(),
                salary: yup.number().min(1),
                age: yup.string().matches(/^\d+$/),
                role: yup.string(),
                email: yup.string().email(), 
            })

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ 
                    error: true,
                    message: "Dados inválidos!"
                });
            }

            const {id, name, salary, age, role, email} = req.body;

            if (parseInt(age) < 18) {
                return res.status(400).json({ 
                    error: true,
                    message: "Idade inválida!"
                });
            }

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

        } catch (err){
            return res.status(400).json({
                error: true,
                message: `Erro ao atualizar! ${err}`
            })
        }

    }

    async delete(req,res){

        const {id} = req.body;

        try {
    
            await Employee.find({id: id})
            .then(async (data) =>{

                if (data.length == 0) {

                    return res.status(400).json({
                        error: true,
                        message: "Erro ao tentar deletar. Funcionário não existe!"
                    })

                } else {
            
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
            })
            .catch((err)=>{
                return res.status(400).json({
                    error: true,
                    message: `Erro: ${err}`
                })
            });

                
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao remover! ${err}`
            })
        }
    }

}

module.exports = new EmployeeController();