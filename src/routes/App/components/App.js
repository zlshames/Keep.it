import React from 'react'
import superagent from "superagent";
import './App.scss'

class App extends React.Component {
	constructor() {

		super();

		this.saveNote = this.saveNote.bind(this);
	}
	saveNote(e) {
		let textBox = e.target.previousSibling,
				noteId = textBox.id,
				noteText = textBox.value;

		/*superagent
			.post(url)//api url
			.send(data)//here goes data
			.end((err,resp) => {

			if(err) {
				console.log(err);
			} else {
				console.log(resp); Will do something here;
			}
		})
		*/
	}
	render() {

		return (
			<div className = "app">

				<div className = "note">
					<textarea id = "note1"></textarea>
					<button onClick = {this.saveNote} className = "btn btn-default">Save</button>
				</div>

			</div>
		);
	}
}

export default App
