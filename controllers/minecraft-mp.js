const axios = require('axios');

const connection = require('../db.js');
const { minecraftMp } = require('../config.json');

exports.checkifvoted = async (req, res) => {
    axios.get(`https://minecraft-mp.com/api/?object=votes&element=claim&key=${minecraftMp[0].token}&username=${req.username}`)
        .then(response => {
            if (response.data == 0) {
                res.status(200).send({"status" : 0, "message" : 'User has not voted'})
            } else if (response.data == 1) {
                axios.get(` https://minecraft-mp.com/api/?action=post&object=votes&element=claim&key=${minecraftMp[0].token}&username=${req.username}`)
                    .then(response => {
                        if(response.data == 1) {
                            connection.query(`INSERT INTO votes (user, timestamp, ip, site) VALUES ('${req.username}','${Math.floor(Date.now() / 1000)}', '${req.ip}', '${req.site}')`, async function (err, result) {
                                if (err) {
                                    res.send({
                                        error: err
                                    })
                                }

                                //add rewards system here if you want
                                res.status(200).send({"status" : 1, "message" : "vote claimed"})
                            });
                        } else {
                            res.status(500).send("An error occurred");
                        }
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send("An error occurred");
                    });
            } else if (response.data == 2) {
                res.status(200).send({"status" : 2, "message" : "vote already claimed"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred");
        });
}

