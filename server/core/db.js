const mongoose = require('mongoose')

async function connectDB() {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })

    console.log(`MongoDb connected: ${conn.connection.host}`)
}

module.exports = connectDB