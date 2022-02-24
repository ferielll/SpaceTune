'use strict';

const express = require('express');
const ApiController = require('./apiRoutes');

let router = express.Router();

router.use('/api', ApiController);

module.exports = router;
