const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const whitelist = ['http://localhost:3000'];

const routes = require('./routes');
const { dbInit } = require('./config/db');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

// const Excursion = require('./models/Excursion');
// const {user} = require('./utils/data');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// app.engine('hbs', hbs.engine({
//     extname: 'hbs'
// }));

// app.set('view engine', 'hbs');

// app.use(cors({ origin: whitelist, credentials: true }));
// app.use(cors({ origin: '*', credentials: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(routes);
app.use(errorHandler);

dbInit();
// Excursion.insertMany(user);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
