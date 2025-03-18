const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.ATLAS_URI);

        console.log("Database Connected");
        return db;
    } catch (err) {
        console.error("Connection Error", err);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;
