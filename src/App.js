import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SideBar from "./components/SideBar/SideBar";
import NoteList from "./components/NoteList/NoteList";
import CreateNote from "./components/CreateNote/CreateNote";
import ViewNote from "./components/ViewNote/ViewNote";
import EditNote from './components/EditNote/EditNote';

export default class App extends React.Component {
  nextId = 0;
  noteIndex = 5;

  state = {
    notes: [
      {
      id: 1,
      title: "Paleo DIY",
      body:
        "Lorem ipsum dolor amet typewriter gentrify kombucha artisan art party, small batch portland mumblecore flannel kale chips slow-carb wayfarers. Chillwave readymade kombucha before they sold out, glossier activated charcoal pabst. Venmo meggings viral, kombucha vinyl mixtape you probably haven't heard of them. Try-hard YOLO microdosing, blog tumblr occupy DIY gochujang bicycle rights."
    },
    {
      id: 2,
      title: "Bushwick Aesthetic",
      body: "Vice chicharrones nulla gluten-free. Humblebrag magna flexitarian deep v selvage, unicorn health goth blog chia trust fund semiotics bushwick adipisicing brunch. Readymade pug mumblecore ipsum occaecat, dolor taxidermy. Cold-pressed aute ut knausgaard pitchfork, laboris PBR&B. Jean shorts subway tile pitchfork forage aliqua. Coloring book jianbing tempor locavore, williamsburg umami brooklyn fingerstache wayfarers meditation ullamco dolore pop-up hoodie."
    },
    { id: 3, title: "Unicorn tbh", body: " Enamel pin intelligentsia leggings, messenger bag vexillologist literally fanny pack banh mi bushwick synth bicycle rights paleo man bun heirloom." },
    {
      id: 4,
      title: "Truffaut Chillwave",
      body: " DIY cold-pressed offal, gochujang sartorial proident VHS af meditation chillwave flannel. Ennui nulla marfa, hell of deserunt cray exercitation neutra viral celiac +1 man braid nostrud. Tote bag next level dolor fixie, fashion axe tousled raw denim you probably haven't heard of them try-hard schlitz roof party retro before they sold out adipisicing. Incididunt brunch helvetica lyft chillwave artisan chicharrones adipisicing squid ullamco."
    },
    { id: 5, title: "Health Goth", body: "Bicycle rights artisan gochujang meditation swag, four loko tofu banjo actually. Succulents 90's swag iceland hoodie. Farm-to-table meh tote bag DIY chambray jean shorts succulents semiotics brooklyn literally pitchfork tousled small batch drinking vinegar man bun. Jianbing shoreditch synth hammock farm-to-table. Seitan air plant woke trust fund tilde glossier bitters." 
    },  {
      id: 6,
      title: "Paleo DIY",
      body:
        "Waistcoat microdosing synth bicycle rights YOLO yuccie post-ironic photo booth lo-fi. Roof party pug PBR&B food truck schlitz brunch ethical flannel. Kitsch fingerstache roof party cornhole vaporware aesthetic. Poutine venmo cronut, lyft man bun master cleanse freegan offal mlkshk pork belly. Cliche jianbing occupy raclette kickstarter mlkshk irony banjo butcher. Bushwick actually skateboard, iPhone hoodie blog activated charcoal hashtag hot chicken try-hard health goth thundercats umami cornhole. Umami edison bulb neutra kogi cold-pressed tilde listicle."
    },
    {
      id: 7,
      title: "Vinegar Man Bun",
      body: " Cliche jianbing occupy raclette kickstarter mlkshk irony banjo butcher. Bushwick actually skateboard, iPhone hoodie blog activated charcoal hashtag hot chicken try-hard health goth thundercats umami cornhole. Umami edison bulb neutra kogi cold-pressed tilde listicle."
    },
    { id: 8, title: "Unicorn tbh", body: "knausgaard selfies woke waistcoat gluten-free tousled seitan venmo mixtape tattooed actually kombucha. Yuccie fixie kickstarter, cardigan try-hard hexagon keffiyeh aesthetic meh venmo. " },
    {
      id: 9,
      title: "Master cleanse",
      body: "Dreamcatcher adipisicing do, subway tile migas ex irony raclette quis kogi magna butcher artisan venmo chillwave. Gluten-free raw denim brunch small batch, scenester shaman sustainable fixie kitsch street art. Umami ea excepteur etsy keytar tumeric. Street art before they sold out unicorn, occaecat poutine fam la croix neutra meggings tote bag jianbing stumptown DIY."
    },
    { id: 10, title: "Iceland Cheers", body: "Cred man bun iceland, chicharrones pork belly chia skateboard af. Wayfarers tofu hella, tousled plaid art party small batch 8-bit vexillologist synth listicle. Marfa tofu tilde farm-to-table humblebrag taiyaki kickstarter, bushwick " 
    }
  ]
  };

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id === inputId) this.noteIndex = i;
    }
  };

  handleCreateNote = inputNote => {
    const newNote = {
      id: this.nextId++,
      title: inputNote.title,
      body: inputNote.body
    };
    const newNotes = [...this.state.notes, newNote];
    this.setState({
      notes: newNotes
    });
  };

  handleEditNote = inputNote => {
    const editedNote = {
      id: inputNote.id,
      title: inputNote.title,
      body: inputNote.body
    };
    const editedNotes = [...this.state.notes];
    editedNotes.splice(this.noteIndex, 1, editedNote);
    this.setState({
      notes: editedNotes
    });
  };

  handleDeleteNote = inputId => {
    const lessNotes = this.state.notes.filter(note => note.id !== inputId);
    this.setState({
      notes: lessNotes
    });
  };

  updateSortedNotes = sortedNotes => {
    this.setState({
      notes: sortedNotes
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <SideBar />
          <Route
            exact
            path={"/"}
            render={() => (
              <NoteList
                notes={this.state.notes}
                handleNoteViewIndex={this.handleNoteViewIndex}
                updateSortedNotes={this.updateSortedNotes}
              />
            )}
          />
          <Route
            exact
            path={"/create"}
            render={() => <CreateNote createNote={this.handleCreateNote} />}
          />
          <Route
            exact
            path={"/view"}
            render={() => (
              <ViewNote
                note={this.state.notes[this.noteIndex]}
                toggleModal={this.toggleModal}
                handleDeleteNote={this.handleDeleteNote}
              />
            )}
          />
          <Route
            exact
            path={"/edit"}
            render={() => (
              <EditNote
                note={this.state.notes[this.noteIndex]}
                handleEditNote={this.handleEditNote}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
