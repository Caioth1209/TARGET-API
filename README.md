# TARGET-API

## <span style="background-color: white; color: black; padding: 5px">Requisitos:</span>

- Para esse projeto é necessário instalar o node versão 16 - https://nodejs.org/en/download/

## <span style="background-color: white; color: black; padding: 5px">Dependências:</span>

- Axios
- Cors
- Express
- Mongoose
- Nodemon
- Yup

## <span style="background-color: white; color: black; padding: 5px">Para executar o programa:</span>


### <span style="background-color: yellow; color: black; padding: 5px">Instalar todas as dependências:</span>
- 'npm install'

### <span style="background-color: yellow; color: black; padding: 5px">Colocar a api no ar:</span>
- 'npm start'

### <span style="background-color: yellow; color: black; padding: 5px">Comandos importantes:</span>

#### <span style="background-color: green; color: white; padding: 5px">Para realizar um cadastro de funcionário:</span>

    - curl -d '{"id": "id", "name": "name", "salary": salary , "age":"age", "role":"role", "email": "email"}' -H "Content-Type: application/json" -X POST http://localhost:8080/create

- "id" em string, mas só aceita números dentro dela como identidade.
- "name" em string.
- "salary" em number para facilitar a conversão para real na hora de buscar os funcionários.
- "age" em string, mas só aceita números nela.
- "role" em string.
- "email" em string.

#### <span style="background-color: green; color: white; padding: 5px">Para realizar uma atualização nas informações de um funcionário:</span>

    - curl -d '{"id": "id", "name": "name", "salary": salary , "age":"age", "role":"role", "email": "email"}' -H "Content-Type: application/json" -X POST http://localhost:8080/update

- O "id" será a chave para atualizar. É necessário passar o mesmo "id" de cadastro.
- "id" em string, mas só aceita números dentro dela como identidade.
- <span style="background-color: white; color: black; padding: 5px">Não precisa enviar todos os campos. Basta escolher o id e os campos que você quer atualizar.</span>
- "name" em string.
- "salary" em number para facilitar a conversão para real na hora de buscar os funcionários.
- "age" em string, mas só aceita números nela.
- "role" em string.
- "email" em string.

#### <span style="background-color: green; color: white; padding: 5px">Para realizar a busca de um funcionário pelo id:</span>

    - curl http://localhost:8080/showById/id
- O id será a chave para buscar na url. É necessário passar o mesmo id de cadastro.
- Retorna todas as informações do funcionário com o salário em real.

#### <span style="background-color: green; color: white; padding: 5px">Para realizar a busca de todos os funcionários:</span>

    - curl http://localhost:8080/showAll
- Retorna todas os funcionários com as respectivas informações e com o salário em real.

#### <span style="background-color: green; color: white; padding: 5px">Para realizar a deleção de um funcionário pelo id:</span>
    - curl -d '{"id": "id"}' -H "Content-Type: application/json" -X POST http://localhost:8080/delete
- O id será a chave para a deleção. É necessário passar o mesmo id de cadastro.

## Decisões tomadas:

- No problema não especificava a forma das operações serem executadas, então usei uma <span style="color: yellow;">API Rest</span>.
- Utilizei o <span style="color: yellow;">MongoDB em Cloud</span> para guardar os dados ao invés de deixar na memória.
- Optei por utilizar o <span style="color: yellow;">Axios</span> para fazer a busca de cotação do dólar na Api "Awesome API".
- Utilizei o framework <span style="color: yellow;">Express</span> para ajudar na construção do servidor
- Utilizei o <span style="color: yellow;">Nodemon</span> para me ajudar no desenvolvimento do projeto.
- Utilizei o <span style="color: yellow;">Yup</span> para me ajudar no tratamento de dados na hora do cadastro e atualização de dados.
- Deixei a <span style="color: yellow;">conexão do banco de dados aberta</span> para quem quiser testar a api.