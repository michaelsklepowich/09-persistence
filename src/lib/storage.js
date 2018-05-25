'use strict';


//this storage.js file allows to swap between which data we want to access
const memoryStorage = require('./storage-in-memory.js');
const fileStorage = require('./storage-in-files.js');

module.exports = fileStorage;
