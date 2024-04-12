const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3002;
const mongo = require('./mongodb-helper/mongodb');
const {scheduleMailsForToday, scheduleCronJob} =require('./mailer/scheduler')



app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(port, async () => {
    setRoutes();
    await mongo.connectToMongoDb();
    await scheduleCronJob(async function(){await scheduleMailsForToday()}, '20 9 * * *')
});

function setRoutes() {
    fs.readdir('./routes',
        (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    const fileName = file.substring(0, file.length - 3);
                    const route = require(`./routes/${fileName}`);
                    app.use(`/${fileName}`, route);
                })
            }
        })
}
