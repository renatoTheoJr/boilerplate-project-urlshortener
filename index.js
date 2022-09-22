require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const {URL} = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;
const list = [];
app.use(cors());
app.use(express.json())
const bodyParser = require('body-parser');

const isValidUrl = urlString=> {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

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
  const original_url = url;
  try{
  const urlObject = new URL(url);

  dns.lookup(urlObject.hostname, (err, address, family) => {
    if(err){
      response.json({
        error: "invalid url"
      });
    }else{
      const shorturl = list.length + 1;
      const obje =  {
        original_url,
        short_url: shorturl
      }
      list.push(url);
      response.json(obje);
    }
    

  })
  return response;
  }catch{
    return response.json({
      error: "invalid url"
    })
  }

 
 
 
})

app.get('/api/shorturl/:shorturl', function(request, response){
  const {shorturl} = request.params;
  const url = list[shorturl - 1];
  response.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
