const express = require('express');
const axios = require('axios');
const ExpressError =  require("./expressError")
const app = express();

app.use(express.json())

//  Retrieves data to produce information upon request via JSON request
// Given a list of GitHub users names, this should return information about those developers.
// Should get JSON body like {developers: [username, ...]}
// Should return [ {name, bio}, ... ]

app.post('/', async function(req, res, next) {
  try { 
    let devData=  await Promise.all(req.body.developers.map(async d => {
      let devSearch =  await axios.get(`https://api.github.com/users/${d}`);
      return devSearch.data
    }));
    
    let devList = devData.map(r => ({ name: r.name, bio: r.bio }));

    return res.json(devList);

  } catch(err) {
    next(err);
  }
});

// Error handling

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;