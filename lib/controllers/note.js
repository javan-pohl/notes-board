"use strict";

const { Note } = require("../models/");
const Slugify = require("slug");
const Path = require("path");

module.exports = {
  // Here we're going to include our funcitons tha twill handle the remaining requests in the routes.js file
  create: async (request, h) => {
    const result = await Note.create({
      date: new Date(),
      title: request.payload.noteTitle,
      slug: Slugify(request.payload.noteTitle, { lower: true }),
      description: request.payload.noteDescription,
      content: request.payload.noteContent,
    });

    return result;
  },
};
