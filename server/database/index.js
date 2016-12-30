'use strict'

const config = require('../../config/project.config')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/${ config.db_name }`)
