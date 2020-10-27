const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
// serve static sites
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'pug');

// views
app.set('views', 'views');

// database connection
const dbURI =
  'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0.dyyja.mongodb.net/nodens?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Database Connected Successfully');
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(userRoutes);

module.exports = app;
