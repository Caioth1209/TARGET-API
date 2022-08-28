const Employee = require("../models/Employee");
const dolarApi = require("../../services/dolarApi");
const yup = require('yup');


class EmployeeController{
    
    async create(req,res){
       
        try {
            
            // verifica se o funcionario existe
            let employeeExist = await Employee.find(
                {id: req.body.id}
            ).exec();
    
            if (employeeExist.length>0) {
                return res.status(400).json({
                    error: true,
                    message: "Esse funcionário já existe!"
                })
            }
            //////////////////////////////
    
            // validacao dos campos
            let schema = yup.object().shape({
                id: yup.string().matches(/^\d+$/).required(),
                name: yup.string().required(),
                salary: yup.number().required(),
                age: yup.number().required(),
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

            if (salary < 1) {
                return res.status(400).json({ 
                    error: true,
                    message: "Salário inválido! O funcionário não vai trabalhar de graça!"
                });
            }

            if (age < 18) {
                return res.status(400).json({ 
                    error: true,
                    message: "Idade inválida!"
                });
            }
            //////////////////////
    

            // cadastro do funcionario
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
            ///////////////////////
            
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: `Erro ao atualizar! ${err}`
            })
        }

    }

    async showById(req,res){

        try {
            // pega o parametro que passou pela url
            const id = req.params.id;

            // verifica se o funcionario existe
            await Employee.find(
                {id: id}
            )
            .then(async (data)=>{
                if (data.length==0) {
                    return res.status(400).json({
                        error: true,
                        message: "Esse funcionário não existe!"
                    })
                }
    
                // busca na api de dolar o valor atual
                const dolarValue = await dolarApi.get("/")
                .then((res)=>{
                    return res.data;
                })
                .then((data)=>{
                    return data.USDBRL.bid;
                })
                .catch((err)=>{
                    return res.status(400).json({
                        error: true,
                        message: `Erro ao buscar cotação: ${err}!`
                    })
                })
                /////////////////////////
    
                // converte o salario do funcionario para real
                data[0].salary = (data[0].salary * parseFloat(dolarValue)).toFixed(2);
    
                // retorna o funcionario com o salario atualizado
                return res.status(200).json({
                    error: false,
                    funcionario: data[0],
                })
    
            })
            .catch((err) =>{
                // possível erro no banco
                return res.status(400).json({
                    error: true,
                    message: `Erro: ${err}`
                })
            });

        } catch (err) {
            // algum erro inesperado
            return res.status(400).json({
                error: true,
                message: `Erro ao buscar por id! ${err}`
            })
        }
    }

    async showAll(req,res){

        try {

            // busca na api de dolar o valor atual
            const dolarValue = await dolarApi.get("/")
            .then((res)=>{
                return res.data;
            })
            .then((data)=>{
                return data.USDBRL.bid;
            })
            .catch((err)=>{
                return res.status(400).json({
                    error: true,
                    message: `Erro ao buscar cotação: ${err}!`
                })
            })
            

            // faz uma busca geral no banco de funcionarios
            Employee.find()
            .then((data) =>{

                // checa se a lista ta vazia
                if (data.length == 0) {
                    return res.status(200).json({
                        error: false,
                        message: "Não existem funcionários cadastrados!"
                    })
                } 

                // se nao tiver vazia, faz a conversao do salario da lista inteira
                data.forEach((e)=>{
                    e.salary = (e.salary * parseFloat(dolarValue)).toFixed(2);
                })

                // retorna todos os funcionarios
                return res.status(200).json({
                    error: false,
                    funcionarios: data
                })
            })
            .catch((err)=>{
                // possível erro no banco
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

            // verifica se só tem o id no body da requisicao
            // o funcionario só pode ser atualizado se passar o id e mais algum campo
            if (Object.keys(req.body).length == 1) {
                return res.status(400).json({ 
                    error: true,
                    message: "É necessário pelo menos um campo além do id para atualizar!"
                });   
            }

            // faz uma busca no banco de funcionarios
            // para ver se o id realmente existe
            await Employee.find({id: req.body.id})
            .then((data) =>{

                // se nao existir, retorna que o funcionario nao existe
                if (data.length == 0) {
                    return res.status(400).json({
                        error: true,
                        message: "Erro ao tentar atualizar. Funcionário não existe!"
                    })
                } else {
                    // retorna o funcionario
                    return data[0];
                }
            })
            .catch((err)=>{
                // possivel erro no banco
                return res.status(400).json({
                    error: true,
                    message: `Erro: ${err}`
                })
            });

            // validacao dos campos
            let schema = yup.object().shape({
                id: yup.string().matches(/^\d+$/).required(),
                name: yup.string(),
                salary: yup.number(),
                age: yup.number(),
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

            if (salary < 1) {
                return res.status(400).json({ 
                    error: true,
                    message: "Salário inválido! O funcionário não vai trabalhar de graça!"
                });
            }

            if (age < 18) {
                return res.status(400).json({ 
                    error: true,
                    message: "Idade inválida!"
                });
            }
            ///////////////////

            // estrutura os campos em um objeto e atualiza
            const data = {id, name, salary, age, role, email};

            await Employee.findOneAndUpdate({id: id}, data)
            .then(()=>{
                return res.status(200).json({
                    error: false,
                    message: "Funcionário atualizado com sucesso!",
                }) 
            })
            .catch((err)=>{
                // possível erro no banco
                return res.status(400).json({
                    error: true,
                    message: err.message
                })
            })

        } catch (err){
            // erro inesperado
            return res.status(400).json({
                error: true,
                message: `Erro ao atualizar! ${err}`
            })
        }

    }

    async delete(req,res){

        try {
            const id = req.body.id;
    
            // verifica se o funcionario existe
            await Employee.find({id: id})
            .then(async (data) =>{

                // se nao exsitir, retorna que o funcionario nao existe
                if (data.length == 0) {

                    return res.status(400).json({
                        error: true,
                        message: "Erro ao tentar deletar. Funcionário não existe!"
                    })

                } else {
            
                    // delecao de funcionario pelo id
                    await Employee.deleteOne({id: id})
                    .then(()=>{
                        return res.status(200).json({
                            error: false,
                            message: "Funcionário deletado com sucesso!",
                        }) 
                    })
                    .catch((err)=>{
                        // possível erro no banco
                        return res.status(400).json({
                            error: true,
                            message: err
                        })
                    })
                }
            })
            .catch((err)=>{
                // erro inesperado
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