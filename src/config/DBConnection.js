const { mongoose } = require("mongoose");
const {DB_USER, DB_PASSWORD} = require("./DBInfo");

class DBConnection{

    constructor(){
        this.databaseConnection();
    }

    databaseConnection(){
        this.dbConnection = mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bwjpgyn.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true, 
            }
        )
        .then(()=>{
            console.log("\n\nConexão estabelecida com o mongo db!");
        })
        .catch((err)=>{
            console.log("\nErro ao estabelecer conexão com o mongo db: " + err);
        });
    }
}

module.exports = new DBConnection();