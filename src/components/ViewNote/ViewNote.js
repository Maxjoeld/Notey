import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import DeleteNote from "../DeleteNote/DeleteNote";
import "./ViewNote.css";

export default class NoteView extends Component {
  boolModal = false;

  state = {
    id: 0,
    title: "",
    body: ""
  };

  toggleModal = _ => {
    this.boolModal = !this.boolModal;
    this.forceUpdate();
  };

  componentDidMount() {
    this.setState({
      id: this.props.note.id,
      title: this.props.note.title,
      body: this.props.note.body
    });
  }

  render() {
    const { id, title, body } = this.state;
    return (
      <div className="NoteView">
        {this.boolModal ? (
          <div>
            <DeleteNote
              id={id}
              toggleModal={this.toggleModal}
              handleDeleteNote={this.props.handleDeleteNote}
            />
          </div>
        ) : null}
        <div className="NoteView--Links">
          <div>
            <Link className="NoteView--Links__Link" to={"/edit"}>
              edit
            </Link>
          </div>
          <div>
            <a
              className="NoteView--Links__Link"
              onClick={() => this.toggleModal()}
            >
              delete
            </a>
          </div>
        </div>
        <div>
          <h2 className="SectionTitle">{title}</h2>
          <ReactMarkdown className="SectionBody" source={body} />
        </div>
      </div>
    );
  }
}
