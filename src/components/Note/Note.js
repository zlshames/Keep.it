import React from 'react'
import { Link } from 'react-router'

import "./Note.scss";

class Note extends React.Component {
  constructor() {

    super()
    this.saveNote = this.saveNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.state = {
      notes: []
    }
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
					//note.parentElement.removeChild(note);
				}
	  })
	}
	render() {

    return (
			<div className = "note" id = {this.props.id}>
				<div className = "note__top">
					<i onClick = {this.deleteNote}  className = "fa fa-times" aria-hidden="true"></i>
				</div>
				<textarea
					onKeyDown = {this.editNote}
					defaultValue = {this.props.content}>
				</textarea>
			</div>
    );
  }
}

export default Note
