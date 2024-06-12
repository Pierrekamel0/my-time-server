const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(cors())
app.use(bodyParser.json());

app.use(function (req,res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
})


app.get('/time', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.send(`<!DOCTYPE html><html><head><title>Current Time</title></head><body><p>${currentTime}</p></body></html>`);
});

app.get('/events', (req, res) => {
    // Setting headers to keep the connection open and to stream data
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
      'Connection': 'keep-alive'
    });
  
    let count = 0;
  
    res.write(`Counter: ${count++}\n`);
  
    setInterval(()=>{
      res.write(`Counter: ${count++}\n`);
  
    }, 2000)
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));