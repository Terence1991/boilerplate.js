//import React from 'react';
import React, {Component} from 'react';
import Message from "./Message.jsx"


class MessageList extends Component {
    render() {
    let userMessages = this.props.messages; 
    console.log(userMessages);
    let arrayOfMessages =  userMessages.map((message) => {
     return <Message userName={message.username} content={message.content} id={message.id}/>

});

        return (
            <main className="messages">
             {arrayOfMessages}
            </main>

        );

    }
    
}


export default MessageList;


