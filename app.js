const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const EXPRESS_PORT = config.get("EXPRESS_PORT");

const app = express();

app.use('/api/auth', require("./routes/auth.route"));

async function start() {
    try {
        await mongoose.connect(config.get("MongoURL"), {

        })
        app.listen(EXPRESS_PORT, () => { console.log(`Express start listen port ${EXPRESS_PORT}...`); });
    } catch (error) {
        console.log('Mongoose error', error.message);
        process.exit(1);
    }
}

start();