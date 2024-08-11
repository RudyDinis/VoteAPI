var mysql = require('mysql');
const config = require('./config.json')

var dbinfos = {
    host: config.dataBase[0].host,
    user: config.dataBase[0].user,
    password: config.dataBase[0].password,
    database: config.dataBase[0].database
};

function handleDisconnect() {
    console.log("Connexion à la bdd")
    connection = mysql.createConnection(dbinfos);


    connection.connect(function onConnect(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            console.log('**Erreur connexion Mysql**', 'quelque chose s\'est mal passé', err.message)

            setTimeout(handleDisconnect, 10000);
        } else { 

        }
    });

    connection.on('error', function onError(err) {

        if (err.code == 'PROTOCOL_CONNECTION_LOST' || err.code == 'ECONNRESET' ) {
            handleDisconnect();
        } else { 

        }
    });
}
handleDisconnect();

module.exports = connection