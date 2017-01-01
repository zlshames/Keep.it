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
		this.widthFix = this.widthFix.bind(this);

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
	widthFix(noteText) {

		let noteTextCss = window.getComputedStyle(noteText, null),
				noteTextCss_padding = noteTextCss.getPropertyValue("padding").split(" ")[1],
				noteTextCss_margin = noteTextCss.getPropertyValue("margin").split(" ")[1],
				noteTextCss_fontSize = noteTextCss.getPropertyValue("font-size").replace("px",""),
				noteTextInner,
				noteTextSupposed,
				longestLine = noteText.value.split("\n").map(val => val.length),
				note = noteText.parentElement,
				windowWidth = document.documentElement.clientWidth,
				goldenNumber = 80;//plz don't ask

		noteTextCss_padding = (noteTextCss_padding)? noteTextCss_padding : "0";
		noteTextCss_margin = (noteTextCss_margin)? noteTextCss_margin : "0";

		noteTextCss_padding = parseInt(noteTextCss_padding.replace("px",""));
		noteTextCss_margin = parseInt(noteTextCss_margin.replace("px",""));
		noteTextCss_fontSize = parseInt(noteTextCss_fontSize);

		longestLine = Math.max(...longestLine);
		noteTextInner = noteText.offsetWidth - noteTextCss_padding * 2 - noteTextCss_margin * 2;
		noteTextSupposed = Math.ceil(longestLine * noteTextCss_fontSize / 1.5);

		//console.log(noteText.offsetWidth,windowWidth)

		if((noteTextInner < noteTextSupposed && noteText.offsetWidth + goldenNumber < windowWidth) ||
			(noteTextInner > noteTextSupposed && noteText.offsetWidth > 160)) {
			//let setTo = ((noteTextSupposed + noteTextCss_padding * 2 + noteTextCss_margin * 2) + "px")
			note.style.width = ((noteTextSupposed + noteTextCss_padding * 2 + noteTextCss_margin * 2) + "px");
		}
	}
	sizeFix(e) {

		let noteText = e.target,
				note = noteText.parentElement,
				noteTop = note.getElementsByClassName("note__top")[0];

		noteText.style.height = 'auto';
    noteText.style.height = noteText.scrollHeight +'px';
		noteText.focus();

		note.style.height = noteText.style.height + 16 + noteTop.offsetHeight + "px";
		this.widthFix(noteText);
	}
	handleKeyDown(e) {

		e.persist();//need to save it for the async call
		//console.log(e.keyCode);
		if(e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 8) {
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

		this.widthFix(noteText);
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
