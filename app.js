//dependencies
//The path module provides utilities for working with file and directory paths.
const path = require('path');
const express = require('express');

//routes
const books = require('./routes/books');
const routes = require('./routes/index');

//express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Built-in body-parser in Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//use created routes
app.use('/', routes);
app.use('/books', books);

// App listen on Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('The app has started!');
});
