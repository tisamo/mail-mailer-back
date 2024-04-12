const mongoose = require('mongoose');
require('dotenv').config()

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

module.exports = {
    connectToMongoDb,
}

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

async function connectToMongoDb() {
    // we'll add code here soon
    const uri = `${process.env.MONGO}`;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('db connected')
    } catch (e) {
        console.log(e);
    }

}


