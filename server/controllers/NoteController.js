'use strict'

const Note = require('../models/Note')

class NoteController {
  static store(request, response) {
    const note = new Note({
      content: request.body.content,
      owner: request.user.id,
      created_at: new Date()
    })

    note.save(err => {
      if (err) console.log(err)

      Note.find({ owner: request.user.id }, (err, notes) => {
        if (err) console.log(err)

        response.json({
          success: true,
          message: 'Successfully created note',
          data: notes
        })
      })
    })
  }

  static show(request, response) {
    Note.find({ owner: request.user.id }, (err, notes) => {
      if (err) console.log(err)

      response.json({
        success: true,
        message: 'Successfully fetched notes',
        data: notes
      })
    })
  }

  static update(request, response) {
    Note.findOneAndUpdate({ id: request.params.id, owner: request.user.id }, { content: request.body.content }, (err, note) => {
      if (err) console.log(err)

      response.json({
        success: true,
        message: 'Successfully updated note'
      })
    })
  }

  static destroy(request, response) {
    Note.findOneAndRemove({ id: request.params.id, owner: request.user.id }, err => {
      if (err) console.log(err)

      response.json({
        success: true,
        message: 'Successfully deleted note'
      })
    })
  }
}

module.exports = NoteController
