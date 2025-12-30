const mongoose = require('mongoose')

const connectDB = (url) => {
    //return a promise
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
}

/* const connectDB = (url) => {
    //return a promise
    return mongoose
        .connect(connectionString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
} */


/* mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('CONNECTED TO THE DB'))
    .catch((err) => console.log(err)) */

module.exports = connectDB