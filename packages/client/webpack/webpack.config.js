const main = require('./main');
const ssr = require('./ssr');

module.exports = (command, argv) => {
  return [
    main(command, argv),
    ssr(command, argv),
  ];
};
