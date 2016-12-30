'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the model schema
const noteSchema = new Schema({
  content: { type: String, required: true, unique: false },
  owner: { type: String, require: true, unique: false },
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
})

noteSchema.pre('save', function(next) {
  this.updated_at = new Date()
  next()
})

// Export the model
const Note = mongoose.model('Note', noteSchema)
module.exports = Note
