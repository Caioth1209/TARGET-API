const { mongoose } = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;

class DBConnection{

    constructor(){
        this.databaseConnection();
    }

    databaseConnection(){
        mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bwjpgyn.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(()=>{
            console.log("Conectou ao banco");
        })
        .catch((err)=>{
            console.log(err);
        });
    }
}

module.exports = new DBConnection();