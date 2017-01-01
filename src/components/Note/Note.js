import React from 'react'
import { Link } from 'react-router'
import superagent from "superagent"
import elementResizeDetectorMaker from "element-resize-detector";

import "./Note.scss";

const erd = elementResizeDetectorMaker();

class Note extends React.Component {
  constructor(props) {

    super()
    this.saveNote = this.saveNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.sizeFix = this.sizeFix.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		this.state = {
      notes: []
    }
  }
	shouldComponentUpdate(nprops,nstate) {

		if(nprops.id !== this.props.id || nprops.content !== this.props.content) {
			return true;
		} else {
			return false;
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
					this.props.remove(note.id);
				}
	  })
	}
	sizeFix(e) {

		let noteText = e.target,
				note = noteText.parentElement,
				noteTop = note.getElementsByClassName("note__top")[0];

		noteText.style.height = 'auto';
    noteText.style.height = noteText.scrollHeight +'px';

		note.style.height = noteText.style.height + 16 + noteTop.offsetHeight + "px";

		noteText.focus();
	}
	handleKeyDown(e) {

		e.persist();//need to save it for the async call
		if(e.keyCode === 13 || e.keyCode === 32) {
			this.editNote(e);
		}
		setTimeout(() => {
			this.sizeFix(e);
		},0);
	}
	componentDidMount() {

		let noteText = document
			.getElementById(this.props.id)
			.getElementsByClassName('note__text')[0];

		setTimeout(() => {
			noteText.style.height = 'auto';
			noteText.style.height = noteText.scrollHeight +'px';
		},0)

	}
	render() {
    return (

			<div className = "note" id = {this.props.id}>
				<div className = "note__top">
					<i onClick = {this.deleteNote}  className = "fa fa-times" aria-hidden="true"></i>
				</div>
				<textarea
					className = "note__text"
					onKeyDown = {this.handleKeyDown}
					onChange = {this.sizeFix}
					onCut = {this.sizeFix}
					onPaste = {this.sizeFix}
					onDrop= {this.sizeFix}
					defaultValue = {this.props.content} >
				</textarea>
			</div>
    );
  }
}

export default Note
