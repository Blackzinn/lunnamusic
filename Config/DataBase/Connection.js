const mysql = require('mysql')
const conexão = require('./Config.json');
const con = mysql.createConnection(conexão);
con.connect(err => {
    if(err) throw err;
    console.log('\x1b[39m[Logs DB] \x1b[32mSucesso: \x1b[33mBanco de dados conectado com Sucesso.',"\x1b[37m")
});
handleDisconnect(con);

function handleDisconnect(con) {
    con.on('error', function (error) {
        
        if (!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw error;

        console.log('\x1b[39m[Logs DB] \x1b[35mAviso: \x1b[33mPingando MySQL...',"\x1b[37m")

        con = mysql.createConnection(conexão)
        handleDisconnect(con)
        con.connect();
    })
}


module.exports = {
    con: con
}