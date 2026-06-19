import mongoose from "mongoose";


const dbConnection = () => {
    mongoose.connect(process.env.DB_url)
        .then((conn) => {
            console.log(`Database Connected: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.error(`Database Error: ${err.message}`);
            process.exit(1);
        });
};

export default dbConnection;