# TARGET-API

## Requisitos:

- Para esse projeto é necessário instalar o node versão 16 - https://nodejs.org/en/download/

## Dependências:

- Axios
- Cors
- Express
- Mongoose
- Nodemon
- Yup

## Para executar o programa:


### Instalar todas as dependências:
- 'npm install'

### Colocar a api no ar:
- 'npm start'

### Comandos importantes:

#### Para realizar um cadastro de funcionário:

    - curl -d '{"id": "id", "name": "name", "salary": salary , "age":"age", "role":"role", "email": "email"}' -H "Content-Type: application/json" -X POST http://localhost:8080/create

- "id" em string, mas só aceita números dentro dela como identidade.
- "name" em string.
- "salary" em number para facilitar a conversão para real na hora de buscar os funcionários.
- "age" em string, mas só aceita números nela.
- "role" em string.
- "email" em string.

#### Para realizar uma atualização nas informações de um funcionário:

    - curl -d '{"id": "id", "name": "name", "salary": salary , "age":"age", "role":"role", "email": "email"}' -H "Content-Type: application/json" -X POST http://localhost:8080/update

- O "id" será a chave para atualizar. É necessário passar o mesmo "id" de cadastro.
- "id" em string, mas só aceita números dentro dela como identidade.
- Não precisa enviar todos os campos. Basta escolher o id e os campos que você quer atualizar.
- "name" em string.
- "salary" em number para facilitar a conversão para real na hora de buscar os funcionários.
- "age" em string, mas só aceita números nela.
- "role" em string.
- "email" em string.

#### Para realizar a busca de um funcionário pelo id:

    - curl http://localhost:8080/showById/id
- O id será a chave para buscar na url. É necessário passar o mesmo id de cadastro.
- Retorna todas as informações do funcionário com o salário em real.

#### Para realizar a busca de todos os funcionários:

    - curl http://localhost:8080/showAll
- Retorna todas os funcionários com as respectivas informações e com o salário em real.

#### Para realizar a deleção de um funcionário pelo id:
    - curl -d '{"id": "id"}' -H "Content-Type: application/json" -X POST http://localhost:8080/delete
- O id será a chave para a deleção. É necessário passar o mesmo id de cadastro.

## Decisões tomadas:

- No problema não especificava a forma das operações serem executadas, então usei uma API Rest.
- Utilizei o MongoDB em Cloud para guardar os dados ao invés de deixar na memória.
- Optei por utilizar o Axios para fazer a busca de cotação do dólar na Api "Awesome API".
- Utilizei o framework Express para ajudar na construção do servidor
- Utilizei o Nodemon para me ajudar no desenvolvimento do projeto.
- Utilizei o Yup para me ajudar no tratamento de dados na hora do cadastro e atualização de dados.
- Deixei a conexão do banco de dados aberta para quem quiser testar a api.