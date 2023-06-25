require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

let database = []

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:short_url', (req, res) => {
  let short_url = parseInt(req.params.short_url)
  let data = database[short_url - 1];
  if (!data){
    res.json({error: "invalid url"});
  }
  else{
    res.redirect(data.original_url);
  }
});

app.post('/api/shorturl', bodyparser.urlencoded({ extended: false }), 
(req, res, next) => {
  const domain = new URL(req.body.url).hostname;
  dns.lookup(domain, (err, address, family) => {
    if (err) {
      res.json({error: "invalid url"});
    } else {
      next();
    }
  });
}, (req, res) => {
  let data = {original_url : req.body.url, short_url : database.length + 1};
  database.push(data);
  res.send(data);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
