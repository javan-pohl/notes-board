"use strict";

// Import the index.js file inside the models directory
// (I believe Node imports the 'index' file in a dir by default)
const Models = require("./lib/models/");
const Path = require("path");
const Hapi = require("@hapi/hapi");
const Settings = require("./settings");
const Routes = require("./lib/routes");

const init = async () => {
  const server = new Hapi.Server({ port: Settings.port });

  await server.register([require("@hapi/vision"), require("@hapi/inert")]);

  server.views({
    engines: { pug: require("pug") },
    path: Path.join(__dirname, "lib/views"),
    compileOptions: {
      pretty: false,
    },
    isCached: Settings.env === "production",
  });

  server.route(Routes);
  await Models.sequelize.sync();

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
