'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the model schema
const noteSchema = new Schema({
  content: String, required: true, unique: false,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
})

// Export the model
const Note = mongoose.model('Note', noteSchema)
module.exports = Note
