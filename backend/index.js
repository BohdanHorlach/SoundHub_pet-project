require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const router = require('./router/index');
const middleware = require('./middlewares/middleware');
const PORT = process.env.PORT;


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use('/api', router);
app.use(middleware); //errors proccessing


//request log
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  console.log('Authorization header:', req.headers['authorization']);
  next();
});


const start = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized.');

        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}


start();