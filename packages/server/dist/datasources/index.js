"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itsukara_link_1 = require("./itsukara-link");
exports.dataSources = () => ({
    itsukaraLink: new itsukara_link_1.ItsukaraLinkAPI(),
});
