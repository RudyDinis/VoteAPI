const axios = require('axios');

const connection = require('../db.js');
const { serverPrive } = require('../config.json');


exports.checkifvoted = async (req, res) => {

    axios.get(`https://serveur-prive.net/api/vote/json/${serverPrive[0].token}/${req.ip}`).then(response => {
        if (response.data.status == 0) {
            res.status(200).send({"status" : 0, "message" : 'User has not voted'})
        } else {
            connection.query(`SELECT * FROM votes WHERE ip = '${req.ip}' AND timestamp = '${response.data.vote}' AND site = '${req.site}'`, async function (err, rows) {
                if (rows.length) {
                    res.status(200).send({"status" : 2, "message" : "vote already claimed"})
                } else {
                    connection.query(`INSERT INTO votes (user, timestamp, ip, site) VALUES ('${response.data.pseudo}','${response.data.vote}', '${req.ip}', '${req.site}')`, async function (err, result) {
                        if (err) {
                            res.send({
                                error: err
                            })
                        }


                        //add rewards system here if you want
                        res.status(200).send({"status" : 1, "message" : "vote claimed"})
                    });
                }
            })
        }
    }).catch(error => {
        res.send(error)
    });
}