import createError from 'http-errors';
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import {cryptoRouter} from './routes/crypto.mjs';


const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// dotenv.config(path: __dirname +'/.env')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use('/crypto', cryptoRouter);
app.use(express.static(path.join(__dirname)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
});


export default app;
