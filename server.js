"use strict";

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var timeStamp = new Date().toString();
  var log = `Time: ${timeStamp}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("Unable to log");
    }
  });
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs',{
//     message: 'Site is under Maintenance!!'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  // res.send("<h1>Hello world!!</h1>");
  // res.send({
  //   name: "Abhijit",
  //   address: "Bangalore",
  //   age: 25
  // });
  res.render("home.hbs", {
    title: "Home Page",
    welcomeMessage: 'welcome to my page'
  });
});

app.get('/about', (req, res) => {
  res.render("about.hbs", {
    title: "Abouts Page"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
})

app.listen(port , () => {
  console.log(`Server is up on ${port}`);
});
