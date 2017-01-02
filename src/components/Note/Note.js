import React from 'react'
import { Link } from 'react-router'
import superagent from "superagent"

import "./Note.scss";
// replace every noteText with this.noteText
class Note extends React.Component {

  constructor(props) {

    super()
    this.saveNote = this.saveNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
		this.sizeFix = this.sizeFix.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.widthFix = this.widthFix.bind(this);
		this.emptyNote = this.emptyNote.bind(this);

		this.buttonAction= (props.type === "edit")? this.editNote : this.saveNote;

		//console.log(props);
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

		const text = document.getElementById(this.props.id)
			.getElementsByClassName("note__text")[0];

    superagent
      .post('http://localhost:3000/notes')
      .send({ content: text.value })
      .end((err, res) => {

        if(err) {
				  console.log(err)
        } else {
					this.props.updateParent(res.body.data);
					this.emptyNote();
        }
    })
  }
	emptyNote() {

		let text = document.getElementById(this.props.id).getElementsByClassName("note__text")[0];

		text.value = "";
		this.sizeFix(text);
	}
	editNote() {

		const text = document.getElementById(this.props.id)
			.getElementsByClassName("note__text")[0].value;

		superagent
      .put('http://localhost:3000/notes/' + this.props.id)
			.send({
				content : text
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
	widthFix(noteText,cb) {

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

		if((noteTextInner < noteTextSupposed && noteTextSupposed + goldenNumber < windowWidth) ||
			(noteTextInner > noteTextSupposed && noteText.offsetWidth > 160)) {
			note.style.width = ((noteTextSupposed + noteTextCss_padding * 2 + noteTextCss_margin * 2) + "px");
		} else if(noteTextSupposed > windowWidth) {

			note.style.width = ((windowWidth - goldenNumber) + "px");
		}

		if(cb) {
			cb();
		}
	}
	sizeFix(noteText) {

		let note = noteText.parentElement,
				noteTop = note.getElementsByClassName("note__top")[0];

		this.widthFix(noteText);

		noteText.style.height = 'auto';
    noteText.style.height = noteText.scrollHeight +'px';
		noteText.focus();

		note.style.height = noteText.style.height + 16 + noteTop.offsetHeight + "px";
	}
	handleKeyDown(e) {

		e.persist();//need to save it for the async call
		let noteText = e.target;

		if((e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 8) && this.props.type === "edit") {
			this.editNote();
		}
		setTimeout(() => {
			this.sizeFix(noteText);
		},0);
	}
	componentDidMount() {

		let noteText = document
			.getElementById(this.props.id)
			.getElementsByClassName('note__text')[0];

		this.widthFix(noteText,() => {

			setTimeout(() => {
				noteText.style.height = 'auto';
				noteText.style.height = noteText.scrollHeight +'px';
			},0)
		});

		noteText.addEventListener("focusin", () => {

			noteText
				.parentElement
				.getElementsByClassName('note__bottom')[0].className += "active";

		});

		noteText.addEventListener("focusout", (e) => {

			console.log(noteText,e);
			// noteText
			// 	.parentElement
			// 	.getElementsByClassName('note__bottom')[0].className.replace("active","");

		});
	}
	componentWillUnmount() {
		let noteText = document
			.getElementById(this.props.id)
			.getElementsByClassName('note__text')[0];

		noteText.removeEventListener("focusout");
		noteText.removeEventListener("focusin");

	}
	render() {

		let closeFunction = (this.props.type === "edit")? this.deleteNote : this.emptyNote;

    return (

			<div className = "note" id = {this.props.id}>
				<div className = {"note__top"}>
					<i onClick = {closeFunction}  className = "fa fa-times" aria-hidden="true"></i>
				</div>
				<textarea
					className = "note__text"
					onKeyDown = {this.handleKeyDown}
					onChange = {this.handleKeyDown}
					onCut = {this.handleKeyDown}
					onPaste = {this.handleKeyDown}
					onDrop= {this.handleKeyDown}
					defaultValue = {this.props.content}
					placeholder = {this.props.placeHolder} >
				</textarea>
				<div className = "note__bottom">
					<button onClick = {this.buttonAction} >Save note</button>
				</div>
			</div>
    );
  }
}

Note.defaultProps = {
	content : "",
	placeHolder : "",
	type : "edit",
	buttonAction : null,
}

export default Note
