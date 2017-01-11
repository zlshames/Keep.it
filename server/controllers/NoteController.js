'use strict'

const Note = require('../models/Note')

class NoteController {
  static store(request, response) {
    // Create new note
    const note = new Note({
      content: request.body.content,
      owner: request.user.id,
      created_at: new Date()
    })

    // Save note
    note.save(err => {
      if (err) {
        return response.json({
          success: false,
          error: err.message
        })
      }

      // Retrieve all notes
      Note.find({ owner: request.user.id }, (err, notes) => {
        if (err) {
          return response.json({
            success: true,
            message: err.message
          })
        }

        // Send success response
        response.json({
          success: true,
          message: 'Successfully created note',
          data: notes
        })
      })
    })
  }

  static show(request, response) {
    // Find all notes from a user
    Note.find({ owner: request.user.id }, (err, notes) => {
      if (err) {
        return response.json({
          success: false,
          message: err.message
        })
      }

      // Send success response
      response.json({
        success: true,
        message: 'Successfully fetched notes',
        data: notes
      })
    })
  }

  static filter(request, response) {
    // Find all notes from a user
    Note.find({
      owner: request.user.id,
      content: { '$regex': request.body.filter, '$options': 'i' }
    }, (err, notes) => {
      if (err) {
        return response.json({
          success: false,
          message: err.message
        })
      }

      // Send success response
      response.json({
        success: true,
        message: 'Successfully fetched filtered notes',
        data: notes
      })
    })
  }

  static update(request, response) {
    // Find note, and update content
    Note.findOneAndUpdate({ _id: request.params.id, owner: request.user.id }, { content: request.body.content }, (err, note) => {
      if (err) {
        return response.json({
          success: false,
          message: err.message
        })
      }

      // Send success response
      response.json({
        success: true,
        message: 'Successfully updated note'
      })
    })
  }

  static destroy(request, response) {
    // Find note, and delete it
    Note.findOneAndRemove({ _id: request.params.id, owner: request.user.id }, err => {
      if (err) {
        return response.json({
          success: false,
          message: err.message
        })
      }

      // Send success response
      response.json({
        success: true,
        message: 'Successfully deleted note'
      })
    })
  }
}

module.exports = NoteController
