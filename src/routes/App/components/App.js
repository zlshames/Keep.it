import React from 'react'
import superagent from "superagent"

import './App.scss'
import Note from "../../../components/Note";
import Masonry from 'react-masonry-component';

// TODO:
//ADD undo method for deleted notes
//Extract the Note to a different component
//	Add shouldcomponentUpdate for text,id changes
//Move save note to Note class

class App extends React.Component {
  constructor() {

    super()
		this.grabNotes = this.grabNotes.bind(this);
		this.removeNote = this.removeNote.bind(this);
	  this.saveNote = this.saveNote.bind(this);
		this.updateNoteLayout = null;

		this.state = {
      notes: []
    }
		this.grabNotes();

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
	removeNote(id) {
		let notes = this.state.notes.filter(val => (val._id === id)? false : true);
		this.setState({
			notes
		})
	}
	render() {

    const notes = this.state.notes.map((note, key) =>
			<Note
				key = {note._id}
				id = {note._id}
				content = {note.content}
				remove = {this.removeNote}
			/>
    );

    return (
      <div className = "app">

			<div className="note">
				<textarea id="note1"></textarea>
				<button onClick = {this.saveNote} className="btn btn-default">Save me</button>
			</div>


			<Masonry
	      className = "notes"
				enableResizableChildren = {true}
				elementType = "div"
			>
        {notes}
      </Masonry>

      </div>
    );
  }
}

export default App
