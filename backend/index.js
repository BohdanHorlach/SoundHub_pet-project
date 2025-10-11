require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const exeptionTracker = require('./middlewares/exeption-tracker');
const { initDB } = require('./models');
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


initDB(app);
initWebSocketServer(app);
tempFileCleaner.start();
rejectedCardsCleaner.start();


process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  tempFileCleaner.stop();
  process.exit();
});
