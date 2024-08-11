const express = require('express');
const app = express();
const axios = require('axios');
const connection = require("./db.js");

const serveurPrive = require("./controllers/serveur-prive.js")
const minecraftMp = require('./controllers/minecraft-mp.js')

app.use(express.json());

app.post(`/control/vote`, async (req, res) => {

    const site = req.body.site;

    if (!req.body.ip) {
        return res.status(404).send({ "error": "Missing IP" })
    }

    if (!req.body.site) {
        return res.status(404).send({ "error": "Missing Site" })
    }

    if (!req.body.username) {
        return res.status(404).send({ "error": "Missing Username" })
    }

    switch (site) {
        case 'serveur-prive':
            serveurPrive.checkifvoted(req.body, res);
            break;
        case 'minecraft-mp':
            minecraftMp.checkifvoted(req.body, res);
            break;
        default:
            res.status(404).send("Site not found");
    }
})

app.listen(3000, () => console.log("Listening on port 3000"));

test()