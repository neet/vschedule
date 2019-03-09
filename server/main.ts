import * as express from 'express';
import * as request from 'request';
import * as cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const staticDir = path.resolve(__dirname, 'static');

// Add cors headers
app.use(cors());
app.options('*', cors());

// Bind /api/* to original API server
app.use('/api', function(req, res) {
  req.pipe(request(process.env.API_URL + req.url)).pipe(res);
});

// Serve static files
app.use('/static', express.static(staticDir));
app.use('/*', (_, res) => {
  res.sendFile(path.resolve(staticDir, 'index.html'));
});

app.listen(process.env.PORT || 3000);
