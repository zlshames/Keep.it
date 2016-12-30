import React from 'react'
import superagent from "superagent"
import './App.scss'

class App extends React.Component {
  constructor() {
    super()
    this.saveNote = this.saveNote.bind(this)

    this.state = {
      notes: []
    }

    // Get notes
    superagent
      .get('http://localhost:3000/notes')
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.setState({
            notes: JSON.parse(res.text).data
          })
        }
    })
  }
  saveNote(e) {
    let textBox = e.target.previousSibling,
        noteId = textBox.id,
        noteText = textBox.value

    superagent
      .post('http://localhost:3000/notes')
      .send({
        content: noteText
      })
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          this.setState({
            notes: JSON.parse(res.text).data
          })
        }
    })
  }
  render() {
    console.log(this.state)
    const notes = this.state.notes.map((note, key) => {
      return (
        <li key={ key }>{ note.content }</li>
      )
    })
    return (
      <div className = "app">

        <div className="note">
          <textarea id="note1"></textarea>
          <button onClick={this.saveNote} className="btn btn-default">Save</button>
        </div>

        <ul>
          { notes }
        </ul>


      </div>
    )
  }
}

export default App
