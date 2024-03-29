import React from 'react'
import { Link } from 'react-router'
import superagent from "superagent"

import "./Note.scss"

class Note extends React.Component {

  constructor(props) {

    super()
    this.saveNote = this.saveNote.bind(this)
    this.editNote = this.editNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.sizeFix = this.sizeFix.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.widthFix = this.widthFix.bind(this)
    this.emptyNote = this.emptyNote.bind(this)
    this.activeHandle = this.activeHandle.bind(this)
		this.blurNote = this.blurNote.bind(this);

    this.buttonAction= (props.type === "edit")? this.editNote : this.saveNote
    this.mouseOver = false

    this.note = null
    this.noteText = null

    this.state = {
      notes: []
    }
  }
  shouldComponentUpdate(nprops,nstate) {

    if(nprops.id !== this.props.id || nprops.content !== this.props.content) {
      return true
    } else {
      return false
    }
  }
  saveNote(e) {

    let { noteText } = this

    superagent
      .post('http://localhost:3000/notes')
      .send({ content: noteText.value })
      .end((err, res) => {

        if(err) {
          console.log(err)
        } else {
          this.props.updateParent(res.body.data)
          this.emptyNote()
        }
    })
  }
  emptyNote() {

    let { noteText } = this

    noteText.value = ""
    this.sizeFix(noteText)
  }
  editNote(e) {

    let { noteText } = this

    superagent
      .put('http://localhost:3000/notes/' + this.props.id)
      .send({
        content : noteText.value
      })
      .end((err, res) => {

        if (err) {
          console.log(err)
        } else if(e){
					this.blurNote(500);
				}
    })
  }
  deleteNote(e) {

    e.persist()
    let { note } = this

    superagent
      .delete('http://localhost:3000/notes/' + note.id)
      .end((err, res) => {

        if (err) {
          console.log(err)
        } else if(res.body.success) {
          this.props.remove(note.id)
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
        note = this.note,
        windowWidth = document.documentElement.clientWidth,
        goldenNumber = 80//plz don't ask

    noteTextCss_padding = (noteTextCss_padding)? noteTextCss_padding : "0"
    noteTextCss_margin = (noteTextCss_margin)? noteTextCss_margin : "0"

    noteTextCss_padding = parseInt(noteTextCss_padding.replace("px",""))
    noteTextCss_margin = parseInt(noteTextCss_margin.replace("px",""))
    noteTextCss_fontSize = parseInt(noteTextCss_fontSize) - 3


    noteTextSupposed = noteText.value
      .split("\n")
      .reduce((a,b) => (a.length > b.length)? a : b ,0)
      .split("")
      .map(val =>
        (val.toUpperCase() === val)? (noteTextCss_fontSize ) : (noteTextCss_fontSize - 4)
      )
      .reduce((a, b) => a + b, 0)

    noteTextInner = noteText.offsetWidth - noteTextCss_padding * 2 - noteTextCss_margin * 2

    if( (noteTextInner < noteTextSupposed && noteTextSupposed + goldenNumber < windowWidth) ||
        (noteTextInner > noteTextSupposed && noteText.offsetWidth > 160) ) {

      note.style.width = ((noteTextSupposed + noteTextCss_padding * 2 + noteTextCss_margin * 2) + "px")
    } else if(noteTextSupposed > windowWidth) {

      note.style.width = ((windowWidth - goldenNumber) + "px")
    }

    if(cb) {
      cb()
    }
  }
  sizeFix(noteText) {

    let { note } = this,
        noteTop = note.getElementsByClassName("note__top")[0],
        noteBottom = note.getElementsByClassName("note__bottom")[0]

    this.widthFix(noteText)

    noteText.style.height = 'auto'
    noteText.style.height = noteText.scrollHeight +'px'
    noteText.focus()

    note.style.height = (noteText.style.height + noteBottom.offsetHeight + noteTop.offsetHeight + "px")
  }
  handleKeyDown(e) {

    e.persist()//need to save it for the async call
    let { noteText } = this

    if((e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 8) && this.props.type === "edit") {
      this.editNote()
    }
    setTimeout(() => {
      this.sizeFix(noteText)
    },0)
  }
  componentDidMount() {

    this.note = document.getElementById(this.props.id)
    this.noteText = this.note.getElementsByClassName("note__text")[0]

    let { note, noteText } = this

    this.widthFix(noteText,() => {

      setTimeout(() => {
        noteText.style.height = 'auto'
        noteText.style.height = noteText.scrollHeight +'px'
      },0)
    })
  }
  activeHandle(e) {

    let { note } = this,
        notes = document.getElementsByClassName('note')

    for(let i = 0; i < notes.length; i++) {

      if(notes[i] === note && this.mouseOver) {

        note.className += " active"
        note.getElementsByClassName('note__text')[0].focus()
      } else {
        notes[i].className = notes[i].className.replace(/\s(active)/g,"")
      }
    }

  }
	blurNote(timer = 0) {


		let { note } = this
		this.mouseOver = false;

		setTimeout(() => {

			note.blur();
			note.className = note.className.replace(/\s(active)/g,"")

		}, timer);

	}
  render() {

    let closeFunction = (this.props.type === "edit")? this.deleteNote : this.emptyNote

    return (

      <div
        className = "note"
        id = {this.props.id}
        onMouseEnter = {() => {this.mouseOver = true}}
        onMouseLeave = {() => {this.mouseOver = false}}
        onClick = {this.activeHandle}
        >
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
          placeholder = {this.props.placeHolder}
        >
        </textarea>
        <div className = "note__bottom">
          <button className = "btn" onClick = {this.buttonAction} >Save</button>
        </div>
      </div>
    )
  }
}

Note.defaultProps = {
  content : "",
  placeHolder : "",
  type : "edit",
  buttonAction : null,
}

export default Note
