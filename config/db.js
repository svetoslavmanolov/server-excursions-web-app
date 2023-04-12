const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_QUERYSTRING = process.env.DB_QUERYSTRING;

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('DB is connected!'));
    mongoose.set('strictQuery', false);
    return mongoose.connect(DB_QUERYSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Mongo connected"))
        .catch((error) => console.log(error));
}


// import mongoose from 'mongoose';

// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// // Check DB Connection
// db.once('open', () => {
//   (async () => {
//     const data = await mongoose.connection.db.admin().command({
//       listDatabases: 1,
//     });
//     console.log(data);
//   })();
//   console.log('Connected to MongoDB');
// });

// // Check for DB errors
// db.on('error', (err) => {
//   console.log('DB Connection errors', err);
// });

// export default mongoose;


