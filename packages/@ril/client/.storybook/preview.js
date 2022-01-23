// Using PostCSS 7 due to Storybook's lack of support :(
// https://tailwindcss.com/docs/installation#post-css-7-compatibility-build
require("tailwindcss/tailwind.css");

const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const relativeTime = require("dayjs/plugin/relativeTime");
const minMax = require("dayjs/plugin/minMax");

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(minMax);
