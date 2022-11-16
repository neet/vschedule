import fs from 'fs';
import path from 'path';

const ytWebsubStreamScheduled = fs.readFileSync(
  path.join(__dirname, './yt-websub-stream-scheduled.xml'),
);
const ytWebsubStreamTitleChanged = fs.readFileSync(
  path.join(__dirname, './yt-websub-stream-title-changed.xml'),
);
const ytWebsubStreamDeleted = fs.readFileSync(
  path.join(__dirname, './yt-websub-stream-deleted.xml'),
);

export {
  ytWebsubStreamDeleted,
  ytWebsubStreamScheduled,
  ytWebsubStreamTitleChanged,
};
