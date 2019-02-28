import * as express from 'express';
import * as request from 'request';
import * as cors from 'cors';

const app = express();

// Add cors headers
app.use(cors());
app.options('*', cors());

// Bind /api/* to original API server
app.use('/api', function(req, res) {
  req.pipe(request('https://api.itsukaralink.jp/' + req.url)).pipe(res);
});

app.listen(process.env.PORT || 3000);
