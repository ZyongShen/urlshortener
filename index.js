import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Shortener } from './utils/shortener.js';

const app = express();
var shortener = new Shortener();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// post endpoint to shorten url
app.use(express.urlencoded({extended: true}));
app.post("/api/shorturl", shortener.shortenUrl);

// get endpoint to use short url
app.get("/api/shorturl/:id", shortener.getByShortUrl);
