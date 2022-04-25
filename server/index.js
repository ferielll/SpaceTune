"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

module.exports = function () {
  setImmediate(() => setTimeout(() => console.log("a"), 0));

  let server = express(),
    create,
    start;

  create = function (config, db) {
    let routes = require("./routes");

    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.set("viewDir", config.viewDir);

    // Returns middleware that parses json
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
      limit: "10mb",
      extended: true,
    }));
    server.use(cookieParser());
    server.use(logger("dev"));
    server.use(passport.initialize());

    mongoose.connect(db.database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    require("../configs/passport")(passport);

    server.use("/uploads", express.static("uploads"));

    server.set("views", server.get("viewDir"));

    // Set up routes
    routes.init(server);
  };

  //socket video call
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });

  start = function () {
    let hostname = server.get("hostname"),
      port = server.get("port");

    server.listen(port, function () {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });
  };

  return {
    create: create,
    start: start,
  };
};
