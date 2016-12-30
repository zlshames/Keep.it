'use strict'

const mongoose = require('mongoose')

// This is all you need to connect to the database
// Tables are created dynamically
module.exports = function (config) {
  mongoose.connect(`mongodb://localhost/${ config.db_name }`)
}
