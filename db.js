const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {
    //Criar tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
        );
    `) 

    //Deletar dados na tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [2], function(err){
    //     if (err) return console.log(err)

    //     console.log("Deletei", this)
    // })
  
})

module.exports = db