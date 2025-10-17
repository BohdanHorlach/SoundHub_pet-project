require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const exeptionTracker = require('./middlewares/exeption-tracker');
const { initDB } = require('./models');
const sequelize = require('./db');
const { tempFileCleaner, rejectedCardsCleaner } = require('./config/cleaners-config');
const initWebSocketServer = require('./ws/web-socket-server');


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
//request log
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] Incoming request: `, req.method, req.url);
  next();
});
app.use('/api', router);
app.use(exeptionTracker); //errors proccessing


(async () => {
  try {
    const server = app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server started on PORT: ${process.env.PORT}`));

    console.log('Waiting for database connection...');
    await sequelize.authenticate();
    console.log('Database is ready');

    initDB().then(() => console.log('Database synchronized.'));
    initWebSocketServer(server);
    tempFileCleaner.start();
    rejectedCardsCleaner.start();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  tempFileCleaner.stop();
  process.exit();
});
