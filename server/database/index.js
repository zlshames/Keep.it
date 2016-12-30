'use strict'

const mongoose = require('mongoose')

module.exports = function (config) {
  mongoose.connect(`mongodb://localhost/${ config.db_name }`)
}
