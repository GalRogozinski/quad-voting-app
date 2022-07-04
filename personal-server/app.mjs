import createError from 'http-errors';
// var createError = import('http-errors');
// var express = import('express');
// import dotenv from 'dotenv';
import logger from 'morgan';
import express from "express";
import cookieParser from "cookie-parser";

import indexRouter  from './routes/index.cjs';
import usersRouter from './routes/users.cjs';
import {maciRouter}  from './routes/crypto.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import redis from 'redis';
import cors from "cors";


let app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// dotenv.config(path: __dirname +'/.env')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use('/crypto', cryptoRouter);
app.use(express.static(path.join(__dirname,)))

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
  res.render('error');
});



export default app;
