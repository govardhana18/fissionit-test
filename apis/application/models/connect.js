const mongoose = require('mongoose')
const DATABASE_URL = "mongodb://localhost:27017/fission";

const connectDb = () => {
    mongoose.set('useCreateIndex', true);
    return mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDb;