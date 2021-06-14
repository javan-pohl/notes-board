"use strict";

const Path = require("path");

module.exports = [
  //we're going to define our routes here
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "All the notes will appear here";
    },
    config: {
      description: "Gets all the notes available",
    },
  },
];
