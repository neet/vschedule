import dayjs from 'dayjs';
import DurationPlugin from 'dayjs/plugin/duration';
dayjs.extend(DurationPlugin);

import bodyParser from 'body-parser';
import bodyParserXml from 'body-parser-xml';
bodyParserXml(bodyParser);
