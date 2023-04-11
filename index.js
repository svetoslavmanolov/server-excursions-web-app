const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const whitelist = ['http://localhost:3000']

const { PORT } = require('./config/env');
const routes = require('./routes');
const { dbInit } = require('./config/db');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

// app.engine('hbs', hbs.engine({
//     extname: 'hbs'
// }));

// app.set('view engine', 'hbs');

// app.set('view engine', 'html');
// app.use(express.static('public'));
app.use(cors({ origin: whitelist, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(routes);
app.use(errorHandler);

dbInit();
//.then()
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
