require("../src/style.css");

const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
const minMax = require("dayjs/plugin/minMax");

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(minMax);
