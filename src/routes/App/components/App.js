import React from 'react'
import superagent from "superagent"

import './App.scss'
import Note from "../../../components/Note";
import Masonry from 'react-masonry-component';

// TODO:
//Undo option for deleted notes

class App extends React.Component {
  constructor() {

    super()
		this.grabNotes = this.grabNotes.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.updateNotes = this.updateNotes.bind(this);
		this.updateNoteLayout = null;

		this.state = {
      notes: []
    }
		this.grabNotes();

  }
	updateNotes(notes) {
		this.setState({
			notes,
		});
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

				<Note
					id = "new_note"
					placeHolder = "Start new note"
					type = "new"
					updateParent = {this.updateNotes}
				/>
				<div className = "app__notes__wrap">
					<Masonry
						className = "notes"
						enableResizableChildren = {true}
						elementType = "div"
					>
						{notes}
					</Masonry>
				</div>

      </div>
    );
  }
}

export default App
