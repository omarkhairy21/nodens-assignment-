const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

// middleware
// serve static sites
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'pug');

// views
app.set('views', 'views');

// database connection
const dbURI = 'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0.dyyja.mongodb.net/nodens?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    console.log("App Connected Successfully")
    app.listen(3002)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);

module.exports = app;
