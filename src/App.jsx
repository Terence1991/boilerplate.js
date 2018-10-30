import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
 constructor(props) {
   super(props);
   // how to set up web socket
   this.socket = new WebSocket("ws://0.0.0.0:3001");
   this.state = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        id: 1988
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        id: 1989
      }
    ]
  }
 }

 componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

// call function to make object to merge with state
 sendMessage = (message) => {
   let object = {username: this.state.currentUser.name, content: message , id: this.state.messages.length + 1}; 
   console.log("this is my my object:", object);
   const messages = this.state.messages.concat(object);
   this.setState({messages: messages})

 }

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar sendMessage={this.sendMessage} user= {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
