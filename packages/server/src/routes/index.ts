import path from 'path';
import express from 'express';
import render from '@ril/client';
import manifest from '@ril/client/static/build/manifest.json';

const client = require.resolve('@ril/client');
const router = express.Router();

// Service worker
router.use('/sw.js', (_, res) => {
  res.sendFile(path.resolve(client, '../../static/build/sw.js'));
});

// Progressive web app
router.use('/manifest.json', ({ i18n }, res) => {
  res.json({
    name: i18n.t('meta.title', { defaultValue: 'Refined itsukara.link' }),
    short_name: i18n.t('meta.title_short', { defaultValue: 'Ril' }),
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome.png',
        size: '250x250',
        type: 'image/png',
      },
    ],
    start_url: '/activities',
    theme_color: '#F80652',
    background_color: '#C70542',
  });
});

// Server side rendering
router.use(async (req, res) => {
  const result = await render({
    manifest,
    i18n: req.i18n,
    location: req.url,
  });

  res.status(result.statusCode);
  res.send(`<!DOCTYPE html>\n${result.staticMarkup}`);
});

export const routes = router;
