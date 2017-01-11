import React from 'react'
import superagent from "superagent"

import './App.scss'
import Note from "../../../components/Note";
import Masonry from 'react-masonry-component';


class App extends React.Component {
  constructor() {
    super()

    // Bind methods
    this.grabNotes = this.grabNotes.bind(this);
    this.grabFilteredNotes = this.grabFilteredNotes.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateNoteLayout = null;

    // Set initial state
    this.state = { notes: [] }

    // Grab notes
    this.grabNotes();
    //this.grabFilteredNotes()
  }

  updateNotes(notes) {
    this.setState({ notes })
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
          })
        }
    })
  }

  grabFilteredNotes() {

		let filter = document.getElementById("filter__value").value;

    superagent
      .post('http://localhost:3000/notes/filtered')
      .send({ filter })
      .end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.setState({
            notes: res.body.data
          })
        }
    })
  }

  removeNote(id) {
    let notes = this.state.notes.filter(val => (val._id === id) ? false : true)
    this.setState({ notes })
  }

  render() {
    const notes = this.state.notes.map((note, key) =>
      <Note
        key = { note._id }
        id = { note._id }
        content = { note.content }
        remove = { this.removeNote }
      />
    )

    return (
      <div className="app">

      	<div className = "app__header">
					<Note
	          id="new_note"
	          placeHolder="Start new note"
	          type="new"
	          updateParent={ this.updateNotes }
	        />

					<div className = "note__filter">
						<div className = "ui icon input">
							<input
								id = "filter__value"
								type="text" placeholder="Search..."
								onKeyDown = {this.grabFilteredNotes}
								onKeyUp = {this.grabFilteredNotes}
							></input>
							<i className = "inverted circular search link icon filter__button" onClick = {this.grabFilteredNotes}></i>
						</div>
					</div>
				</div>

        <Masonry
          className="notes"
          enableResizableChildren={ true }
          elementType = "div"
        >
          { notes }
        </Masonry>

      </div>
    )
  }
}

export default App
