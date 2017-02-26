const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `[1] ${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   var now = new Date().toString();
//   var log = `[2] ${now} : ${req.method} ${req.url}`;
//   console.log(log);
//   res.render("maintenance.hbs", {
//     "pageTitle" : "Maintenance"
//   })
//   fs.appendFile('server.log', log + '\n');
// });

// registering middleware about static path
app.use(express.static(__dirname + "/public"));

//** **/

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render("home.hbs", {
    "name" : "Cyclone",
    "artist" : ["Sticky Fingers", "Love letters"],
    pageTitle : "Welcome Page",
    welcomeMessage : "Hi everyone!"
  });
});

app.get('/about', (req, res) => {
  res.render("about.hbs", {
    pageTitle : "About Page"
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : "bad request as fuck"
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
