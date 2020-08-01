const { con } = require('../DataBase/Connection.js')
module.exports = {
    ready : (Tico) => {
        con.query(`SELECT * FROM config WHERE ID = '1'`, (err, rows) => { 
            if(err) return console.log('\x1b[39m[Logs DB] \x1b[31mError: \x1b[33mNão achei a tabela (config) [Tico.db.Config]', "\x1b[37m")
            if (rows.length < 1) return;
            Tico.login(rows[0].Token)
            console.log('\x1b[39m[Logs Bot]\x1b[32m Sucesso: \x1b[33mToken conectada com Sucesso.', "\x1b[37m")
        }) 
    }
}
