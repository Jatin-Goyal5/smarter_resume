const Mongoose = require('mongoose');

/**
 * @desc Connect to mongo db
 * @returns {object} Mongoose connection
 * @public
 */

const connectDB = async () => {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error occure in database connection: ${err}`)
    }
}

module.exports = connectDB;