import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"
const uuidv4 = require('uuid/v4')

class App extends Component {
 constructor(props) {
   super(props);
   // how to set up web socket
   this.socket = new WebSocket("ws://0.0.0.0:3001");
   this.state = {
    currentUser: {name: "anonymous"}, 
    messages: [],
    numberOfUsers: 0
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
  this.socket.onopen = () => {
    console.log("helllooooooo")
  }
  // function to get user info from back end
  this.socket.onmessage = (event) => {
    const incomingData = JSON.parse(event.data)
    console.log("This is my incoming data:", incomingData);
   

    //{"totalclients":2,"type":"incomingClientInfo"}
     switch (incomingData.type) {
      case 'incomingClientInfo':
      console.log('number of users')
        this.setState({numberOfUsers: incomingData.totalclients});
        break;
      case 'incomingMessage':
      console.log('incoming message')
      this.updateMessages(incomingData);
      break;
        }
  }
}

updateUserInfo = (userId,  color = 'black') => {
  this.setState({
    currentUser: { id: userId, name: this.state.currentUser.name, color }
  });
};

updateMessages = (message) => {
  this.setState(
    {messages: [...this.state.messages, message]})
}

// call function to make object to merge with state
 sendMessage = (message, userName) => {
   let object = {username: userName, content: message , type:'postMessage'}; 
   console.log("this is my my object:", object);
   const messages = this.state.messages.concat(object);
  //  this.setState({messages: messages})
   this.socket.send(JSON.stringify(object));

 }

   sendUserName = (userName, oldUserName) => {
    console.log("this is my thinng:", userName, oldUserName);
     if(this.state === userName) {
  
     } else {
       this.socket.send(JSON.stringify({ username: userName, id: uuidv4(), type: "postNotification", content: oldUserName}));
     }
   }


  render() {
    return (
      <div>
        <nav className="navbar">
        <div className="navContainer">
        <div>
        <a href="/" className="navbar-brand">Chatty</a>
        </div>
        <div className='numberOfUsers'>Number of users online:{this.state.numberOfUsers}</div>
        </div>
        
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar sendUserName={this.sendUserName} sendMessage={this.sendMessage} user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
