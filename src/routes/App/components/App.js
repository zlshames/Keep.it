import React from 'react'
import superagent from "superagent"

import './App.scss'
import Note from "../../../components/Note";

// TODO:
//ADD undo method for deleted notes
//Extract the Note to a different component
//	Add shouldcomponentUpdate for text,id changes

class App extends React.Component {
  constructor() {

    super()
    this.saveNote = this.saveNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.grabNotes = this.grabNotes.bind(this);
		this.state = {
      notes: []
    }
		this.grabNotes();

  }
	grabNotes() {

		superagent
      .get('http://localhost:3000/notes')
      .end((err, res) => {

				if (err) {
					console.log(err)
        } else {
				  this.setState({
            notes: res.body.data
          });
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
            notes: res.body.data
          })
        }
    })
  }
	editNote(e) {

		if(e.keyCode !== 13) {
			return;
		}


		superagent
      .put('http://localhost:3000/notes/' + e.target.parentElement.id)
			.send({
				content : e.target.value
			})
      .end((err, res) => {
				if (err) {
					console.log(err)
        }
    })
	}
	deleteNote(e) {

		e.persist();
		let note = e.target.parentElement.parentElement;

		superagent
	    .delete('http://localhost:3000/notes/' + note.id)
	    .end((err, res) => {

				if (err) {
					console.log(err)
	      } else if(res.body.success) {
					note.parentElement.removeChild(note);
				}
	  })
	}
	render() {

    const notes = this.state.notes.map((note, key) =>
			<Note
				key = {note._id}
				id = {note._id}
				content = {note.content} />
    );

    return (
      <div className = "app">

			<div className="note">
				<textarea id="note1"></textarea>
				<button onClick={this.saveNote} className="btn btn-default">Save me</button>
			</div>
			
			<div className = "notes">
				{notes}
			</div>

      </div>
    );
  }
}

export default App
