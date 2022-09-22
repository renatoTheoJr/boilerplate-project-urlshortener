require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const list = [];
app.use(cors());
app.use(express.json())
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(request, response){
  const {url} = request.body;
  const shorturl = list.length + 1;
  list.push(url);
  return response.json({
    original_url: url, 
    short_url: shorturl
  })
})

app.get('/api/shorturl/:shorturl', function(request, response){
  const {shorturl} = request.params;
  response.redirect(shorturl);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
