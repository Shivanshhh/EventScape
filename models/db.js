const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MONGO_URL="mongodb+srv://strtiwari28:qwerty1@cluster0-8ac9j.mongodb.net/events?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log('Mongo Connection Success');
    }
});

