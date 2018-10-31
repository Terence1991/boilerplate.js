import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
 constructor(props) {
   super(props);
   // how to set up web socket
   this.socket = new WebSocket("ws://0.0.0.0:3001");
   this.state = {
    currentUser: {name: "anonymous"}, 
    messages: []
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
    console.log(event)
    const incomingData = JSON.parse(event.data)
    console.log("This is my incoming data:", incomingData);


    switch (incomingData.type) {
      case 'incomingUserNotification':
        this.updateUserInfo(incomingData.id, incomingData.userName);
        break;
        case 'incomingMessage':
        this.updateMessages(incomingData);
        break;
       default:
        console.log('Unkown Message Type');
  
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

   sendUserName = (userName) => {
    console.log("this is my thinng:", userName);
     if(this.state === userName) {
  
     } else {
       socket.send('**UserA** changed their name to **UserB**');
     }
   }


  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages}/>
        <ChatBar sendUserName={this.sendUserName} sendMessage={this.sendMessage} user= {this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
